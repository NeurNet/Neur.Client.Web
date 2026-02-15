import { RequestList } from '@/components/control-panel/request-list';
import { UserList } from '@/components/control-panel/user-list';

export function TeacherPanel() {
  return (
    <>
      <h1>Панель управления</h1>

      <section>
        <h2>Список пользователей</h2>
        <UserList />
      </section>

      <section>
        <h2>История запросов</h2>
        <RequestList />
      </section>
    </>
  );
}
