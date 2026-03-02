import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { fakerPT_BR as faker } from "@faker-js/faker";
import type { InferInsertModel } from "drizzle-orm";

export async function makeShortLink(
  overrides?: Partial<InferInsertModel<typeof schema.links>>
) {
  const url = faker.internet.url();
  const shortUrl = faker.string.nanoid(8);

  const [link] = await db
    .insert(schema.links)
    .values({
      originalUrl: url,
      shortUrl: shortUrl,
      accessCount: 0,
      ...overrides,
    })
    .returning();

  return link;
}