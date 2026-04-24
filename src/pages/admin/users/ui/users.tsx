import classes from './users.module.css';
import { RoleBadge } from './role-badge';
import { Select } from '@/shared/ui/select';
import { Input } from '@/shared/ui/input';
import { useQuery } from '@tanstack/react-query';
import { UserApi, type User } from '@/entities/user';
import { Button } from '@/shared/ui/button';
import { ManageUserDialog } from '@/widgets/manage-user-dialog';
import { useState } from 'react';
import { useSession } from '@/entities/session';

export function Users() {
  const users = useQuery({
    queryKey: ['users'],
    queryFn: UserApi.fetchUsers,
  });

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const session = useSession();

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
                <td className={classes.td}>{new Date(user.last_request).toLocaleString()}</td>
                <td className={classes.td}>
                  {user.user_id !== session.data?.id && (
                    <Button variant="secondary" size="sm" onClick={() => setSelectedUser(user)}>
                      Управление
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedUser && (
        <ManageUserDialog user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </div>
  );
}
