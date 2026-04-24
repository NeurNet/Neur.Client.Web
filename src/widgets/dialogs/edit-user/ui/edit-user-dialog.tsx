import { AdminApi } from '@/features/admin';
import classes from './edit-user-dialog.module.css';
import type { User } from '@/entities/user';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { RoleCard } from './role-card';
import toast from 'react-hot-toast';

interface ManageUserDialogProps {
  user: User;
  onClose?: () => void;
}

export function EditUserDialog({ user, onClose }: ManageUserDialogProps) {
  const [tab, setTab] = useState<'tokens' | 'role'>('tokens');

  const [tokens, setTokens] = useState(10);
  const [role, setRole] = useState(user.role);

  const queryClient = useQueryClient();

  const tokensMutation = useMutation({
    mutationFn: () => AdminApi.transferTokens(user.user_id, tokens),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success(`Вы выдали ${tokens} токенов пользователю ${user.surname} ${user.name}.`);
      if (onClose) onClose();
    },
    onError: (err) => toast.error(`Произошла ошибка: ${err.message}`),
  });

  const roleMutation = useMutation({
    mutationFn: () => AdminApi.updateRole(user.user_id, role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success(`Вы выдали роль ${role} пользователю ${user.surname} ${user.name}.`);
      if (onClose) onClose();
    },
    onError: (err) => toast.error(`Произошла ошибка: ${err.message}`),
  });

  return (
    <div className={classes.wrapper}>
      <div className={classes.dialog}>
        <h1 className={classes.title}>Управление пользователем</h1>

        <nav className={classes.buttons}>
          <Button
            variant="secondary"
            size="sm"
            className={classes.button}
            selected={tab === 'tokens'}
            onClick={() => setTab('tokens')}
          >
            Токены
          </Button>

          <Button
            variant="secondary"
            size="sm"
            className={classes.button}
            selected={tab === 'role'}
            onClick={() => setTab('role')}
          >
            Роль
          </Button>
        </nav>

        <div className={classes.profile}>
          <div className={classes.avatar}>
            {user.surname[0]}
            {user.name[0]}
          </div>

          <div className={classes.userInfo}>
            <span className={classes.name}>
              {user.surname} {user.name}
            </span>

            <span className={classes.tokens}>
              {user.user_name} | {user.tokens} токенов
            </span>
          </div>
        </div>

        {tab === 'tokens' ? (
          <>
            <div>
              <span className={classes.label}>Быстрый выбор</span>

              <div className={classes.buttons}>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setTokens(5)}
                  className={classes.button}
                >
                  +5
                </Button>

                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setTokens(10)}
                  className={classes.button}
                >
                  +10
                </Button>

                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setTokens(25)}
                  className={classes.button}
                >
                  +25
                </Button>

                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setTokens(50)}
                  className={classes.button}
                >
                  +50
                </Button>
              </div>
            </div>

            <div>
              <span className={classes.label}>Или введите вручную</span>

              <Input
                type="number"
                min={1}
                value={tokens}
                onChange={(e) => setTokens(Number(e.target.value))}
                className={classes.tokensInput}
              />
            </div>

            <div className={classes.total}>
              <span>
                <b>После выдачи:</b> {user.tokens + tokens} токенов
              </span>
            </div>
          </>
        ) : (
          <div className={classes.roleList}>
            <RoleCard
              title="Студент"
              description="Доступ к чату, расход токенов"
              selected={role === 'student'}
              onClick={() => setRole('student')}
            />
            <RoleCard
              title="Преподаватель"
              description="Управление токенами студентов"
              selected={role === 'teacher'}
              onClick={() => setRole('teacher')}
            />
            <RoleCard
              title="Администратор"
              description="Полный доступ, просмотр истории, управление моделями"
              selected={role === 'admin'}
              onClick={() => setRole('admin')}
            />
          </div>
        )}

        <div className={classes.buttons}>
          <Button variant="secondary" className={classes.button} onClick={onClose}>
            Отмена
          </Button>

          <Button
            className={classes.button}
            onClick={() => (tab === 'tokens' ? tokensMutation.mutate() : roleMutation.mutate())}
          >
            Сохранить
          </Button>
        </div>
      </div>
    </div>
  );
}
