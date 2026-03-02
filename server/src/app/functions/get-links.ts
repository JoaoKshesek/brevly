import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { type Either, makeRight, makeLeft } from "@/infra/shared/either";
import { desc } from "drizzle-orm";
import { GetLinksFailed } from "./errors/get-links-failed";

type GetLinksOutput = {
  links: {
    id: string;
    originalUrl: string;
    shortUrl: string;
    accessCount: number;
    createdAt: Date;
  }[];
};

export async function getLinks(): Promise<
  Either<GetLinksFailed, GetLinksOutput>
> {
  try {
    const links = await db
      .select({
        id: schema.links.id,
        originalUrl: schema.links.originalUrl,
        shortUrl: schema.links.shortUrl,
        accessCount: schema.links.accessCount,
        createdAt: schema.links.createdAt,
      })
      .from(schema.links)
      .orderBy(desc(schema.links.createdAt));

    return makeRight({ links });

  } catch {
    return makeLeft(new GetLinksFailed());
  }
}