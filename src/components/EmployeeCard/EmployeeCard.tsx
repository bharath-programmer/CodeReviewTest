import type { Employee } from '../../types/employee';
import { formatCurrency, getFullName } from '../../utils/formatters';
import { Avatar } from '../Avatar/Avatar';
import { StatusBadge } from '../StatusBadge/StatusBadge';
import styles from './EmployeeCard.module.css';

interface EmployeeCardProps {
  employee: Employee;
  onSelect: (employeeId: string) => void;
}

export function EmployeeCard({ employee, onSelect }: EmployeeCardProps) {
  return (
    <button
      type="button"
      className={styles.card}
      onClick={() => onSelect(employee.id)}
    >
      <div className={styles.top}>
        <Avatar employee={employee} />
        <div className={styles.identity}>
          <h3 className={styles.name}>{getFullName(employee)}</h3>
          <p className={styles.position}>{employee.position}</p>
        </div>
        <StatusBadge status={employee.status} />
      </div>
      <div className={styles.meta}>
        <span>{employee.department}</span>
        <span>{formatCurrency(employee.salary)}</span>
      </div>
    </button>
  );
}
