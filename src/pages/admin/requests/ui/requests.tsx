import classes from './requests.module.css';
import { Select } from '@/shared/ui/select';
import { Input } from '@/shared/ui/input';
import { useQuery } from '@tanstack/react-query';
import { RequestApi } from '@/entities/request';
import { Button } from '@/shared/ui/button';

export function Requests() {
  const requestsQuery = useQuery({
    queryKey: ['requests'],
    queryFn: RequestApi.fetchRequests,
  });

  const truncate = (str: string, maxLength: number = 50): string => {
    if (!str) return '';
    if (str.length <= maxLength) return str;

    return str.slice(0, maxLength) + '...';
  };

  if (requestsQuery.isPending) return null;
  if (requestsQuery.error) return <span>{requestsQuery.error.message}</span>;

  return (
    <>
      <div className={classes.filters}>
        <Input className={classes.search} placeholder="Поиск по пользователю" role="search" />

        <Select>
          <option value="all-statuses">Все статусы</option>
          <option value="succeeded">Успешно</option>
          <option value="failed">Неудачно</option>
        </Select>

        <Select>
          <option value="all-models">Все модели</option>
        </Select>
      </div>

      <div className={classes.content}>
        <div className={classes.header}>
          <h1 className={classes.title}>История запросов</h1>
        </div>

        <table className={classes.table}>
          <thead>
            <tr>
              <th className={classes.th}>Дата и время</th>
              <th className={classes.th}>Имя пользователя</th>
              <th className={classes.th}>Модель</th>
              <th className={classes.th}>Ответ</th>
              <th className={classes.th}>Статус</th>
            </tr>
          </thead>

          <tbody>
            {requestsQuery.data.items.map((request) => (
              <tr key={request.id} className={classes.tr}>
                <td className={classes.td}>{new Date(request.created_at).toLocaleString()}</td>
                <td className={classes.td}>
                  {request.user.surname} {request.user.name}
                </td>
                <td className={classes.td}>{request.model_name}</td>
                <td className={classes.td}>{truncate(request.message.content)}</td>
                <td className={classes.td}>{request.status}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className={classes.footer}>
          <span>
            Показано {requestsQuery.data.items.length} из {requestsQuery.data.total}
          </span>

          <div className={classes.pages}>
            <Button></Button>
          </div>
        </div>
      </div>
    </>
  );
}
