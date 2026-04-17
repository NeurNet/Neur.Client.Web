import classes from './users.module.css';
import { Select } from '@/shared/ui/select';
import { Input } from '@/shared/ui/input';
import { useQuery } from '@tanstack/react-query';
import { UserApi } from '@/entities/user';
import { RoleBadge } from './role-badge';
import { Button } from '@/shared/ui/button';

export function Users() {
  const users = useQuery({
    queryKey: ['users'],
    queryFn: UserApi.fetchUsers,
  });

  if (users.isPending) return null;
  if (users.error) return <span>{users.error.message}</span>;

  return (
    <div>
      <div className={classes.filters}>
        <Input className={classes.search} placeholder="Поиск по имени или ID" role="search" />

        <Select>
          <option value="all">Все роли</option>
          <option value="students">Студенты</option>
          <option value="teachers">Преподаватели</option>
          <option value="admins">Админы</option>
        </Select>
      </div>

      <div className={classes.content}>
        <div className={classes.header}>
          <h1 className={classes.title}>Пользователи</h1>
          <span className={classes.description}>{users.data.length} всего</span>
        </div>

        <table className={classes.table}>
          <thead>
            <tr>
              <th className={classes.th}>Имя, ID</th>
              <th className={classes.th}>Роль</th>
              <th className={classes.th}>Токены</th>
              <th className={classes.th}>Последний запрос</th>
              <th className={classes.th} />
            </tr>
          </thead>

          <tbody>
            {users.data.map((user) => (
              <tr key={user.user_id} className={classes.tr}>
                <td className={classes.td}>
                  <span>
                    {user.surname} {user.name}
                  </span>
                  <span className={classes.username}>{user.user_name}</span>
                </td>
                <td className={classes.td}>
                  <RoleBadge>
                    {user.role === 'admin'
                      ? 'Админ'
                      : user.role === 'teacher'
                        ? 'Преподаватель'
                        : 'Студент'}
                  </RoleBadge>
                </td>
                <td className={classes.td}>{user.tokens} токенов</td>
                <td className={classes.td}>Фиг знает когда был</td>
                <td className={classes.td}>
                  <Button variant="secondary" size="sm">
                    Управление
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
