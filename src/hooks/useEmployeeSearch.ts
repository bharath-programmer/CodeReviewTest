import { useMemo, useState } from 'react';
import type { Employee } from '../types/employee';
import { filterEmployees } from '../utils/filters';

export function useEmployeeSearch(employees: Employee[]) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEmployees = useMemo(
    () => filterEmployees(employees, searchTerm),
    [employees, searchTerm],
  );

  return {
    searchTerm,
    setSearchTerm,
    filteredEmployees,
  };
}
