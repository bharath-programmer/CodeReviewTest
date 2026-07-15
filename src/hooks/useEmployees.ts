import { useCallback, useEffect, useState } from 'react';
import { createEmployee, getEmployees } from '../services/employeeService';
import type { Employee, EmployeeFormData } from '../types/employee';

interface UseEmployeesResult {
  employees: Employee[];
  isLoading: boolean;
  error: string | null;
  refreshEmployees: () => Promise<void>;
  addEmployee: (formData: EmployeeFormData) => Promise<Employee>;
}

export function useEmployees(): UseEmployeesResult {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshEmployees = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await getEmployees();
      setEmployees(data);
    } catch {
      setError('Unable to load employees. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshEmployees();
  }, [refreshEmployees]);

  const addEmployee = useCallback(async (formData: EmployeeFormData) => {
    const created = await createEmployee(formData);
    setEmployees((current) => [created, ...current]);
    return created;
  }, []);

  return {
    employees,
    isLoading,
    error,
    refreshEmployees,
    addEmployee,
  };
}
