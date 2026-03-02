import { useQuery } from "@tanstack/react-query";
import { getLinks } from "../api/get-links";

export function useLinks() {
  return useQuery({
    queryKey: ["links"],
    queryFn: getLinks,
    refetchOnWindowFocus: true,
    refetchOnMount: "always",
    staleTime: 0,
    select: (data) => data.links,
  });
}
