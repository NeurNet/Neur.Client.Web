import type { User } from '@/api/users';

export default function UsersTable({ users }: { users: User[] }) {
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
  );
}
