import type { LabelHTMLAttributes } from 'react';
import classes from './Label.module.css';

export function Label(props: LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={classes.label} {...props} />;
}
