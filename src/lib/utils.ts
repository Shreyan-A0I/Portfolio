import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function makeAssetUrl(path: string) {
  const segments = path
    .split("/")
    .filter(Boolean)
    .map((segment) => encodeURIComponent(segment));

  return `/api/assets/${segments.join("/")}`;
}

export function formatStatus(status: "ongoing" | "normal") {
  return status === "ongoing" ? "ONGOING" : "NORMAL";
}
