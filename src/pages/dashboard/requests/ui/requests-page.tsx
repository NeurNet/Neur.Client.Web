import classes from './requests-page.module.css';
import { useRequests } from '@/entities/request';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/shared/ui/button';
import { Tag } from '@/shared/ui/tag';

export function RequestsPage() {
  const [page, setPage] = useState(1);

  const { data: requests, isPending, error } = useRequests(page);

  const formatMessageContent = (content?: string) => {
    if (!content) return '-';

    return content.length > 50 ? content.substring(0, 50) + '...' : content;
  };

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
              <td>
                <span className={classes.primary}>
                  {new Date(request.created_at).toLocaleDateString()}
                </span>
                <br />
                <span className={classes.secondary}>
                  {new Date(request.created_at).toLocaleTimeString()}
                </span>
              </td>
              <td>
                <span className={classes.primary}>
                  {request.user.surname} {request.user.name}
                </span>
                <br />
                <span className={classes.secondary}>{request.user.username}</span>
              </td>
              <td>
                <span className={classes.primary}>{request.model_name}</span>
                <br />
                <span className={classes.secondary}>{request.model_ollama}</span>
              </td>
              <td title={request.message?.content}>
                {formatMessageContent(request.message?.content)}
              </td>
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
            disabled={page * 20 >= requests.total}
            onClick={() => setPage(page + 1)}
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
