import classes from './users-page.module.css';
import { useUsers, mapUserRole } from '@/entities/user';
import { Input } from '@/shared/ui/input';
import { Select } from '@/shared/ui/select';

export function UsersPage() {
  const { data, isPending, error } = useUsers();

  if (isPending) return null;
  if (error) return <span>{error.message}</span>;

  return (
    <>
      <title>Пользователи - NeurNet</title>

      <div className={classes.filters}>
        <Input placeholder="Поиск по имени или ID" className={classes.searchInput} />

        <Select className={classes.filterSelect}>
          <option value="all">Все роли</option>
          <option value="students">Студенты</option>
          <option value="teachers">Преподаватели</option>
          <option value="admins">Админы</option>
        </Select>
      </div>

      <div className={classes.content}>
        <div className={classes.titleBlock}>
          <h2 className={classes.title}>Пользователи</h2>
          <span className={classes.description}>87 всего</span>
        </div>

        <table>
          <thead>
            <tr>
              <th>Имя, ID</th>
              <th>Роль</th>
              <th>Токены</th>
              <th>Последний запрос</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {data.map((user) => (
              <tr key={user.user_id}>
                <td>
                  {user.surname} {user.name}
                  <br />
                  {user.user_name}
                </td>
                <td>{mapUserRole(user.role)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
