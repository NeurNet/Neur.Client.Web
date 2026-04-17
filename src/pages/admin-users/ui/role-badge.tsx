import classes from './role-badge.module.css';

export function RoleBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className={classes.badge}>
      {children}
    </div>
  );
}
