import { useEffect, useState } from 'react';
import { getUsers, type User } from '@/api/users';
import { getModels, type Model } from '@/api/models';
import { useAuth } from '@/contexts/AuthContext/AuthContext';
import Button from '@/components/Button/Button';
import ModelsTable from '@/components/ModelsTable';
import UsersTable from '@/components/UsersTable';

export default function Profile() {
  const { user, logout } = useAuth();

  const [users, setUsers] = useState<User[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      getModels()
        .then((data) => setModels(data))
        .catch((err: Error) => setError(err.message)),

      getUsers()
        .then((data) => setUsers(data))
        .catch((err: Error) => setError(err.message)),
    ]).then(() => setLoading(false));
  }, []);

  if (loading) {
    return <span>Loading...</span>;
  }

  if (error) {
    return <span>Error: {error}</span>;
  }

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
            <UsersTable users={users} />
          </div>

          <div>
            <h2>Модели</h2>
            <ModelsTable models={models} />
          </div>
        </>
      )}
    </div>
  );
}
