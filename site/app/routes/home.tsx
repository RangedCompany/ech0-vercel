// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2025-2026 lin-snow

import { Link } from "react-router";
import { MarkdownDoc } from "../docs/MarkdownDoc";
import readme from "../../../README.md?raw";

export function meta() {
  return [{ title: "Ech0 Vercel" }];
}

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-10">
      <MarkdownDoc content={readme} path="README.md" />
      <footer className="mt-8 text-sm">
        <Link to="/privacy" className="underline">
          Confidentialité
        </Link>
      </footer>
    </main>
  );
}
