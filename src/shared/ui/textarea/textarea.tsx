import clsx from 'clsx';
import classes from './textarea.module.css';

export function Textarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={clsx(classes.textarea, className)} {...props} />;
}
