import { ModelsTable } from '@/components/admin/models-table';
import { UsersTable } from '@/components/admin/users-table';

export function Admin() {
  return (
    <>
      <h1>Панель управления</h1>

      <section>
        <h2>Модели</h2>
        <ModelsTable />
      </section>

      <section>
        <h2>Пользователи</h2>
        <UsersTable />
      </section>
    </>
  );
}
