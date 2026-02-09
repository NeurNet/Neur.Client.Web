import { useQuery } from '@tanstack/react-query';
import { fetchUsers, type Role } from '@/api/user';
import classes from './UsersList.module.css';

export function UsersList() {
  const { data, isPending, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  if (isPending) return <span>Loading...</span>;
  if (error) return <span>{error.message}</span>;

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

  const addTokensHandler = () => {};

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
            <td>
              {user.tokens} токенов (
              <span className={classes.addTokens} onClick={addTokensHandler}>
                добавить
              </span>
              )
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
