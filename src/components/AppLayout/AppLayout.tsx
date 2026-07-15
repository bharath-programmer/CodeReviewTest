import type { ReactNode } from 'react';
import type { PageView } from '../../types/employee';
import { Header } from '../Header/Header';
import { Sidebar } from '../Sidebar/Sidebar';
import styles from './AppLayout.module.css';

interface AppLayoutProps {
  currentView: PageView;
  currentUserName: string;
  onNavigate: (view: PageView) => void;
  onLogout: () => void;
  children: ReactNode;
}

export function AppLayout({
  currentView,
  currentUserName,
  onNavigate,
  onLogout,
  children,
}: AppLayoutProps) {
  return (
    <div className={styles.shell}>
      <Sidebar currentView={currentView} onNavigate={onNavigate} />
      <div className={styles.main}>
        <Header currentUserName={currentUserName} onLogout={onLogout} />
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
}
