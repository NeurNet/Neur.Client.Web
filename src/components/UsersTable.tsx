import { useEffect, useState } from 'react';
import { getUsers, type User } from '@/api/users';

export default function UsersTable() {
  const [data, setData] = useState<User[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getUsers()
      .then((data) => setData(data))
      .catch((err: Error) => setError(err.message));
  }, []);

  if (!data) {
    return <span>Loading...</span>;
  }

  if (error) {
    return <span>Error: {error}</span>;
  }

  return (
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
        {data.map((user) => (
          <tr key={user.user_id}>
            <th scope="row">{user.user_name}</th>
            <td>{user.name} {user.surname}</td>
            <td>{user.role}</td>
            <td>{user.tokens}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
