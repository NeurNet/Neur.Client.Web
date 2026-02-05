import { useQuery } from '@tanstack/react-query';
import { getUsers } from '@/api/users';
import { FullScreenLoader } from '../FullScreenLoader';

export function UsersTable() {
  const { data, isPending, error } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  if (isPending) return <FullScreenLoader />;
  if (error) return <span>Ошибка: {error.message}</span>;

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
            <td>
              {user.name} {user.surname}
            </td>
            <td>{user.role}</td>
            <td>{user.tokens}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
