// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2025-2026 lin-snow

const sources = import.meta.glob<string>(
  [
    "../../../docs/**/*.md",
    "../../../DEPLOYMENT.md",
    "../../../CONTRIBUTING.md",
    "../../../CHANGELOG.md",
    "../../../SECURITY.md",
    "../../../README.md",
  ],
  { query: "?raw", import: "default", eager: true },
);

const docs = new Map(
  Object.entries(sources).map(([path, body]) => [
    path.replace(/^\.\.\/\.\.\/\.\.\//, ""),
    body,
  ]),
);

export function getDoc(path: string) {
  const body = docs.get(path);
  if (!body) return null;
  const title = body.match(/^#\s+(.+)$/m)?.[1] ?? "Documentation";
  return { path, body, title };
}

export function docPath(path: string) {
  if (path === "README.md") return "/";
  if (path === "docs/README.md") return "/docs";
  return `/docs/${path.replace(/^docs\//, "").replace(/\.md$/, "")}`;
}

export function resolveDocLink(path: string, href: string): string {
  const base = new URL(`https://repo.invalid/${path}`);
  const target = new URL(href, base);
  if (target.origin !== base.origin || href.startsWith("#")) return href;

  const repoPath = target.pathname.slice(1);
  if (docs.has(repoPath)) return docPath(repoPath) + target.hash;

  return `https://github.com/RangedCompany/ech0-vercel/blob/main/${repoPath}${target.hash}`;
}
