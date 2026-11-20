// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2025-2026 lin-snow

import { Link } from "react-router";
import { MarkdownDoc } from "../docs/MarkdownDoc";
import content from "../../content/privacy/fr.md?raw";

export function meta() {
  return [{ title: "Confidentialité — Ech0 Vercel" }];
}

export default function Privacy() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-10">
      <Link to="/" className="mb-6 inline-block text-sm underline">
        Accueil
      </Link>
      <MarkdownDoc content={content} path="site/content/privacy/fr.md" />
    </main>
  );
}
