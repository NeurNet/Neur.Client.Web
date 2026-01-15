import type { InputHTMLAttributes } from 'react';
import classes from './Input.module.css';

export default function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={classes.input} {...props} />;
}
