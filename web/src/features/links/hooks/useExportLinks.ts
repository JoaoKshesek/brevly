import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { exportLinks } from "../api/export-links";
import type { MutationError } from "../types/link.types";

interface ExportResponse {
  reportUrl: string;
}

export function useExportLinks() {
  return useMutation({
    mutationFn: exportLinks,

    onSuccess: ({ reportUrl }: ExportResponse) => {
      try {
        const link = document.createElement("a");

        link.href = reportUrl;
        link.setAttribute("download", "links.csv");
        link.rel = "noopener noreferrer";

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast.success("CSV gerado com sucesso");
      } catch {
        window.open(reportUrl, "_blank", "noopener,noreferrer");
      }
    },

    onError: (error: MutationError) => {
      toast.error("Erro ao exportar", {
        description: error?.body?.message ?? "Erro inesperado",
      });
    },
  });
}
