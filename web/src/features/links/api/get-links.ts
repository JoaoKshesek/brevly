import { api } from "@/shared/lib/api/client";
import type { GetLinksResponse } from "../types/link.types";

export function getLinks() {
  return api<GetLinksResponse>("/links");
}
