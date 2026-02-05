import { UserList } from '@/components/admin/UserList';
import { ModelsControl } from '@/components/admin/ModelsControl';
import classes from './Admin.module.css';

export function Admin() {
  return (
    <div className={classes.admin}>
      <section>
        <h2>Пользователи</h2>
        <UserList />
      </section>

      <section>
        <h2>Модели</h2>
        <ModelsControl />
      </section>
    </div>
  );
}
