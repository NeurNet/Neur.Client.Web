import type { FormHTMLAttributes } from 'react';
import classes from './Form.module.css';

export function Form({ children, ...props }: FormHTMLAttributes<HTMLFormElement>) {
  return (
    <form className={classes.form} {...props}>
      {children}
    </form>
  );
}
