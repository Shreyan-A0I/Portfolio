import { NextRequest, NextResponse } from "next/server";
import { isKanbanAuthorized } from "@/features/kanban/auth";
import { isBlobConfigured, loadKanbanBoard, saveKanbanBoard } from "@/features/kanban/storage";
import type { KanbanBoard } from "@/types";

export async function GET() {
  const board = await loadKanbanBoard();
  return NextResponse.json({ board, storageConfigured: isBlobConfigured() });
}

export async function PUT(request: NextRequest) {
  if (!isKanbanAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const incoming = (await request.json()) as KanbanBoard;
  const board = await saveKanbanBoard(incoming);
  return NextResponse.json({ board, storageConfigured: isBlobConfigured() });
}
