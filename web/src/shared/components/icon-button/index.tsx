import type { ReactNode } from "react";
import styles from "./styles.module.css";

interface ButtonProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> {
  icon?: ReactNode;
}

export function IconButton({ icon, disabled, ...rest }: ButtonProps) {
  return (
    <button className={styles.button} disabled={disabled} {...rest}>
      {icon}
    </button>
  );
}
