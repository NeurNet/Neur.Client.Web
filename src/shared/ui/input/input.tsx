import classes from './input.module.css';

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={classes.input} {...props} />;
}
