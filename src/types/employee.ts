export type EmployeeStatus = 'active' | 'inactive' | 'on_leave';

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  status: EmployeeStatus;
  hireDate: string;
  salary: number;
}

export type EmployeeFormData = Omit<Employee, 'id'>;

export type PageView =
  | 'login'
  | 'dashboard'
  | 'employees'
  | 'employee-details'
  | 'add-employee';
