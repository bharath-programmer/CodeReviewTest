import type { Employee, EmployeeStatus } from '../types/employee';

export function getFullName(employee: Pick<Employee, 'firstName' | 'lastName'>): string {
  return `${employee.firstName} ${employee.lastName}`;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}

export function formatStatusLabel(status: EmployeeStatus): string {
  switch (status) {
    case 'active':
      return 'Active';
    case 'inactive':
      return 'Inactive';
    case 'on_leave':
      return 'On Leave';
    default:
      return status;
  }
}

export function getInitials(employee: Pick<Employee, 'firstName' | 'lastName'>): string {
  return `${employee.firstName.charAt(0)}${employee.lastName.charAt(0)}`.toUpperCase();
}
