import { api } from "@/shared/lib/api/client";

export function updateLinkCountBySlug(slug: string) {
  return api<{ success: true }>(`/links/${slug}`, {
    method: "PUT",
  });
}
