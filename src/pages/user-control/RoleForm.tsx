import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserRole, type Role, type User } from '@/api/user';
import { Select } from '@/components/ui/select';
import classes from './UserControl.module.css';

export function RoleForm({ user }: { user: User }) {
  const [role, setRole] = useState(user.role);

  const queryClient = useQueryClient();

  const {
    mutate: changeRole,
    isPending,
    error,
  } = useMutation({
    mutationFn: (role: Role) => updateUserRole({ user_id: user.user_id, role }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['users', user.user_id] });
      setRole(user.role);
    },
  });

  const changeRoleHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = e.target.value as Role;
    changeRole(newRole);
  };

  return (
    <div className={classes.form}>
      <Select value={role} onChange={changeRoleHandler} disabled={isPending}>
        <option value="student">Студент</option>
        <option value="teacher">Преподаватель</option>
        <option value="admin">Администратор</option>
      </Select>

      {error && <span className={classes.error}>{error.message}</span>}
    </div>
  );
}
