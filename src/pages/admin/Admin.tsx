import { UsersTable } from '@/components/admin/UsersTable';
import { ModelsControl } from '@/components/admin/ModelsControl';
import classes from './Admin.module.css';

export function Admin() {
  return (
    <div className={classes.admin}>
      <section>
        <h2>Пользователи</h2>
        <UsersTable />
      </section>

      <section>
        <h2>Модели</h2>
        <ModelsControl />
      </section>
    </div>
  );
}
