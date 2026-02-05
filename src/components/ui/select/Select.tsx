import type { SelectHTMLAttributes } from 'react';
import classes from './Select.module.css';

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={classes.input} {...props} />;
}
