"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { KanbanBoard, KanbanCard, KanbanColumn } from "@/types";
import { defaultKanbanBoard } from "./default-board";

type SaveState = "idle" | "dirty" | "saving" | "saved" | "error";

interface SessionPayload {
  authorized: boolean;
  configured: boolean;
}

interface KanbanPayload {
  board: KanbanBoard;
  storageConfigured: boolean;
}

interface DropTarget {
  columnId: string;
  index: number;
}

const accentClassMap: Record<KanbanColumn["accent"], string> = {
  cyan: "border-[var(--bio-cyan)]",
  red: "border-[var(--cmu-red)]",
  yellow: "border-[var(--syntax-yellow)]",
  white: "border-[var(--hard-white)]",
};

function moveCard(board: KanbanBoard, sourceColumnId: string, sourceCardId: string, target: DropTarget) {
  if (sourceColumnId === target.columnId) {
    const sourceColumn = board.columns.find((column) => column.id === sourceColumnId);
    if (!sourceColumn) {
      return board;
    }

    const sourceIndex = sourceColumn.cards.findIndex((card) => card.id === sourceCardId);
    if (sourceIndex === -1) {
      return board;
    }

    const nextColumns = board.columns.map((column) => {
      if (column.id !== sourceColumnId) {
        return column;
      }

      const cards = [...column.cards];
      const [moved] = cards.splice(sourceIndex, 1);
      const nextIndex = target.index > sourceIndex ? target.index - 1 : target.index;
      cards.splice(nextIndex, 0, moved);
      return { ...column, cards };
    });

    return { ...board, columns: nextColumns, updatedAt: new Date().toISOString() };
  }

  let movedCard: KanbanCard | null = null;

  const strippedColumns = board.columns.map((column) => {
    if (column.id !== sourceColumnId) {
      return column;
    }

    const cards = [...column.cards];
    const sourceIndex = cards.findIndex((card) => card.id === sourceCardId);
    if (sourceIndex === -1) {
      return column;
    }

    [movedCard] = cards.splice(sourceIndex, 1);
    return { ...column, cards };
  });

  if (!movedCard) {
    return board;
  }

  const cardToMove = movedCard;

  const nextColumns = strippedColumns.map((column) => {
    if (column.id !== target.columnId) {
      return column;
    }

    const cards = [...column.cards];
    cards.splice(target.index, 0, cardToMove);
    return { ...column, cards };
  });

  return { ...board, columns: nextColumns, updatedAt: new Date().toISOString() };
}

