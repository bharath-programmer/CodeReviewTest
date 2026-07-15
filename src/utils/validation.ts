import type { EmployeeFormData } from '../types/employee';

export type FormErrors = Partial<Record<keyof EmployeeFormData, string>>;

export function validateEmployeeForm(formData: EmployeeFormData): FormErrors {
  const errors: FormErrors = {};

  if (!formData.firstName.trim()) {
    errors.firstName = 'First name is required';
  }

  if (!formData.lastName.trim()) {
    errors.lastName = 'Last name is required';
  }

  if (!formData.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Enter a valid email address';
  }

  if (!formData.phone.trim()) {
    errors.phone = 'Phone number is required';
  }

  if (!formData.department.trim()) {
    errors.department = 'Department is required';
  }

  if (!formData.position.trim()) {
    errors.position = 'Position is required';
  }

  if (!formData.hireDate) {
    errors.hireDate = 'Hire date is required';
  }

  if (!formData.salary || formData.salary <= 0) {
    errors.salary = 'Salary must be greater than zero';
  }

  return errors;
}

export function hasFormErrors(errors: FormErrors): boolean {
  return Object.keys(errors).length > 0;
}
