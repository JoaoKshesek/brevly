import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteLink } from "../api/delete-link";
import { toast } from "sonner";

export function useDeleteLink() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: deleteLink,
    onSuccess: () => {
      toast.success("Link Removido", {
        description: `O link foi apagado com sucesso.`,
      });
      qc.invalidateQueries({ queryKey: ["links"] });
    },
  });
}
