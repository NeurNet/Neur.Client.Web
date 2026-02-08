import clsx from 'clsx';
import classes from './SidebarButton.module.css';

interface SidebarButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'danger';
}

export function SidebarButton({ className, variant = 'default', ...props }: SidebarButtonProps) {
  return (
    <button
      className={clsx(
        classes.sidebarButton,
        {
          [classes.default]: variant === 'default',
          [classes.danger]: variant === 'danger',
        },
        className,
      )}
      {...props}
    />
  );
}
