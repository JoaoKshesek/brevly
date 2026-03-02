import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { eq, sql } from "drizzle-orm";
import { makeLeft, makeRight } from "@/infra/shared/either";
import { LinkNotFound } from "./errors/link-not-found";

export async function incrementLinkAccessCount(slug: string) {
  try {
    const result = await db
      .update(schema.links)
      .set({ accessCount: sql`${schema.links.accessCount} + 1` })
      .where(eq(schema.links.shortUrl, slug));

    return makeRight({ result });
  } catch {
    return makeLeft(new LinkNotFound());
  }
}
