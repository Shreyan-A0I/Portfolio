import type { Metadata } from "next";
import HelixEntry from "@/features/home/HelixEntry";
import { seo } from "@/lib/data";

export const metadata: Metadata = {
  title: "Home",
  description: seo.description,
};

export default function Home() {
  return (
    <main>
      <HelixEntry />
    </main>
  );
}
