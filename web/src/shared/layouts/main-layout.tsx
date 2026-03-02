import type { PropsWithChildren } from "react";
import styles from "./main-layout.module.css";

export function MainLayout({ children }: PropsWithChildren) {
  return <main className={styles.main}>{children}</main>;
}
