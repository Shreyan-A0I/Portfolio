import type { Metadata } from "next";
import WBCGame from "@/features/game/WBCGame";

export const metadata: Metadata = {
  title: "Phagocyte",
  description: "You are a white blood cell.",
};

export default function GamePage() {
  return <WBCGame />;
}
