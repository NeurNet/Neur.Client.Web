import { UsersList } from '@/components/control-panel/users-list';

export function TeacherPanel() {
  return (
    <>
      <h1>Панель управления</h1>

      <section>
        <h2>Список пользователей</h2>
        <UsersList />
      </section>
    </>
  );
}
