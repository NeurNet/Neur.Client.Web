import classes from './profile-dialog.module.css';
import { useState } from 'react';
import { useAuth } from '../model/hooks';
import { Avatar } from '@/shared/ui/avatar';
import { Dialog } from '@/shared/ui/dialog';
import { mapUserRole } from '@/entities/user';
import { useUserRequests } from '@/entities/request';
import { Tag } from '@/shared/ui/tag';
import { Button } from '@/shared/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProfileDialogProps {
  onClose?: () => void;
}

export function ProfileDialog({ onClose }: ProfileDialogProps) {
  const { data: auth } = useAuth();

  const [page, setPage] = useState(1);

  const { data: requests } = useUserRequests(auth?.id, page);

  if (!auth || !requests) return null;

  return (
    <Dialog onClose={onClose}>
      <div className={classes.block}>
        <h2 className={classes.title}>Мой профиль</h2>

        <div className={classes.avatarName}>
          <Avatar>
            {auth.surname[0]}
            {auth.name[0]}
          </Avatar>

          <span className={classes.name}>
            {auth.surname} {auth.name}
          </span>
        </div>

        <span>
          <b>ID:</b> {auth.username}
        </span>
        <span>
          <b>Роль:</b> {mapUserRole(auth.role)}
        </span>
        <span>
          <b>Баланс:</b> {auth.tokens} токенов
        </span>
      </div>

      <div className={classes.block}>
        <h2 className={classes.title}>История запросов</h2>

        <div className={classes.tableWrapper}>
          <table className={classes.table}>
            <thead>
              <tr>
                <th>Дата и время</th>
                <th>Модель</th>
                <th>Стоимость</th>
                <th>Статус</th>
              </tr>
            </thead>

            <tbody>
              {requests.items.map((request) => (
                <tr key={request.id}>
                  <td>
                    <span>{new Date(request.created_at).toLocaleDateString()}</span>
                    <br />
                    <span>{new Date(request.created_at).toLocaleTimeString()}</span>
                  </td>

                  <td>
                    <span>{request.model_name}</span>
                    <br />
                    <span>{request.model_ollama}</span>
                  </td>

                  <td>{request.token_cost} токенов</td>

                  <td>
                    {request.status === 'success' ? (
                      <Tag variant="success">Успешно</Tag>
                    ) : (
                      <Tag variant="error">Ошибка</Tag>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={classes.pagination}>
          <Button
            variant="outline"
            size="icon"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            <ChevronLeft />
          </Button>

          <span>{page}</span>

          <Button
            variant="outline"
            size="icon"
            disabled={page * 5 >= requests.total}
            onClick={() => setPage(page + 1)}
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
