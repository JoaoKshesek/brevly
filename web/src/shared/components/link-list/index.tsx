import { DownloadSimple, Link, Spinner, WarningCircle } from "phosphor-react";
import { Button } from "../button";
import styles from "./styles.module.css";
import { LinkCard } from "../link-card";
import { useLinks } from "@/features/links/hooks/useLinks";
import { useExportLinks } from "@/features/links/hooks/useExportLinks";
import { useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

export function LinkList() {
  const { data: links, isLoading, isError } = useLinks();
  const { mutate: exportCsv, isPending } = useExportLinks();
  const linksRef = useRef<HTMLDivElement>(null);
  const [hasScroll, setHasScroll] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    const handler = () => {
      queryClient.invalidateQueries({ queryKey: ["links"] });
    };

    window.addEventListener("focus", handler);
    return () => window.removeEventListener("focus", handler);
  }, [queryClient]);

  useEffect(() => {
    const el = linksRef.current;
    if (!el) return;

    const checkScroll = () => {
      setHasScroll(el.scrollHeight > el.clientHeight);
    };

    checkScroll();

    const resizeObserver = new ResizeObserver(checkScroll);
    resizeObserver.observe(el);

    return () => resizeObserver.disconnect();
  }, [links]);

  return (
    <div className={styles.linkList}>
      {isLoading && <div className={styles.loader} />}
      <div className={styles.cardHeader}>
        <h2 className={styles.title}>Meus links</h2>

        <Button
          label="Baixar CSV"
          variant="secondary"
          icon={
            isPending ? (
              <Spinner className={styles.spin} />
            ) : (
              <DownloadSimple size={16} />
            )
          }
          disabled={!links?.length || isPending}
          onClick={() => exportCsv()}
        />
      </div>

      {isLoading && (
        <div className={styles.infobox}>
          <Spinner size={36} className={styles.spin} />
          <p className={styles.infoText}>Carregando links...</p>
        </div>
      )}

      {isError && (
        <div className={styles.infobox}>
          <WarningCircle size={36} />
          <p className={styles.infoText}>Erro ao carregar links.</p>
        </div>
      )}

      {!isLoading && links?.length === 0 && (
        <div className={styles.infobox}>
          <Link size={36} />
          <p className={styles.infoText}>
            Ainda não existem links cadastrados.
          </p>
        </div>
      )}

      <div
        ref={linksRef}
        className={`${styles.links} ${hasScroll ? styles.withScroll : ""}`}
      >
        {links?.map((link) => (
          <LinkCard key={link.id} link={link} />
        ))}
      </div>
    </div>
  );
}
