import type { InputHTMLAttributes } from 'react';
import styles from './Input.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function Input({ label, error, id, className = '', ...props }: InputProps) {
  const inputId = id ?? props.name;

  return (
    <label className={styles.field} htmlFor={inputId}>
      <span className={styles.label}>{label}</span>
      <input
        id={inputId}
        className={`${styles.input} ${error ? styles.inputError : ''} ${className}`}
        {...props}
      />
      {error ? <span className={styles.error}>{error}</span> : null}
    </label>
  );
}
