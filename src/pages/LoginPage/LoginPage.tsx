import { useState, type FormEvent } from 'react';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import styles from './LoginPage.module.css';

interface LoginPageProps {
  onLogin: (userName: string) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('password');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const displayName = email.split('@')[0] || 'Admin';
    onLogin(displayName);
  };

  return (
    <div className={styles.page}>
      <div className={styles.panel}>
        <div className={styles.brand}>
          <span className={styles.brandMark}>EMS</span>
          <div>
            <h1 className={styles.title}>Employee Management</h1>
            <p className={styles.subtitle}>Sign in to continue to the dashboard</p>
          </div>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <Input
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          <Button type="submit" fullWidth>
            Sign In
          </Button>
        </form>

        <p className={styles.hint}>
          UI-only login. Any credentials will take you to the dashboard.
        </p>
      </div>
    </div>
  );
}
