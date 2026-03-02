import { db } from "@/infra/db";
import { makeLeft, makeRight } from "@/infra/shared/either";
import { LinkNotFound } from "./errors/link-not-found";
import { schema } from "@/infra/db/schemas";
import { eq } from "drizzle-orm";

export async function deleteLinkBySlug(slug: string) {
  const deleted = await db
    .delete(schema.links)
    .where(eq(schema.links.shortUrl, slug))
    .returning({ id: schema.links.id });

  if (deleted.length === 0) {
    return makeLeft(new LinkNotFound());
  }

  return makeRight(null);
}