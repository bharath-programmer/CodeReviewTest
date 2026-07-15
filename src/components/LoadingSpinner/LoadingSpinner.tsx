import styles from './LoadingSpinner.module.css';

interface LoadingSpinnerProps {
  label?: string;
}

export function LoadingSpinner({ label = 'Loading...' }: LoadingSpinnerProps) {
  return (
    <div className={styles.wrapper} role="status" aria-live="polite">
      <div className={styles.spinner} aria-hidden="true" />
      <p className={styles.label}>{label}</p>
    </div>
  );
}
