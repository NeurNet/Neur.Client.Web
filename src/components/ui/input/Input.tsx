import classes from './Input.module.css';

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={classes.input} {...props} />;
}
