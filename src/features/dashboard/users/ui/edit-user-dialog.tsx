import classes from './edit-user-dialog.module.css';
import { UserApi, type User, type UserRole } from '@/entities/user';
import { Button } from '@/shared/ui/button';
import { Dialog } from '@/shared/ui/dialog';
import { Input } from '@/shared/ui/input';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { RoleItem } from './role-item';

interface EditUserDialogProps {
  user: User | null;
  onClose: () => void;
}

type Tab = 'tokens' | 'role';

interface RoleItem {
  name: string;
  description: string;
  role: UserRole;
}

const roleItems: RoleItem[] = [
  { name: 'Студент', description: 'Доступ к чату, расход токенов', role: 'student' },
  { name: 'Преподаватель', description: 'Управление токенами студентов', role: 'teacher' },
  {
    name: 'Администратор',
    description: 'Полный доступ, просмотр истории, управление моделями',
    role: 'admin',
  },
];

const quickTokenOptions = [5, 10, 25, 50];

export function EditUserDialog({ user, onClose }: EditUserDialogProps) {
  const [tab, setTab] = useState<Tab>('tokens');

  const [tokens, setTokens] = useState(10);
  const [role, setRole] = useState<UserRole>(user?.role || 'student');

  const queryClient = useQueryClient();

  const { mutate: transferTokens } = useMutation({
    mutationFn: UserApi.transferTokens,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });

      if (user) {
        toast.success(`Вы выдали ${tokens} токенов пользователю ${user.surname} ${user.name}!`);
      }

      onClose();
    },
    onError: (error) => toast.error(error.message),
  });

  const { mutate: updateRole } = useMutation({
    mutationFn: UserApi.updateRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });

      if (user) {
        toast.success(`Вы изменили роль пользователя ${user.surname} ${user.name}!`);
      }

      onClose();
    },
    onError: (error) => toast.error(error.message),
  });

  const onSave = () => {
    if (!user) return;

    if (tab === 'tokens') {
      transferTokens({ user_id: user.user_id, token_count: tokens });
    } else {
      updateRole({ user_id: user.user_id, role });
    }
  };

  if (!user) return null;

  return (
    <Dialog open={user !== null} onClose={onClose}>
      <div className={classes.wrapper}>
        <h2 className={classes.title}>Управление пользователем</h2>

        <div className={classes.row}>
          <Button
            variant="outline"
            size="sm"
            active={tab === 'tokens'}
            onClick={() => setTab('tokens')}
          >
            Токены
          </Button>

          <Button
            variant="outline"
            size="sm"
            active={tab === 'role'}
            onClick={() => setTab('role')}
          >
            Роль
          </Button>
        </div>

        <div className={classes.user}>
          <div className={classes.avatar}>
            <span>
              {user.surname[0]}
              {user.name[0]}
            </span>
          </div>

          <div>
            <span className={classes.name}>
              {user.surname} {user.name}
            </span>

            <span className={classes.userInfo}>
              {user.user_name} | {user.tokens} токенов
            </span>
          </div>
        </div>

        {tab === 'tokens' ? (
          <>
            <div>
              <span className={classes.label}>Быстрый набор</span>

              <div className={classes.row}>
                {quickTokenOptions.map((quantity) => (
                  <Button
                    key={quantity}
                    variant="outline"
                    size="sm"
                    active={tokens === quantity}
                    onClick={() => setTokens(quantity)}
                  >
                    +{quantity}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <span className={classes.label}>Или введите вручную</span>

              <Input
                type="number"
                min={1}
                value={tokens}
                onChange={(e) => setTokens(Number(e.target.value))}
              />
            </div>

            <div className={classes.afterTransaction}>
              <span>
                <b>После выдачи:</b> {user.tokens + tokens} токенов
              </span>
            </div>
          </>
        ) : (
          <div className={classes.roleList}>
            {roleItems.map((item) => (
              <RoleItem
                key={item.role}
                name={item.name}
                description={item.description}
                active={role === item.role}
                onClick={() => setRole(item.role)}
              />
            ))}
          </div>
        )}

        <div className={classes.row}>
          <Button variant="outline" onClick={onClose}>
            Отмена
          </Button>
          <Button onClick={onSave}>Сохранить</Button>
        </div>
      </div>
    </Dialog>
  );
}
