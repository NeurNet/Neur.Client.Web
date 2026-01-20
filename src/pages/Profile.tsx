import { useAuth } from '@/contexts/AuthContext/AuthContext';
import Button from '@/components/Button/Button';
import ModelsTable from '@/components/ModelsTable';
import UsersTable from '@/components/UsersTable';

export default function Profile() {
  const { user, logout } = useAuth();

  if (!user) {
    return <div>Пользователь не авторизован</div>;
  }

  return (
    <div>
      <p>
        Выполнен вход как {user.username} ({user.role})
      </p>
      <Button onClick={logout}>Выйти</Button>

      {user.role === 'admin' && (
        <>
          <div>
            <h2>Пользователи</h2>
            <UsersTable />
          </div>

          <div>
            <h2>Модели</h2>
            <ModelsTable />
          </div>
        </>
      )}
    </div>
  );
}
