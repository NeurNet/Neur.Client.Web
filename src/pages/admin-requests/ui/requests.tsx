import classes from './requests.module.css';
import { Select } from '@/shared/ui/select';
import { Input } from '@/shared/ui/input';
import { useQuery } from '@tanstack/react-query';
import { RequestApi } from '@/entities/request';

export function Requests() {
  const requests = useQuery({
    queryKey: ['requests'],
    queryFn: RequestApi.fetchRequests,
  });

  if (requests.isPending) return null;
  if (requests.error) return <span>{requests.error.message}</span>;

  return (
    <div>
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
            {requests.data.map((request) => (
              <tr key={request.id} className={classes.tr}>
                <td key={classes.td}>{/* TODO */}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
