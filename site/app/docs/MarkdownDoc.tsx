// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2025-2026 lin-snow

import { Link } from "react-router";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import "highlight.js/styles/github.css";
import { resolveDocLink } from "./registry";
import { headingId } from "./toc";

export function MarkdownDoc({
  content,
  path,
}: {
  content: string;
  path: string;
}) {
  const headings = new Map<string, number>();

  return (
    <article className="docs-markdown">
      <ReactMarkdown
        rehypePlugins={[rehypeHighlight]}
        remarkPlugins={[remarkGfm]}
        components={{
          a({ href, children }) {
            if (!href) return <>{children}</>;
            const target = resolveDocLink(path, href);
            return target === "/" || target.startsWith("/docs") ? (
              <Link to={target}>{children}</Link>
            ) : (
              <a href={target}>{children}</a>
            );
          },
          h2({ node, children }) {
            return <h2 id={headingId(node, headings)}>{children}</h2>;
          },
          h3({ node, children }) {
            return <h3 id={headingId(node, headings)}>{children}</h3>;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
