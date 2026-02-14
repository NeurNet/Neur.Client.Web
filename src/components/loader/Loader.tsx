import { Loader2 } from 'lucide-react';
import classes from './Loader.module.css';

export function Loader() {
  return <Loader2 className={classes.loader} size={20} />;
}
