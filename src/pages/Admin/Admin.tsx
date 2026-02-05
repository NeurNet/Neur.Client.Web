import { UsersTable } from '@/components/UsersTable';
import { ModelsControl } from '@/components/ModelsControl';
import classes from './Admin.module.css';

export function Admin() {
  return (
    <div className={classes.admin}>
      <div>
        <h2>Пользователи</h2>
        <UsersTable />
      </div>

      <div>
        <h2>Модели</h2>
        <ModelsControl />
      </div>
    </div>
  );
}
