import { useQuery } from '@tanstack/react-query';
import { ErrorMessage } from '@/components/error-message';
import { Loader } from '@/components/loader';
import { fetchRequests, type Request } from '@/api/request';
import { RequestRow } from './RequestRow';

export function RequestList() {
  const { data, isPending, error } = useQuery({
    queryKey: ['requests'],
    queryFn: fetchRequests,
  });

  if (isPending) return <Loader />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <table>
      <thead>
        <tr>
          <th>Время запроса</th>
          <th>Имя пользователя</th>
          <th>Имя модели</th>
          <th>Статус</th>
          <th>Ответ модели</th>
        </tr>
      </thead>

      <tbody>
        {data.map((req: Request) => (
          <RequestRow key={req.id} request={req} />
        ))}
      </tbody>
    </table>
  );
}
