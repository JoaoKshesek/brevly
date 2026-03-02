import logoIcon from "@/assets/images/logo-icon.svg";
import styles from "./styles.module.css";

export function RedirectCard() {
  return (
    <div className={styles.redirectCard}>
      <img src={logoIcon} alt="Ícone da Logo Brev.ly" />

      <h1 className={styles.title}>Redirecionando...</h1>

      <div className={styles.content}>
        <p className={styles.description}>
          O link será aberto automaticamente em alguns instantes.{" "}
          <a className={styles.link} href="/">
            brev.ly
          </a>
          .
        </p>
        <p className={styles.description}>
          Não foi redirecionado?{" "}
          <a className={styles.link} href="/">
            Acesse aqui
          </a>
          .
        </p>
      </div>
    </div>
  );
}
