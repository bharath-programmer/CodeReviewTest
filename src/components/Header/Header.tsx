import { Button } from '../Button/Button';
import styles from './Header.module.css';

interface HeaderProps {
  currentUserName: string;
  onLogout: () => void;
}

export function Header({ currentUserName, onLogout }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div>
        <p className={styles.eyebrow}>Employee Management System</p>
        <h1 className={styles.title}>Welcome back, {currentUserName}</h1>
      </div>
      <Button variant="secondary" size="sm" onClick={onLogout}>
        Log out
      </Button>
    </header>
  );
}
