import { NextRequest, NextResponse } from "next/server";
import {
  attachKanbanSession,
  clearKanbanSession,
  isKanbanAuthorized,
  isKanbanPasswordConfigured,
  verifyKanbanPassword,
} from "@/features/kanban/auth";

export async function GET(request: NextRequest) {
  return NextResponse.json({
    authorized: isKanbanAuthorized(request),
    configured: isKanbanPasswordConfigured(),
  });
}

export async function POST(request: NextRequest) {
  const { password } = (await request.json()) as { password?: string };

  if (!password || !verifyKanbanPassword(password)) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const response = NextResponse.json({ authorized: true, configured: true });
  attachKanbanSession(response);
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ authorized: false, configured: isKanbanPasswordConfigured() });
  clearKanbanSession(response);
  return response;
}
