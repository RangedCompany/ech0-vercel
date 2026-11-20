// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2025-2026 lin-snow

type HeadingNode = {
  value?: string;
  children?: HeadingNode[];
};

function text(node?: HeadingNode): string {
  return node?.value ?? node?.children?.map(text).join("") ?? "";
}

export function headingId(
  node: HeadingNode | undefined,
  used: Map<string, number>,
) {
  const base = text(node)
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}_ -]/gu, "")
    .replace(/ /g, "-");
  const count = used.get(base) ?? 0;
  used.set(base, count + 1);
  return count ? `${base}-${count}` : base;
}
