import clsx from 'clsx';
import classes from './TextArea.module.css';

export function TextArea({ className, ...props }: React.InputHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={clsx(classes.textArea, className)} {...props} />;
}
