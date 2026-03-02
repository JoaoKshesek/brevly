import { api } from "@/shared/lib/api/client";

export function deleteLink(slug: string) {
  return api<null>(`/links/${slug}`, {
    method: "DELETE",
  });
}
