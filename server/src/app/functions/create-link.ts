import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { eq } from "drizzle-orm";
import { type Either, makeLeft, makeRight } from "@/infra/shared/either";
import { isValidUrl } from "./validators/is-valid-url";
import { isValidSlug } from "./validators/is-valid-slug";
import { InvalidURLFormat } from "./errors/invalid-url-format";
import { InvalidSlugFormat } from "./errors/invalid-slug-format";
import { SlugAlreadyExists } from "./errors/slug-already-exists";

type CreateLinkInput = {
  originalUrl: string;
  slug: string;
};

type CreateLinkOutput = {
  success: true;
};

type CreateLinkError =
  | InvalidURLFormat
  | InvalidSlugFormat
  | SlugAlreadyExists;

export async function createLink(
  input: CreateLinkInput
): Promise<Either<CreateLinkError, CreateLinkOutput>> {
  const { originalUrl, slug } = input;

  if (!isValidUrl(originalUrl)) {
    return makeLeft(new InvalidURLFormat());
  }

  if (!isValidSlug(slug)) {
    return makeLeft(new InvalidSlugFormat());
  }

  const existing = await db
    .select({ id: schema.links.id })
    .from(schema.links)
    .where(eq(schema.links.shortUrl, slug))
    .limit(1);

  if (existing.length > 0) {
    return makeLeft(new SlugAlreadyExists());
  }

  await db.insert(schema.links).values({
    originalUrl,
    shortUrl: slug,
    accessCount: 0,
  });

  return makeRight({ success: true });
}