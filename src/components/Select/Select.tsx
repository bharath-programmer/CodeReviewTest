import type { SelectHTMLAttributes } from 'react';
import styles from './Select.module.css';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectOption[];
  error?: string;
}

export function Select({
  label,
  options,
  error,
  id,
  className = '',
  ...props
}: SelectProps) {
  const selectId = id ?? props.name;

  return (
    <label className={styles.field} htmlFor={selectId}>
      <span className={styles.label}>{label}</span>
      <select
        id={selectId}
        className={`${styles.select} ${error ? styles.selectError : ''} ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error ? <span className={styles.error}>{error}</span> : null}
    </label>
  );
}
