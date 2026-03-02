import type { ReactNode } from "react";
import styles from "./styles.module.css";
import { cn } from "@/shared/utils/cn";

interface ButtonProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> {
  label: string;
  variant?: "primary" | "secondary";
  icon?: ReactNode;
}

export function Button({
  label,
  variant = "primary",
  icon,
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={cn(styles.button, styles[variant])}
      disabled={disabled}
      {...rest}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      <span>{label}</span>
    </button>
  );
}
