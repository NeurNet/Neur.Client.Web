import classes from './sidebar-button.module.css';

interface SidebarButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  label?: string;
}

export function SidebarButton({ children, icon, label, ...props }: SidebarButtonProps) {
  return (
    <button className={classes.sidebarButton} {...props}>
      {icon}
      {children}

      <span className={classes.label}>{label}</span>
    </button>
  );
}
