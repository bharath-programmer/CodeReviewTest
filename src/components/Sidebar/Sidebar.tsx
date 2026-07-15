import type { PageView } from '../../types/employee';
import styles from './Sidebar.module.css';

interface NavItem {
  label: string;
  view: Exclude<PageView, 'login' | 'employee-details'>;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', view: 'dashboard' },
  { label: 'Employees', view: 'employees' },
  { label: 'Add Employee', view: 'add-employee' },
];

interface SidebarProps {
  currentView: PageView;
  onNavigate: (view: PageView) => void;
}

export function Sidebar({ currentView, onNavigate }: SidebarProps) {
  const activeView =
    currentView === 'employee-details' ? 'employees' : currentView;

  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <span className={styles.brandMark}>EMS</span>
        <span className={styles.brandText}>People Ops</span>
      </div>
      <nav className={styles.nav} aria-label="Main navigation">
        {navItems.map((item) => {
          const isActive = activeView === item.view;

          return (
            <button
              key={item.view}
              type="button"
              className={`${styles.navItem} ${isActive ? styles.active : ''}`}
              onClick={() => onNavigate(item.view)}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
