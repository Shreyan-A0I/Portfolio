import { promises as fs } from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";

const CONTENT_ROOT = path.resolve(process.cwd(), "Content");
const MIME_TYPES: Record<string, string> = {
  ".pdf": "application/pdf",
  ".md": "text/markdown; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
};

export async function GET(_request: Request, { params }: { params: Promise<{ segments: string[] }> }) {
  const { segments } = await params;
  const filePath = path.resolve(CONTENT_ROOT, ...segments);

  if (!filePath.startsWith(CONTENT_ROOT)) {
    return NextResponse.json({ error: "Invalid asset path" }, { status: 400 });
  }

  const extension = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[extension];

  if (!contentType) {
    return NextResponse.json({ error: "Unsupported asset type" }, { status: 415 });
  }

  try {
    const file = await fs.readFile(filePath);
    return new NextResponse(file, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch {
    return NextResponse.json({ error: "Asset not found" }, { status: 404 });
  }
}
