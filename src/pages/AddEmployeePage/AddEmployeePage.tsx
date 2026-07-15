import { useState } from 'react';
import { EmployeeForm } from '../../components/EmployeeForm/EmployeeForm';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import type { EmployeeFormData } from '../../types/employee';
import styles from './AddEmployeePage.module.css';

interface AddEmployeePageProps {
  onSubmit: (formData: EmployeeFormData) => Promise<void>;
  onCancel: () => void;
}

export function AddEmployeePage({ onSubmit, onCancel }: AddEmployeePageProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: EmployeeFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      await onSubmit(formData);
    } catch {
      setError('Unable to add employee. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Add Employee"
        description="Create a new employee record using the form below."
      />

      <div className={styles.panel}>
        {error ? <p className={styles.error}>{error}</p> : null}
        <EmployeeForm
          onSubmit={handleSubmit}
          onCancel={onCancel}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
}
