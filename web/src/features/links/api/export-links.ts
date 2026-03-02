import { api } from "@/shared/lib/api/client";
import type { ExportLinksResponse } from "../types/link.types";

export function exportLinks() {
  return api<ExportLinksResponse>("/links/export", {
    method: "POST",
  });
}
