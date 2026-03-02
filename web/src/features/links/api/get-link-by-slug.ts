import { api } from "@/shared/lib/api/client";
import type { GetLinkBySlugResponse } from "../types/link.types";

export function getLinkBySlug(slug: string) {
  return api<GetLinkBySlugResponse>(`/links/${slug}`);
}
