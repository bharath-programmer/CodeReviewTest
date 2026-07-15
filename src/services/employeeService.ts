import { mockEmployees } from '../data/mockEmployees';
import type { Employee, EmployeeFormData } from '../types/employee';

const STORAGE_KEY = 'ems-employees';

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function readEmployees(): Employee[] {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockEmployees));
    return [...mockEmployees];
  }

  try {
    return JSON.parse(stored) as Employee[];
  } catch {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockEmployees));
    return [...mockEmployees];
  }
}

function writeEmployees(employees: Employee[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
}

export async function getEmployees(): Promise<Employee[]> {
  await delay(400);
  return readEmployees();
}

export async function getEmployeeById(id: string): Promise<Employee | undefined> {
  await delay(300);
  return readEmployees().find((employee) => employee.id === id);
}

export async function createEmployee(formData: EmployeeFormData): Promise<Employee> {
  await delay(500);

  const employees = readEmployees();
  const newEmployee: Employee = {
    ...formData,
    id: `emp-${String(employees.length + 1).padStart(3, '0')}`,
  };

  writeEmployees([newEmployee, ...employees]);
  return newEmployee;
}
