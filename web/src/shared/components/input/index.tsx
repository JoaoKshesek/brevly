import styles from "./styles.module.css";
import { cn } from "@/shared/utils/cn";
import { Warning } from "phosphor-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  prefix?: string;
}

export function Input({ label, error, prefix, ...rest }: InputProps) {
  return (
    <div
      className={cn(
        styles.wrapper,
        error && styles.errorState,
        rest.disabled && styles.disabled,
      )}
    >
      <label className={styles.labelWrapper}>
        <span className={styles.label}>{label}</span>

        <div className={styles.inputWrapper}>
          {prefix && <span className={styles.prefix}>{prefix}</span>}
          <input className={styles.input} {...rest} />
        </div>
      </label>
      {error && (
        <div className={styles.error}>
          <Warning size={16} />
          <span className={styles.errorText}>{error}</span>
        </div>
      )}
    </div>
  );
}
