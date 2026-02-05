import classes from './Input.module.css';

export function InputGroup({ children }: { children: React.ReactNode }) {
  return (
    <div className={classes.inputGroup}>
      {children}
    </div>
  );
}
