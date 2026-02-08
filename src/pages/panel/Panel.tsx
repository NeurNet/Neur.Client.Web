import { ModelsTable } from '@/components/panel/models-table';
import { UsersTable } from '@/components/panel/users-table';

export function Panel() {
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
