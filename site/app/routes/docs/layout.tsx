// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2025-2026 lin-snow

import { Outlet } from "react-router";

export default function DocsLayout() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-10">
      <Outlet />
    </main>
  );
}
