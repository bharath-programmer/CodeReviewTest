import { useState } from 'react';
import { AppLayout } from './components/AppLayout/AppLayout';
import { useEmployees } from './hooks/useEmployees';
import { AddEmployeePage } from './pages/AddEmployeePage/AddEmployeePage';
import { DashboardPage } from './pages/DashboardPage/DashboardPage';
import { EmployeeDetailsPage } from './pages/EmployeeDetailsPage/EmployeeDetailsPage';
import { EmployeesPage } from './pages/EmployeesPage/EmployeesPage';
import { LoginPage } from './pages/LoginPage/LoginPage';
import type { EmployeeFormData, PageView } from './types/employee';

function App() {
  const [currentView, setCurrentView] = useState<PageView>('login');
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);
  const [currentUserName, setCurrentUserName] = useState('Admin');
  const { employees, isLoading, error, addEmployee } = useEmployees();

  const handleLogin = (userName: string) => {
    setCurrentUserName(userName);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setCurrentView('login');
    setSelectedEmployeeId(null);
  };

  const handleNavigate = (view: PageView) => {
    if (view !== 'employee-details') {
      setSelectedEmployeeId(null);
    }
    setCurrentView(view);
  };

  const handleSelectEmployee = (employeeId: string) => {
    setSelectedEmployeeId(employeeId);
    setCurrentView('employee-details');
  };

  const handleAddEmployee = async (formData: EmployeeFormData) => {
    const created = await addEmployee(formData);
    setSelectedEmployeeId(created.id);
    setCurrentView('employee-details');
  };

  if (currentView === 'login') {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <AppLayout
      currentView={currentView}
      currentUserName={currentUserName}
      onNavigate={handleNavigate}
      onLogout={handleLogout}
    >
      {currentView === 'dashboard' && (
        <DashboardPage
          employees={employees}
          isLoading={isLoading}
          onSelectEmployee={handleSelectEmployee}
          onViewAll={() => handleNavigate('employees')}
        />
      )}

      {currentView === 'employees' && (
        <EmployeesPage
          employees={employees}
          isLoading={isLoading}
          error={error}
          onSelectEmployee={handleSelectEmployee}
          onAddEmployee={() => handleNavigate('add-employee')}
        />
      )}

      {currentView === 'employee-details' && (
        <EmployeeDetailsPage
          employeeId={selectedEmployeeId}
          onBack={() => handleNavigate('employees')}
        />
      )}

      {currentView === 'add-employee' && (
        <AddEmployeePage
          onSubmit={handleAddEmployee}
          onCancel={() => handleNavigate('employees')}
        />
      )}
    </AppLayout>
  );
}

export default App;
