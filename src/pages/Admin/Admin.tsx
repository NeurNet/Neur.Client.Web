import { UsersControl } from '@/components/UsersControl';
import { ModelsControl } from '@/components/ModelsControl';
import classes from './Admin.module.css';

export function Admin() {
  return (
    <div className={classes.admin}>
      <UsersControl />
      <ModelsControl />
    </div>
  );
}
