import { useState, type FormEvent } from 'react';
import { departments } from '../../data/mockEmployees';
import type { EmployeeFormData } from '../../types/employee';
import {
  hasFormErrors,
  validateEmployeeForm,
  type FormErrors,
} from '../../utils/validation';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { Select } from '../Select/Select';
import styles from './EmployeeForm.module.css';

interface EmployeeFormProps {
  onSubmit: (formData: EmployeeFormData) => Promise<void> | void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

const initialFormData: EmployeeFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  department: departments[0],
  position: '',
  status: 'active',
  hireDate: '',
  salary: 0,
};

export function EmployeeForm({
  onSubmit,
  onCancel,
  isSubmitting = false,
}: EmployeeFormProps) {
  const [formData, setFormData] = useState<EmployeeFormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [showErrors, setShowErrors] = useState(false);

  const updateField = <K extends keyof EmployeeFormData>(
    field: K,
    value: EmployeeFormData[K],
  ) => {
    setFormData((current) => {
      const next = { ...current, [field]: value };
      setErrors(validateEmployeeForm(next));
      return next;
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowErrors(true);

    const nextErrors = validateEmployeeForm(formData);
    setErrors(nextErrors);

    if (hasFormErrors(nextErrors)) {
      return;
    }

    await onSubmit(formData);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.grid}>
        <Input
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={(event) => updateField('firstName', event.target.value)}
          error={showErrors ? errors.firstName : undefined}
          required
        />
        <Input
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={(event) => updateField('lastName', event.target.value)}
          error={showErrors ? errors.lastName : undefined}
          required
        />
        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={(event) => updateField('email', event.target.value)}
          error={showErrors ? errors.email : undefined}
          required
        />
        <Input
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={(event) => updateField('phone', event.target.value)}
          error={showErrors ? errors.phone : undefined}
          required
        />
        <Select
          label="Department"
          name="department"
          value={formData.department}
          onChange={(event) => updateField('department', event.target.value)}
          options={departments.map((department) => ({
            value: department,
            label: department,
          }))}
          error={showErrors ? errors.department : undefined}
        />
        <Input
          label="Position"
          name="position"
          value={formData.position}
          onChange={(event) => updateField('position', event.target.value)}
          error={showErrors ? errors.position : undefined}
          required
        />
        <Select
          label="Status"
          name="status"
          value={formData.status}
          onChange={(event) =>
            updateField('status', event.target.value as EmployeeFormData['status'])
          }
          options={[
            { value: 'active', label: 'Active' },
            { value: 'inactive', label: 'Inactive' },
            { value: 'on_leave', label: 'On Leave' },
          ]}
        />
        <Input
          label="Hire Date"
          name="hireDate"
          type="date"
          value={formData.hireDate}
          onChange={(event) => updateField('hireDate', event.target.value)}
          error={showErrors ? errors.hireDate : undefined}
          required
        />
        <Input
          label="Salary"
          name="salary"
          type="number"
          min={0}
          value={formData.salary || ''}
          onChange={(event) =>
            updateField('salary', Number(event.target.value) || 0)
          }
          error={showErrors ? errors.salary : undefined}
          required
        />
      </div>

      <div className={styles.actions}>
        <Button type="button" variant="secondary" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Add Employee'}
        </Button>
      </div>
    </form>
  );
}
