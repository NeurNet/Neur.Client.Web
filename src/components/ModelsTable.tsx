import type { Model } from '@/api/models';

export function ModelsTable({ models }: { models: Model[] }) {
  const formatDate = (date: string): string => {
    return new Date(date).toLocaleString();
  };

  return (
    <table>
      <thead>
        <tr>
          <th scope="col">Название</th>
          <th scope="col">Модель</th>
          <th scope="col">Версия</th>
          <th scope="col">Статус</th>
          <th scope="col">Дата добавления</th>
          <th scope="col">Дата обновления</th>
        </tr>
      </thead>
      <tbody>
        {models.map((model) => (
          <tr key={model.id}>
            <th scope="row">{model.name}</th>
            <td>{model.model}</td>
            <td>{model.version}</td>
            <td>{model.status}</td>
            <td>{formatDate(model.createdAt)}</td>
            <td>{model.updatedAt ? formatDate(model.updatedAt) : ''}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
