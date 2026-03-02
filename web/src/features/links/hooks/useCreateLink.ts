import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLink } from "../api/create-link";
import type { CreateLinkDTO, MutationError } from "../types/link.types";

export function useCreateLink() {
  const qc = useQueryClient();

  const mutation = useMutation<unknown, MutationError, CreateLinkDTO>({
    mutationFn: createLink,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["links"] });
    },
    onError: (error: MutationError) => {
      toast.error("Erro no cadastro", {
        description: error?.body?.message,
      });
    },
  });

  return {
    createLink: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
}
