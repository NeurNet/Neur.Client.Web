import classes from './sidebar-button.module.css';

interface SidebarButtonProps {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  label?: string;
}

export function SidebarButton({ children, icon, label }: SidebarButtonProps) {
  return (
    <button className={classes.sidebarButton}>
      {icon}
      {children}

      <span className={classes.label}>{label}</span>
    </button>
  );
}
