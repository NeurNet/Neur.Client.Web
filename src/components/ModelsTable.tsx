import { useEffect, useState } from 'react';
import { getModels, type Model } from '@/api/models';

export default function ModelsTable() {
  const [data, setData] = useState<Model[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getModels()
      .then((data) => setData(data))
      .catch((err: Error) => setError(err.message));
  }, []);

  if (!data) {
    return <span>Loading...</span>;
  }

  if (error) {
    return <span>Error: {error}</span>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th scope="col">Модель</th>
          <th scope="col">Название</th>
          <th scope="col">Тип</th>
          <th scope="col">Версия</th>
          <th scope="col">Статус</th>
          <th scope="col">Дата добавления</th>
          <th scope="col">Дата обновления</th>
        </tr>
      </thead>
      <tbody>
        {data.map((model) => (
          <tr key={model.id}>
            <th scope="row">{model.model}</th>
            <td>{model.name}</td>
            <td>{model.type}</td>
            <td>{model.version}</td>
            <td>{model.status}</td>
            <td>{model.createdAt}</td>
            <td>{model.updatedAt}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
