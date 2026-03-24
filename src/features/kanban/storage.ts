import { list, put } from "@vercel/blob";
import type { KanbanBoard, KanbanCard, KanbanColumn } from "@/types";
import { defaultKanbanBoard } from "./default-board";

const BLOB_PATH = "kanban/board.json";

function isCard(value: unknown): value is KanbanCard {
  return Boolean(
    value &&
      typeof value === "object" &&
      typeof (value as KanbanCard).id === "string" &&
      typeof (value as KanbanCard).title === "string" &&
      Array.isArray((value as KanbanCard).labels) &&
      typeof (value as KanbanCard).detail === "string",
  );
}

function isColumn(value: unknown): value is KanbanColumn {
  return Boolean(
    value &&
      typeof value === "object" &&
      typeof (value as KanbanColumn).id === "string" &&
      typeof (value as KanbanColumn).title === "string" &&
      ["cyan", "red", "yellow", "white"].includes((value as KanbanColumn).accent) &&
      Array.isArray((value as KanbanColumn).cards) &&
      (value as KanbanColumn).cards.every(isCard),
  );
}

function normalizeBoard(value: unknown): KanbanBoard {
  if (
    value &&
    typeof value === "object" &&
    Array.isArray((value as KanbanBoard).columns) &&
    (value as KanbanBoard).columns.every(isColumn)
  ) {
    return {
      updatedAt:
        typeof (value as KanbanBoard).updatedAt === "string"
          ? (value as KanbanBoard).updatedAt
          : new Date().toISOString(),
      columns: (value as KanbanBoard).columns,
    };
  }

  return defaultKanbanBoard;
}

export function isBlobConfigured() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

export async function loadKanbanBoard(): Promise<KanbanBoard> {
  if (!isBlobConfigured()) {
    return defaultKanbanBoard;
  }

  try {
    const result = await list({ prefix: BLOB_PATH, limit: 10, token: process.env.BLOB_READ_WRITE_TOKEN });
    const existing = result.blobs.find((blob) => blob.pathname === BLOB_PATH);

    if (!existing) {
      return defaultKanbanBoard;
    }

    const response = await fetch(existing.url, { cache: "no-store" });
    if (!response.ok) {
      return defaultKanbanBoard;
    }

    const payload = (await response.json()) as unknown;
    return normalizeBoard(payload);
  } catch {
    return defaultKanbanBoard;
  }
}

export async function saveKanbanBoard(board: KanbanBoard) {
  if (!isBlobConfigured()) {
    throw new Error("Blob storage is not configured.");
  }

  const normalized = normalizeBoard({ ...board, updatedAt: new Date().toISOString() });
  await put(BLOB_PATH, JSON.stringify(normalized, null, 2), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });

  return normalized;
}
