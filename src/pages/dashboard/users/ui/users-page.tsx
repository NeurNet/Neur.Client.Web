import classes from './users-page.module.css';
import { useUsers, mapUserRole, type UserRole, type User } from '@/entities/user';
import { EditUserDialog } from '@/features/dashboard/users';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Select } from '@/shared/ui/select';
import { Tag } from '@/shared/ui/tag';
import { useMemo, useState } from 'react';

type RoleFilter = 'all' | UserRole;

export function UsersPage() {
  const { data, isPending, error } = useUsers();

  const [searchText, setSearchText] = useState('');
  const [roleFilter, setRoleFilter] = useState<RoleFilter>('all');

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const users = useMemo(() => {
    if (!data) return [];

    const q = searchText.toLowerCase();

    return data.filter((user) => {
      const fullName = `${user.surname} ${user.name}`.toLowerCase();

      const matchesSearch = fullName.includes(q) || user.user_name.includes(q);
      const matchesRole = roleFilter === 'all' || user.role === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [data, searchText, roleFilter]);

  if (isPending) return null;
  if (error) return <span>{error.message}</span>;

  return (
    <>
      <title>Пользователи - NeurNet</title>

      <div className={classes.filters}>
        <Input
          placeholder="Поиск по имени или ID"
          className={classes.searchInput}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <Select
          className={classes.filterSelect}
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value as RoleFilter)}
        >
          <option value="all">Все роли</option>
          <option value="student">Студенты</option>
          <option value="teacher">Преподаватели</option>
          <option value="admin">Админы</option>
        </Select>
      </div>

      <div className={classes.content}>
        <div className={classes.titleBlock}>
          <h2 className={classes.title}>Пользователи</h2>
          <span className={classes.description}>{data.length} всего</span>
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
            {users.map((user) => (
              <tr key={user.user_id}>
                <td>
                  <span className={classes.name}>
                    {user.surname} {user.name}
                  </span>
                  <br />
                  <span className={classes.username}>{user.user_name}</span>
                </td>
                <td>
                  <div className={classes.tagWrapper}>
                    <Tag variant={user.role === 'student' ? 'success' : 'error'}>
                      {mapUserRole(user.role)}
                    </Tag>
                  </div>
                </td>
                <td>{user.tokens} токенов</td>
                <td>{new Date(user.last_request).toLocaleString()}</td>
                <td>
                  <Button size="sm" variant="outline" onClick={() => setSelectedUser(user)}>
                    Управление
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedUser && <EditUserDialog user={selectedUser} onClose={() => setSelectedUser(null)} />}
    </>
  );
}
