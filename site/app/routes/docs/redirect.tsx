// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2025-2026 lin-snow

import { redirect } from "react-router";
import type { Route } from "./+types/redirect";

export function clientLoader({ request }: Route.ClientLoaderArgs) {
  const { pathname, search } = new URL(request.url);
  return redirect(pathname.slice(3) + search);
}

export default function LegacyDocs() {
  return null;
}
