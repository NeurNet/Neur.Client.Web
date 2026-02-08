import clsx from 'clsx';
import classes from './SidebarButton.module.css';
import { Loader2 } from 'lucide-react';

interface SidebarButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  showLoader?: boolean;
  icon?: React.ReactNode;
  variant?: 'default' | 'danger';
}

export function SidebarButton({
  variant = 'default',
  className,
  showLoader,
  children,
  icon,
  disabled,
  ...props
}: SidebarButtonProps) {
  return (
    <button
      className={clsx(classes.sidebarButton, classes[variant], className)}
      disabled={showLoader || disabled}
      {...props}
    >
      {showLoader ? <Loader2 size={20} className={classes.loader} /> : icon}
      {children}
    </button>
  );
}
