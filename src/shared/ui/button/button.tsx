import classes from './button.module.css';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'md' | 'icon';
}

export function Button({ className, size = 'md', ...props }: ButtonProps) {
  return <button className={clsx(classes.button, classes[size], className)} {...props} />;
}
