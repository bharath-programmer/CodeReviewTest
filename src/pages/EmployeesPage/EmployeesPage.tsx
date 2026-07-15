import { Button } from '../../components/Button/Button';
import { EmployeeList } from '../../components/EmployeeList/EmployeeList';
import { LoadingSpinner } from '../../components/LoadingSpinner/LoadingSpinner';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { useEmployeeSearch } from '../../hooks/useEmployeeSearch';
import type { Employee } from '../../types/employee';
import styles from './EmployeesPage.module.css';

interface EmployeesPageProps {
  employees: Employee[];
  isLoading: boolean;
  error: string | null;
  onSelectEmployee: (employeeId: string) => void;
  onAddEmployee: () => void;
}

export function EmployeesPage({
  employees,
  isLoading,
  error,
  onSelectEmployee,
  onAddEmployee,
}: EmployeesPageProps) {
  const { searchTerm, setSearchTerm, filteredEmployees } = useEmployeeSearch(employees);

  if (isLoading) {
    return <LoadingSpinner label="Loading employees..." />;
  }

  return (
    <div>
      <PageHeader
        title="Employees"
        description="Browse, search, and open employee profiles."
        actions={
          <Button onClick={onAddEmployee}>Add Employee</Button>
        }
      />

      <div className={styles.toolbar}>
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        <p className={styles.count}>
          Showing {filteredEmployees.length} of {employees.length}
        </p>
      </div>

      {error ? <p className={styles.error}>{error}</p> : null}

      <EmployeeList
        employees={filteredEmployees}
        onSelectEmployee={onSelectEmployee}
        emptyTitle={searchTerm ? 'No matches found' : 'No employees yet'}
        emptyDescription={
          searchTerm
            ? 'Try a different name, department, or position.'
            : 'Add an employee to populate this list.'
        }
      />
    </div>
  );
}
