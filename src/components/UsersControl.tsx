import { useEffect, useState } from 'react';
import { getUsers, type User } from '@/api/users';
import { FullScreenLoader } from './FullScreenLoader';

export function UsersControl() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getUsers()
      .then((data) => setUsers(data))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <FullScreenLoader />;
  if (error) return <span>Ошибка: {error}</span>;

  return (
    <div>
      <h2>Пользователи</h2>

      <table>
        <thead>
          <tr>
            <th scope="col">Имя пользователя</th>
            <th scope="col">Имя</th>
            <th scope="col">Роль</th>
            <th scope="col">Кол-во токенов</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.user_id}>
              <th scope="row">{user.user_name}</th>
              <td>
                {user.name} {user.surname}
              </td>
              <td>{user.role}</td>
              <td>{user.tokens}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
