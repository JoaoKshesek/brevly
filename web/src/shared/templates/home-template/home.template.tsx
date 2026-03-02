import logoImg from "@/assets/images/logo.svg";
import { LinkList } from "@/shared/components/link-list";
import { NewLink } from "@/shared/components/new-link";
import styles from "./home.module.css";

export function HomeTemplate() {
  return (
    <div className={styles.template}>
      <img src={logoImg} alt="Logo Brev.ly" />

      <div className={styles.content}>
        <NewLink />
        <LinkList />
      </div>
    </div>
  );
}
