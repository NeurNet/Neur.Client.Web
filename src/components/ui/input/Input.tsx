import type { InputHTMLAttributes } from 'react';
import classes from './Input.module.css';

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={classes.input} {...props} />;
}
