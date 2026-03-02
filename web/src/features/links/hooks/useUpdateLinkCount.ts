import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateLinkCountBySlug } from "../api/update-link-count-by-slug";
import type { MutationError } from "../types/link.types";

export function useUpdateLinkCount() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: updateLinkCountBySlug,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["links"] });
    },
    onError: (error: MutationError) => {
      toast.error("Erro ao redirecionar", {
        description: error?.body?.message,
      });
    },
  });
}
