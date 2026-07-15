import { EmployeeList } from '../../components/EmployeeList/EmployeeList';
import { LoadingSpinner } from '../../components/LoadingSpinner/LoadingSpinner';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { StatCard } from '../../components/StatCard/StatCard';
import type { Employee } from '../../types/employee';
import { countByStatus, getDepartmentCounts } from '../../utils/filters';
import styles from './DashboardPage.module.css';

interface DashboardPageProps {
  employees: Employee[];
  isLoading: boolean;
  onSelectEmployee: (employeeId: string) => void;
  onViewAll: () => void;
}

export function DashboardPage({
  employees,
  isLoading,
  onSelectEmployee,
  onViewAll,
}: DashboardPageProps) {
  if (isLoading) {
    return <LoadingSpinner label="Loading dashboard..." />;
  }

  const activeCount = countByStatus(employees, 'active');
  const onLeaveCount = countByStatus(employees, 'on_leave');
  const departmentCounts = getDepartmentCounts(employees);
  const topDepartment = Object.entries(departmentCounts).sort(
    (a, b) => b[1] - a[1],
  )[0];
  const recentEmployees = employees.slice(0, 4);

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Overview of your workforce at a glance."
        actions={
          <button type="button" className={styles.linkButton} onClick={onViewAll}>
            View all employees
          </button>
        }
      />

      <section className={styles.stats}>
        <StatCard label="Total Employees" value={employees.length} />
        <StatCard label="Active" value={activeCount} helperText="Currently working" />
        <StatCard label="On Leave" value={onLeaveCount} helperText="Temporarily away" />
        <StatCard
          label="Largest Department"
          value={topDepartment?.[0] ?? 'N/A'}
          helperText={
            topDepartment ? `${topDepartment[1]} people` : 'No departments yet'
          }
        />
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Recent Employees</h3>
        <EmployeeList
          employees={recentEmployees}
          onSelectEmployee={onSelectEmployee}
          emptyTitle="No employees yet"
          emptyDescription="Add your first employee to get started."
        />
      </section>
    </div>
  );
}
