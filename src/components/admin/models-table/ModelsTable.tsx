import { useQuery } from '@tanstack/react-query';
import { fetchModels } from '@/api/model';

export function ModelsTable() {
  const { data, isPending, error } = useQuery({
    queryKey: ['models'],
    queryFn: fetchModels,
  });

  if (isPending) return <span>Loading...</span>;
  if (error) return <span>{error.message}</span>;

  return (
    <table>
      <thead>
        <tr>
          <th>Название</th>
          <th>Модель</th>
          <th>Версия</th>
          <th>Статус</th>
        </tr>
      </thead>

      <tbody>
        {data.map((model) => (
          <tr key={model.id}>
            <td>{model.name}</td>
            <td>{model.model}</td>
            <td>{model.version}</td>
            <td>{model.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
