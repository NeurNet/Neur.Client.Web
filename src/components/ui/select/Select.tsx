import classes from './Select.module.css';

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={classes.select} {...props} />;
}
