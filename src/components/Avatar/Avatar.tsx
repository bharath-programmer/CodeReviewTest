import type { Employee } from '../../types/employee';
import { getInitials } from '../../utils/formatters';
import styles from './Avatar.module.css';

interface AvatarProps {
  employee: Pick<Employee, 'firstName' | 'lastName'>;
  size?: 'sm' | 'md' | 'lg';
}

export function Avatar({ employee, size = 'md' }: AvatarProps) {
  return (
    <div className={`${styles.avatar} ${styles[size]}`} aria-hidden="true">
      {getInitials(employee)}
    </div>
  );
}
