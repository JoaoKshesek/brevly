import { useQuery } from "@tanstack/react-query";
import { getLinkBySlug } from "../api/get-link-by-slug";

export function useLink(slug: string) {
  return useQuery({
    queryKey: ["link", slug],
    queryFn: () => getLinkBySlug(slug),
    enabled: !!slug,
  });
}
