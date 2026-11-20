// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2025-2026 lin-snow

import { Link, redirect } from "react-router";
import type { Route } from "./+types/doc";
import { getDoc } from "../../docs/registry";
import { MarkdownDoc } from "../../docs/MarkdownDoc";

const aliases: Readonly<Record<string, string>> = {
  "start/installation": "DEPLOYMENT",
  "start/update": "DEPLOYMENT",
  "start/getting-started": "DEPLOYMENT",
  "dev/guide": "dev/development",
  "guide/editor": "usage/utiliser-ech0#publier",
  "guide/preferences": "usage/utiliser-ech0#régler-le-profil-et-le-site",
  "guide/comment": "usage/utiliser-ech0#commentaires-et-connexions",
  "guide/federation": "usage/utiliser-ech0#commentaires-et-connexions",
  "guide/connect": "usage/utiliser-ech0#commentaires-et-connexions",
  "guide/hub": "usage/utiliser-ech0#commentaires-et-connexions",
  "guide/mcp": "usage/mcp-usage",
  "guide/webhook": "usage/webhook-usage",
  "guide/accesstoken": "dev/access-token-scope-design",
  "guide/s3": "usage/storage-migration",
  "guide/capsule": "usage/capsule",
  "guide/datacontrol": "dev/snapshot-design",
  "guide/agent": "usage/agent-discovery",
  "guide/chat": "dev/llm-chat-design",
  "guide/embedding": "dev/llm-chat-design",
  "guide/cli": "dev/cli-design",
  "guide/sso": "dev/auth-design",
  "guide/oauth": "dev/auth-design",
  "guide/passkey": "dev/auth-design",
};

export function meta({ loaderData }: Route.MetaArgs) {
  return [{ title: `${loaderData?.title ?? "Documentation"} — Ech0 Vercel` }];
}

export function clientLoader({ params }: Route.ClientLoaderArgs) {
  const slug = params["*"]?.replace(/\/$/, "") ?? "";
  if (slug === "guide/overview") return redirect("/");
  if (!slug || slug === "README") return redirect("/docs");
  const alias = Object.hasOwn(aliases, slug) ? aliases[slug] : undefined;
  if (alias) return redirect(`/docs/${alias}`);

  const doc = getDoc(`docs/${slug}.md`) ?? getDoc(`${slug}.md`);
  if (!doc) throw new Response("Page introuvable", { status: 404 });
  return doc;
}

export default function Doc({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <Link to="/docs" className="mb-6 inline-block text-sm underline">
        Documentation
      </Link>
      <MarkdownDoc content={loaderData.body} path={loaderData.path} />
    </>
  );
}
