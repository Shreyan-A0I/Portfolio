import type { KanbanBoard } from "@/types";

export const defaultKanbanBoard: KanbanBoard = {
  updatedAt: new Date("2026-03-24T00:00:00.000Z").toISOString(),
  columns: [
    {
      id: "backlog",
      title: "Backlog",
      accent: "white",
      cards: [
        {
          id: "card-portfolio-copy",
          title: "Rewrite remaining project dossiers",
          labels: ["content", "portfolio"],
          detail: "Expand seeded stories into richer long-form reports as new content lands in Content/.",
        },
        {
          id: "card-visual-assets",
          title: "Collect project visuals",
          labels: ["design", "assets"],
          detail: "Add more screenshots, figures, and diagrams per project folder so the detail routes can feel less text-only.",
        },
      ],
    },
    {
      id: "active",
      title: "Active",
      accent: "yellow",
      cards: [
        {
          id: "card-graph-taxonomy",
          title: "Tune graph label taxonomy",
          labels: ["ux", "systems"],
          detail: "Keep homepage graph labels aligned with project tags so filtering never drifts from the actual work.",
        },
        {
          id: "card-kanban-auth",
          title: "Lock edit mode behind password",
          labels: ["security", "kanban"],
          detail: "Public board stays readable; mutations require a verified session and persist through Blob.",
        },
      ],
    },
    {
      id: "review",
      title: "Review",
      accent: "cyan",
      cards: [
        {
          id: "card-storytone",
          title: "Refine homepage narrative tone",
          labels: ["copy", "home"],
          detail: "Keep the boot-sequence energy on landing sections while preserving readability in the long-form routes.",
        },
      ],
    },
    {
      id: "shipped",
      title: "Shipped",
      accent: "red",
      cards: [
        {
          id: "card-structure",
          title: "Adopted Syntactic Brutalism foundation",
          labels: ["theme", "system"],
          detail: "Hard borders, offset shadows, terminal framing, and responsive layout primitives define the shared UI now.",
        },
      ],
    },
  ],
};
