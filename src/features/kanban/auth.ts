import { createHash, timingSafeEqual } from "node:crypto";
import type { NextRequest, NextResponse } from "next/server";

export const KANBAN_SESSION_COOKIE = "kanban_session";
const SESSION_SALT = "syntactic-brutalism-session-v1";

function hash(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

function getConfiguredPassword() {
  return process.env.KANBAN_ADMIN_PASSWORD?.trim() ?? "";
}

export function isKanbanPasswordConfigured() {
  return getConfiguredPassword().length > 0;
}

export function verifyKanbanPassword(input: string) {
  const configured = getConfiguredPassword();
  if (!configured) {
    return false;
  }

  const expected = Buffer.from(hash(configured));
  const received = Buffer.from(hash(input));
  return expected.length === received.length && timingSafeEqual(expected, received);
}

export function getSessionToken() {
  const configured = getConfiguredPassword();
  return configured ? hash(`${configured}:${SESSION_SALT}`) : "";
}

export function isKanbanAuthorized(request: NextRequest) {
  const cookie = request.cookies.get(KANBAN_SESSION_COOKIE)?.value;
  const token = getSessionToken();
  return Boolean(cookie && token && cookie === token);
}

export function attachKanbanSession(response: NextResponse) {
  response.cookies.set(KANBAN_SESSION_COOKIE, getSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
}

export function clearKanbanSession(response: NextResponse) {
  response.cookies.set(KANBAN_SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(0),
  });
}
