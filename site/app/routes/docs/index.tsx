// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2025-2026 lin-snow

import { Link } from "react-router";
import { MarkdownDoc } from "../../docs/MarkdownDoc";
import index from "../../../../docs/README.md?raw";

export function meta() {
  return [{ title: "Documentation — Ech0 Vercel" }];
}

export default function DocsIndex() {
  return (
    <>
      <Link to="/" className="mb-6 inline-block text-sm underline">
        Accueil
      </Link>
      <MarkdownDoc content={index} path="docs/README.md" />
    </>
  );
}
