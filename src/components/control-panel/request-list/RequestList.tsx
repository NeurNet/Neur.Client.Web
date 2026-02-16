import { useQuery } from '@tanstack/react-query';
import { ErrorMessage } from '@/components/error-message';
import { Loader } from '@/components/loader';
import { fetchRequests, type Request } from '@/api/request';

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
          <th>Имя модели</th>
          <th>Статус</th>
        </tr>
      </thead>

      <tbody>
        {data.map((req: Request) => (
          <tr key={req.id}>
            <td>{req.model_name}</td>
            <td>{req.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
