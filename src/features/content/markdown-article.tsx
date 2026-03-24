import { Fragment } from "react";

interface MarkdownArticleProps {
  source: string;
}

type Block =
  | { type: "heading"; level: 1 | 2 | 3; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "code"; code: string }
  | { type: "table"; rows: string[] };

function stripFrontmatter(source: string) {
  if (!source.startsWith("---")) {
    return source;
  }

  const end = source.indexOf("\n---", 3);
  if (end === -1) {
    return source;
  }

  return source.slice(end + 4).trimStart();
}

function parseBlocks(source: string): Block[] {
  const lines = stripFrontmatter(source)
    .split("\n")
    .filter((line) => !line.trim().startsWith("<img") && !line.trim().startsWith("!["));

  const blocks: Block[] = [];
  let paragraph: string[] = [];
  let list: string[] = [];
  let code: string[] = [];
  let table: string[] = [];
  let inCode = false;

  const flushParagraph = () => {
    if (paragraph.length) {
      blocks.push({ type: "paragraph", text: paragraph.join(" ").trim() });
      paragraph = [];
    }
  };

  const flushList = () => {
    if (list.length) {
      blocks.push({ type: "list", items: [...list] });
      list = [];
    }
  };

  const flushCode = () => {
    if (code.length) {
      blocks.push({ type: "code", code: code.join("\n") });
      code = [];
    }
  };

  const flushTable = () => {
    if (table.length) {
      blocks.push({ type: "table", rows: [...table] });
      table = [];
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();

    if (line.startsWith("```")) {
      flushParagraph();
      flushList();
      flushTable();
      if (inCode) {
        flushCode();
        inCode = false;
      } else {
        inCode = true;
      }
      continue;
    }

    if (inCode) {
      code.push(rawLine);
      continue;
    }

    if (!line.trim()) {
      flushParagraph();
      flushList();
      flushTable();
      continue;
    }

    if (line.startsWith("### ")) {
      flushParagraph();
      flushList();
      flushTable();
      blocks.push({ type: "heading", level: 3, text: line.replace(/^###\s+/, "") });
      continue;
    }

    if (line.startsWith("## ")) {
      flushParagraph();
      flushList();
      flushTable();
      blocks.push({ type: "heading", level: 2, text: line.replace(/^##\s+/, "") });
      continue;
    }

    if (line.startsWith("# ")) {
      flushParagraph();
      flushList();
      flushTable();
      blocks.push({ type: "heading", level: 1, text: line.replace(/^#\s+/, "") });
      continue;
    }

    if (line.startsWith("- ") || line.startsWith("* ")) {
      flushParagraph();
      flushTable();
      list.push(line.replace(/^[-*]\s+/, ""));
      continue;
    }

    if (line.startsWith("|")) {
      flushParagraph();
      flushList();
      table.push(rawLine);
      continue;
    }

    paragraph.push(line);
  }

  flushParagraph();
  flushList();
  flushTable();
  flushCode();

  return blocks;
}

function inlineText(text: string) {
  const parts = text.split(/(`[^`]+`)/g);
  return parts.map((part, index) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={`${part}-${index}`} className="rounded-sm bg-[var(--paper-slab)] px-1.5 py-0.5 font-mono text-[var(--bio-cyan)]">
          {part.slice(1, -1)}
        </code>
      );
    }

    return <Fragment key={`${part}-${index}`}>{part}</Fragment>;
  });
}

export function MarkdownArticle({ source }: MarkdownArticleProps) {
  const blocks = parseBlocks(source);

  return (
    <div className="space-y-5 text-base leading-7 text-[var(--soft-white)]/82">
      {blocks.map((block, index) => {
        if (block.type === "heading") {
          const className =
            block.level === 1
              ? "text-2xl font-semibold text-[var(--hard-white)]"
              : block.level === 2
                ? "text-xl font-semibold text-[var(--hard-white)]"
                : "text-lg font-semibold text-[var(--hard-white)]";

          return (
            <div key={`${block.type}-${index}`} className="pt-3">
              <h3 className={className}>{block.text}</h3>
            </div>
          );
        }

        if (block.type === "list") {
          return (
            <ul key={`${block.type}-${index}`} className="space-y-2 pl-0">
              {block.items.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 block h-2 w-2 shrink-0 bg-[var(--bio-cyan)]" />
                  <span>{inlineText(item)}</span>
                </li>
              ))}
            </ul>
          );
        }

        if (block.type === "code") {
          return (
            <pre
              key={`${block.type}-${index}`}
              className="overflow-x-auto border-[3px] border-[var(--hard-white)] bg-[var(--terminal-void)] p-4 font-mono text-sm text-[var(--bio-cyan)]"
            >
              <code>{block.code}</code>
            </pre>
          );
        }

        if (block.type === "table") {
          return (
            <pre
              key={`${block.type}-${index}`}
              className="overflow-x-auto border-[3px] border-dashed border-[var(--hard-white)]/60 bg-[var(--paper-slab)] p-4 font-mono text-xs text-[var(--hard-white)]/72"
            >
              {block.rows.join("\n")}
            </pre>
          );
        }

        return (
          <p key={`${block.type}-${index}`} className="font-reading text-[1.02rem]">
            {inlineText(block.text)}
          </p>
        );
      })}
    </div>
  );
}
