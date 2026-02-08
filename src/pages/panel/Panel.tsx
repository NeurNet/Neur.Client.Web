import { ModelsList } from '@/components/control-panel/models-list';
import { UsersList } from '@/components/control-panel/users-list';

export function Panel() {
  return (
    <>
      <h1>Панель управления</h1>

      <section>
        <h2>Модели</h2>
        <ModelsList />
      </section>

      <section>
        <h2>Пользователи</h2>
        <UsersList />
      </section>
    </>
  );
}
