import type { InputHTMLAttributes } from 'react';
import classes from './Input.module.css';

export default function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={`${classes.input} ${className}`} {...props} />;
}
