import { Tag } from '@/shared/ui/tag';
import classes from './requests-page.module.css';
import { useRequests } from '@/entities/request';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/shared/ui/button';

export function RequestsPage() {
  const [page, setPage] = useState(1);

  const { data: requests, isPending, error } = useRequests(page);

  if (isPending) return null;
  if (error) return <span>{error.message}</span>;

  return (
    <div className={classes.content}>
      <title>История запросов - NeurNet</title>

      <div className={classes.block}>
        <h2 className={classes.title}>История запросов</h2>
      </div>

      <table>
        <thead>
          <tr>
            <th>Дата и время</th>
            <th>Имя пользователя</th>
            <th>Модель</th>
            <th>Ответ</th>
            <th>Статус</th>
          </tr>
        </thead>

        <tbody>
          {requests.items.map((request) => (
            <tr key={request.id}>
              <td>{new Date(request.created_at).toLocaleString()}</td>
              <td>
                {request.user.surname} {request.user.name}
                <br />
                {request.user.username}
              </td>
              <td>
                {request.model_name}
                <br />
                {request.model_ollama}
              </td>
              <td>{request.message?.content}</td>
              <td>
                <div className={classes.status}>
                  {request.status === 'success' ? (
                    <Tag variant="success">Успешно</Tag>
                  ) : (
                    <Tag variant="error">Ошибка</Tag>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={classes.block}>
        <span>
          Показано {requests.items.length} из {requests.total}
        </span>

        <div className={classes.pagination}>
          <Button variant="outline" size="icon" onClick={() => setPage(page - 1)}>
            <ChevronLeft />
          </Button>

          <span>{page}</span>

          <Button variant="outline" size="icon" onClick={() => setPage(page + 1)}>
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
