import { useQuery } from '@tanstack/react-query';
import { fetchModels } from '@/api/model';
import { ErrorMessage } from '@/components/error-message';
import { Loader } from '@/components/loader';

export function ModelsList() {
  const { data, isPending, error } = useQuery({
    queryKey: ['models'],
    queryFn: fetchModels,
  });

  if (isPending) return <Loader />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <table>
      <thead>
        <tr>
          <th>Название</th>
          <th>Имя модели</th>
          <th>Версия</th>
          <th>Статус</th>
          <th>Дата добавления</th>
        </tr>
      </thead>

      <tbody>
        {data.map((model) => (
          <tr key={model.id}>
            <td>{model.name}</td>
            <td>{model.model}</td>
            <td>{model.version}</td>
            <td>{model.status === 'open' ? 'Публичная' : 'Приватная'}</td>
            <td>{new Date(model.createdAt).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
