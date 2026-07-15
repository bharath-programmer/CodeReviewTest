import type { Employee } from '../types/employee';
import { getFullName } from './formatters';

export function filterEmployees(employees: Employee[], searchTerm: string): Employee[] {
  const normalizedTerm = searchTerm.trim().toLowerCase();

  if (!normalizedTerm) {
    return employees;
  }

  return employees.filter((employee) => {
    const searchableFields = [
      getFullName(employee),
      employee.email,
      employee.department,
      employee.position,
      employee.status,
    ];

    return searchableFields.some((field) =>
      field.toLowerCase().includes(normalizedTerm),
    );
  });
}

export function countByStatus(employees: Employee[], status: Employee['status']): number {
  return employees.filter((employee) => employee.status === status).length;
}

export function getDepartmentCounts(employees: Employee[]): Record<string, number> {
  return employees.reduce<Record<string, number>>((counts, employee) => {
    counts[employee.department] = (counts[employee.department] ?? 0) + 1;
    return counts;
  }, {});
}
