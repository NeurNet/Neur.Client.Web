import classes from './users.module.css';
import { RoleBadge } from './role-badge';
import { Select } from '@/shared/ui/select';
import { Input } from '@/shared/ui/input';
import { useQuery } from '@tanstack/react-query';
import { UserApi, type User } from '@/entities/user';
import { Button } from '@/shared/ui/button';
import { EditUserDialog } from '@/widgets/dialogs/edit-user';
import { useMemo, useState } from 'react';
import { useSession } from '@/entities/session';

type Filter = 'all' | 'students' | 'teachers' | 'admins';

export function Users() {
  const users = useQuery({
    queryKey: ['users'],
    queryFn: UserApi.fetchUsers,
  });

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('all');

  const session = useSession();

  const filteredUsers = useMemo(() => {
    if (!users.data) return [];

    const query = searchQuery.toLowerCase();
    const searchResults = users.data.filter(
      (u) =>
        u.surname.toLowerCase().includes(query) ||
        u.name.toLowerCase().includes(query) ||
        u.user_name.toLowerCase().includes(query),
    );

    switch (filter) {
      case 'all':
        return searchResults;
      case 'students':
        return searchResults.filter((u) => u.role === 'student');
      case 'teachers':
        return searchResults.filter((u) => u.role === 'teacher');
      case 'admins':
        return searchResults.filter((u) => u.role === 'admin');
    }
  }, [users.data, searchQuery, filter]);

  if (users.isPending) return null;
  if (users.error) return <span>{users.error.message}</span>;

  return (
    <div>
      <div className={classes.filters}>
        <Input
          className={classes.search}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Поиск по имени или ID"
          role="search"
        />

        <Select value={filter} onChange={(e) => setFilter(e.target.value as Filter)}>
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
            {filteredUsers.map((user) => (
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
                <td className={classes.td}>
                  {user.last_request ? new Date(user.last_request).toLocaleString() : ''}
                </td>
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

      {selectedUser && <EditUserDialog user={selectedUser} onClose={() => setSelectedUser(null)} />}
    </div>
  );
}
