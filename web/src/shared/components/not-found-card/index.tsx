import notFoundImg from "@/assets/images/404.svg";
import styles from "./styles.module.css";

export function NotFoundCard() {
  return (
    <div className={styles.notFoundCard}>
      <img src={notFoundImg} alt="Link não encontrado" />

      <h1 className={styles.title}>Link não encontrado</h1>

      <p className={styles.description}>
        O link que você está tentando acessar não existe, foi removido ou é uma
        URL inválida. Saiba mais em{" "}
        <a className={styles.link} href="/">
          brev.ly
        </a>
        .
      </p>
    </div>
  );
}
