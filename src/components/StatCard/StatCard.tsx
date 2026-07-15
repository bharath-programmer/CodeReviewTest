import styles from './StatCard.module.css';

interface StatCardProps {
  label: string;
  value: string | number;
  helperText?: string;
}

export function StatCard({ label, value, helperText }: StatCardProps) {
  return (
    <article className={styles.card}>
      <p className={styles.label}>{label}</p>
      <p className={styles.value}>{value}</p>
      {helperText ? <p className={styles.helper}>{helperText}</p> : null}
    </article>
  );
}
