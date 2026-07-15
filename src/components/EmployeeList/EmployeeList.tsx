import type { Employee } from '../../types/employee';
import { EmptyState } from '../EmptyState/EmptyState';
import { EmployeeCard } from '../EmployeeCard/EmployeeCard';
import styles from './EmployeeList.module.css';

interface EmployeeListProps {
  employees: Employee[];
  onSelectEmployee: (employeeId: string) => void;
  emptyTitle?: string;
  emptyDescription?: string;
}

export function EmployeeList({
  employees,
  onSelectEmployee,
  emptyTitle = 'No employees found',
  emptyDescription = 'Try adjusting your search or add a new employee.',
}: EmployeeListProps) {
  if (employees.length === 0) {
    return <EmptyState title={emptyTitle} description={emptyDescription} />;
  }

  return (
    <div className={styles.grid}>
      {employees.map((employee) => (
        <EmployeeCard
          key={employee.id}
          employee={employee}
          onSelect={onSelectEmployee}
        />
      ))}
    </div>
  );
}
