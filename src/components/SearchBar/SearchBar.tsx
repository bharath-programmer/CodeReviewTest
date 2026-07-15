import styles from './SearchBar.module.css';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = 'Search employees...',
}: SearchBarProps) {
  return (
    <div className={styles.wrapper}>
      <span className={styles.icon} aria-hidden="true">
        ⌕
      </span>
      <input
        type="search"
        className={styles.input}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label="Search employees"
      />
    </div>
  );
}
