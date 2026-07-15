import type { EmployeeStatus } from '../../types/employee';
import { formatStatusLabel } from '../../utils/formatters';
import styles from './StatusBadge.module.css';

interface StatusBadgeProps {
  status: EmployeeStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`${styles.badge} ${styles[status]}`}>
      {formatStatusLabel(status)}
    </span>
  );
}
