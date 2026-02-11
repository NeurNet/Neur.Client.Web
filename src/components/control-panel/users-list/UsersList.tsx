import { useQuery } from '@tanstack/react-query';
import { fetchUsers, type Role } from '@/api/user';
import { ErrorMessage } from '@/components/error-message';
import { Loader } from '@/components/Loader';

export function UsersList() {
  const { data, isPending, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  if (isPending) return <Loader />;
  if (error) return <ErrorMessage message={error.message} />;

  const roleToString = (role: Role) => {
    switch (role) {
      case 'student':
        return 'Студент';
      case 'teacher':
        return 'Преподаватель';
      case 'admin':
        return 'Админ';
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Имя пользователя</th>
          <th>Имя</th>
          <th>Роль</th>
          <th>Токены</th>
        </tr>
      </thead>

      <tbody>
        {data.map((user) => (
          <tr key={user.user_id}>
            <td>{user.user_name}</td>
            <td>
              {user.name} {user.surname}
            </td>
            <td>{roleToString(user.role)}</td>
            <td>{user.tokens} токенов</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
