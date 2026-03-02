// src/features/links/repository/getLinkBySlug.ts
import { db } from "@/infra/db";
import { makeLeft, makeRight } from "@/infra/shared/either";
import { LinkNotFound } from "./errors/link-not-found";
import { schema } from "@/infra/db/schemas";
import { eq } from "drizzle-orm";

export async function getLinkBySlug(slug: string) {
  const link = await db.query.links.findFirst({
    where: eq(schema.links.shortUrl, slug),
    columns: {
      originalUrl: true,
    },
  });

  if (!link) {
    return makeLeft(new LinkNotFound());
  }

  return makeRight({
    originalUrl: link.originalUrl,
  });
}
