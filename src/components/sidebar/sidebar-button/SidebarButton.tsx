import clsx from 'clsx';
import classes from './SidebarButton.module.css';
import { Loader2 } from 'lucide-react';

interface SidebarButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  showLoader?: boolean;
  icon?: React.ReactNode;
  variant?: 'default' | 'danger';
  label?: string;
  hideText?: boolean;
}

export function SidebarButton({
  variant = 'default',
  className,
  showLoader,
  children,
  icon,
  disabled,
  label,
  hideText,
  ...props
}: SidebarButtonProps) {
  return (
    <button
      className={clsx(classes.sidebarButton, classes[variant], className)}
      disabled={showLoader || disabled}
      {...props}
    >
      {showLoader ? <Loader2 size={20} className={classes.loader} /> : icon}
      {!hideText && <span>{children}</span>}
      {label && <span className={classes.label}>{label}</span>}
    </button>
  );
}
