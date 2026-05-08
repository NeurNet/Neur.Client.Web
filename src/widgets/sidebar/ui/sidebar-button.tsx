import clsx from 'clsx';
import classes from './sidebar-button.module.css';

interface SidebarButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  label?: string;
  active?: boolean;
}

export function SidebarButton({
  children,
  icon,
  label,
  active = false,
  ...props
}: SidebarButtonProps) {
  return (
    <button className={clsx(classes.sidebarButton, active && classes.active)} {...props}>
      {icon}
      {children}

      <span className={classes.label}>{label}</span>
    </button>
  );
}
