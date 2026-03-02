import type { Link } from "@/features/links/types/link.types";
import { IconButton } from "../icon-button";
import styles from "./styles.module.css";
import { Copy, Trash } from "phosphor-react";
import { useDeleteLink } from "@/features/links/hooks/useDeleteLink";
import { toast } from "sonner";

interface LinkCardProps {
  link: Link;
}

export function LinkCard({ link }: LinkCardProps) {
  const deleteLinkMutation = useDeleteLink();

  const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${FRONTEND_URL}/${link.shortUrl}`);
      toast.info("Link copiado com sucesso", {
        description: `O link ${link.shortUrl} foi copiado para a área de transferência.`,
      });
    } catch {
      toast.error("Erro ao copiar URL", {
        description: "Não foi possível copiar  URL encurtada",
      });
    }
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm(`Você realmente quer apagar o link ${link.shortUrl}?`);
    if (confirmDelete) {
      deleteLinkMutation.mutate(link.shortUrl);
    }
  };
  return (
    <div className={styles.linkCard}>
      <div className={styles.left}>
        <a
          className={styles.link}
          href={`${FRONTEND_URL}/${link.shortUrl}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {FRONTEND_URL}/{link.shortUrl}
        </a>
        <p className={styles.originalUrl}>{link.originalUrl}</p>
      </div>

      <div className={styles.right}>
        <p className={styles.accesscount}>{link.accessCount} acessos</p>
        <div className={styles.action}>
          <IconButton icon={<Copy />} onClick={handleCopy} />
          <IconButton icon={<Trash />} onClick={handleDelete} />
        </div>
      </div>
    </div>
  );
}