export function KanbanWorkspace() {
  const [board, setBoard] = useState<KanbanBoard>(defaultKanbanBoard);
  const [editable, setEditable] = useState(false);
  const [passwordConfigured, setPasswordConfigured] = useState(false);
  const [storageConfigured, setStorageConfigured] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [draggingCardId, setDraggingCardId] = useState<string | null>(null);
  const [dropTarget, setDropTarget] = useState<DropTarget | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const latestVersionRef = useRef(0);
  const lastPersistedRef = useRef("");

  useEffect(() => {
    async function load() {
      const [kanbanResponse, sessionResponse] = await Promise.all([
        fetch("/api/kanban", { cache: "no-store" }),
        fetch("/api/kanban/session", { cache: "no-store" }),
      ]);

      const kanbanPayload = (await kanbanResponse.json()) as KanbanPayload;
      const sessionPayload = (await sessionResponse.json()) as SessionPayload;

      setBoard(kanbanPayload.board);
      setStorageConfigured(kanbanPayload.storageConfigured);
      setEditable(sessionPayload.authorized);
      setPasswordConfigured(sessionPayload.configured);
      lastPersistedRef.current = JSON.stringify(kanbanPayload.board);
      setIsHydrated(true);
    }

    void load();
  }, []);

  useEffect(() => {
    if (!isHydrated || !editable) {
      return;
    }

    const snapshot = JSON.stringify(board);
    if (snapshot === lastPersistedRef.current) {
      return;
    }

    setSaveState("dirty");
    latestVersionRef.current += 1;
    const version = latestVersionRef.current;

    const timer = window.setTimeout(async () => {
      try {
        setSaveState("saving");
        const response = await fetch("/api/kanban", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: snapshot,
        });

        if (!response.ok) {
          throw new Error("Save failed.");
        }

        const payload = (await response.json()) as KanbanPayload;
        if (version === latestVersionRef.current) {
          lastPersistedRef.current = JSON.stringify(payload.board);
          setBoard(payload.board);
          setSaveState("saved");
        }
      } catch {
        if (version === latestVersionRef.current) {
          setSaveState("error");
        }
      }
    }, 1500);

    return () => window.clearTimeout(timer);
  }, [board, editable, isHydrated]);

  const saveLabel = useMemo(() => {
    switch (saveState) {
      case "dirty":
        return "local changes pending";
      case "saving":
        return "syncing to blob";
      case "saved":
        return "saved to blob";
      case "error":
        return "save failed";
      default:
        return editable ? "editing unlocked" : "read only";
    }
  }, [editable, saveState]);

  async function unlockEditing(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAuthError(null);

    const response = await fetch("/api/kanban/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (!response.ok) {
      setAuthError("Password rejected.");
      return;
    }

    setEditable(true);
    setPassword("");
    setSaveState("idle");
  }

  async function lockEditing() {
    await fetch("/api/kanban/session", { method: "DELETE" });
    setEditable(false);
    setPassword("");
    setSaveState("idle");
  }

  function renderDropSlot(columnId: string, index: number) {
    return (
      <div
        key={`${columnId}-drop-${index}`}
        onDragOver={(event) => {
          if (!editable) {
            return;
          }
          event.preventDefault();
          setDropTarget({ columnId, index });
        }}
        onDrop={(event) => {
          if (!editable) {
            return;
          }
          event.preventDefault();
          const payload = event.dataTransfer.getData("text/plain");
          if (!payload) {
            return;
          }

          const parsed = JSON.parse(payload) as { cardId: string; columnId: string };
          setBoard((current) => moveCard(current, parsed.columnId, parsed.cardId, { columnId, index }));
          setDraggingCardId(null);
          setDropTarget(null);
        }}
        className={
          dropTarget?.columnId === columnId && dropTarget.index === index
            ? "h-4 border-[3px] border-dashed border-[var(--syntax-yellow)] bg-[var(--syntax-yellow)]/15"
            : "h-1"
        }
      />
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="grid gap-8 lg:grid-cols-[0.86fr_1.14fr]">
        <div className="space-y-6">
          <div className="reading-surface p-5 sm:p-6">
            <p className="font-mono text-xs uppercase tracking-[0.32em] text-[var(--cmu-red)]">Kanban Gateway</p>
            <h1 className="mt-3 font-reading text-4xl font-semibold text-[var(--hard-white)]">Public board, private edits.</h1>
            <p className="mt-4 font-reading text-base leading-7 text-[var(--soft-white)]/78">
              Anyone can inspect the current working surface. Editing stays behind a password, and writes are debounced so drag-and-drop remains fast before the board syncs to Blob.
            </p>
          </div>

          <div className="reading-surface p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <p className="font-mono text-xs uppercase tracking-[0.32em] text-[var(--bio-cyan)]">Session Status</p>
              <span className="border-[3px] border-[var(--hard-white)] bg-[var(--terminal-void)] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--hard-white)]">
                {saveLabel}
              </span>
            </div>

            <div className="mt-5 space-y-3 font-reading text-sm leading-6 text-[var(--soft-white)]/76">
              <p>Auth configured: {passwordConfigured ? "yes" : "no"}</p>
              <p>Blob configured: {storageConfigured ? "yes" : "no"}</p>
              <p>Edit mode: {editable ? "unlocked" : "locked"}</p>
            </div>

            {passwordConfigured ? (
              editable ? (
                <button type="button" onClick={lockEditing} className="mt-6 border-[3px] border-[var(--hard-white)] bg-[var(--hard-white)] px-4 py-3 font-mono text-xs font-bold uppercase tracking-[0.24em] text-[var(--terminal-void)] shadow-neubrutal-cyan transition-transform duration-200 hover:-translate-y-0.5">
                  Lock Editing
                </button>
              ) : (
                <form className="mt-6 space-y-3" onSubmit={unlockEditing}>
                  <label className="block font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--soft-white)]/58" htmlFor="kanban-password">
                    Password
                  </label>
                  <div className="flex gap-3">
                    <input
                      id="kanban-password"
                      type="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      className="terminal-cursor min-w-0 flex-1 border-[3px] border-[var(--hard-white)] bg-[var(--terminal-void)] px-4 py-3 font-mono text-sm text-[var(--hard-white)] outline-none focus:border-[var(--bio-cyan)]"
                      placeholder="Unlock board edits"
                    />
                    <button type="submit" className="border-[3px] border-[var(--hard-white)] bg-[var(--syntax-yellow)] px-4 py-3 font-mono text-xs font-bold uppercase tracking-[0.24em] text-[var(--terminal-void)] shadow-neubrutal-yellow transition-transform duration-200 hover:-translate-y-0.5">
                      Unlock
                    </button>
                  </div>
                  {authError ? <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--cmu-red)]">{authError}</p> : null}
                </form>
              )
            ) : (
              <p className="mt-6 font-reading text-sm leading-6 text-[var(--soft-white)]/72">
                Set `KANBAN_ADMIN_PASSWORD` to enable editing. Without it, the board remains public and read only.
              </p>
            )}
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {board.columns.map((column) => (
            <div key={column.id} className={`reading-surface flex min-h-[18rem] flex-col gap-3 p-4 ${accentClassMap[column.accent]}`}>
              <div className="flex items-center justify-between gap-3 border-b-[3px] border-dashed border-[var(--hard-white)]/40 pb-3">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--soft-white)]/58">Column</p>
                  <h2 className="mt-1 font-reading text-2xl font-semibold text-[var(--hard-white)]">{column.title}</h2>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--soft-white)]/58">{column.cards.length} cards</span>
              </div>

              <div className="space-y-3">
                {renderDropSlot(column.id, 0)}
                {column.cards.map((card) => (
                  <div key={card.id} className="space-y-3">
                    <article
                      draggable={editable}
                      onDragStart={(event) => {
                        setDraggingCardId(card.id);
                        event.dataTransfer.setData("text/plain", JSON.stringify({ cardId: card.id, columnId: column.id }));
                      }}
                      onDragEnd={() => {
                        setDraggingCardId(null);
                        setDropTarget(null);
                      }}
                      className={`border-[3px] border-[var(--hard-white)] bg-[var(--terminal-void)] p-4 transition-all duration-200 ${draggingCardId === card.id ? "opacity-40" : "opacity-100"} ${editable ? "cursor-grab active:cursor-grabbing" : "cursor-default"}`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-reading text-lg font-semibold text-[var(--hard-white)]">{card.title}</h3>
                        {editable ? <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--syntax-yellow)]">drag</span> : null}
                      </div>
                      <p className="mt-2 font-reading text-sm leading-6 text-[var(--soft-white)]/74">{card.detail}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {card.labels.map((label) => (
                          <span key={label} className="border-[3px] border-[var(--hard-white)] bg-[var(--paper-slab)] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--soft-white)]/72">
                            {label}
                          </span>
                        ))}
                      </div>
                    </article>
                    {renderDropSlot(column.id, column.cards.findIndex((item) => item.id === card.id) + 1)}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
