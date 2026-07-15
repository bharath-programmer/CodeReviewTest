import { useEffect, useState } from 'react';
import { Avatar } from '../../components/Avatar/Avatar';
import { Button } from '../../components/Button/Button';
import { LoadingSpinner } from '../../components/LoadingSpinner/LoadingSpinner';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { StatusBadge } from '../../components/StatusBadge/StatusBadge';
import { getEmployeeById } from '../../services/employeeService';
import type { Employee } from '../../types/employee';
import {
  formatCurrency,
  formatDate,
  getFullName,
} from '../../utils/formatters';
import styles from './EmployeeDetailsPage.module.css';

interface EmployeeDetailsPageProps {
  employeeId: string | null;
  onBack: () => void;
}

export function EmployeeDetailsPage({
  employeeId,
  onBack,
}: EmployeeDetailsPageProps) {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadEmployee = async () => {
      if (!employeeId) {
        setError('Employee not found.');
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const result = await getEmployeeById(employeeId);

        if (!isMounted) {
          return;
        }

        if (!result) {
          setError('Employee not found.');
          setEmployee(null);
        } else {
          setEmployee(result);
        }
      } catch {
        if (isMounted) {
          setError('Unable to load employee details.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadEmployee();

    return () => {
      isMounted = false;
    };
  }, [employeeId]);

  if (isLoading) {
    return <LoadingSpinner label="Loading employee details..." />;
  }

  if (error || !employee) {
    return (
      <div>
        <PageHeader title="Employee Details" />
        <p className={styles.error}>{error ?? 'Employee not found.'}</p>
        <Button variant="secondary" onClick={onBack}>
          Back to Employees
        </Button>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Employee Details"
        description="Profile information for the selected employee."
        actions={
          <Button variant="secondary" onClick={onBack}>
            Back to Employees
          </Button>
        }
      />

      <section className={styles.card}>
        <div className={styles.header}>
          <Avatar employee={employee} size="lg" />
          <div>
            <h3 className={styles.name}>{getFullName(employee)}</h3>
            <p className={styles.position}>{employee.position}</p>
            <StatusBadge status={employee.status} />
          </div>
        </div>

        <dl className={styles.details}>
          <div>
            <dt>Email</dt>
            <dd>{employee.email}</dd>
          </div>
          <div>
            <dt>Phone</dt>
            <dd>{employee.phone}</dd>
          </div>
          <div>
            <dt>Department</dt>
            <dd>{employee.department}</dd>
          </div>
          <div>
            <dt>Hire Date</dt>
            <dd>{formatDate(employee.hireDate)}</dd>
          </div>
          <div>
            <dt>Salary</dt>
            <dd>{formatCurrency(employee.salary)}</dd>
          </div>
          <div>
            <dt>Employee ID</dt>
            <dd>{employee.id}</dd>
          </div>
        </dl>
      </section>
    </div>
  );
}
