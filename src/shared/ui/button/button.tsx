import classes from './button.module.css';

export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={classes.button} {...props} />;
}
