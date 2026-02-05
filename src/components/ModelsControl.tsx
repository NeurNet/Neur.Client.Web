import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getModels } from '@/api/models';
import { CreateModelForm } from './CreateModelForm';
import { FullScreenLoader } from './FullScreenLoader';
import { Button } from './Button';

export function ModelsControl() {
  const { data, isPending, error } = useQuery({
    queryKey: ['models'],
    queryFn: getModels,
  });

  const [formOpened, setFormOpened] = useState<boolean>(false);

  const switchFormOpened = () => setFormOpened(!formOpened);
  const formatDate = (date: string) => new Date(date).toLocaleString();

  if (isPending) return <FullScreenLoader />;
  if (error) return <span>Ошибка: {error.message}</span>;

  return (
    <div>
      <Button variant="ghost" onClick={switchFormOpened}>
        Добавить модель {formOpened ? <ChevronUp /> : <ChevronDown />}
      </Button>

      {formOpened && <CreateModelForm />}

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
          {data.map((model) => (
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
    </div>
  );
}
