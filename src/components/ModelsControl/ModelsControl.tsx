import { useEffect, useState } from 'react';
import { Plus, X } from 'lucide-react';
import { getModels, type Model } from '@/api/models';
import { CreateModelForm } from '../CreateModelForm';
import { FullScreenLoader } from '../FullScreenLoader';
import classes from './ModelsControl.module.css';

export function ModelsControl() {
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [formOpened, setFormOpened] = useState<boolean>(false);

  useEffect(() => {
    getModels()
      .then((data) => setModels(data))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const switchFormOpened = () => setFormOpened(!formOpened);
  const formatDate = (date: string) => new Date(date).toLocaleString();

  if (loading) return <FullScreenLoader />;
  if (error) return <span>Ошибка: {error}</span>;

  return (
    <div>
      <div className={classes.modelsHeading}>
        <h2>Модели</h2>
        <button className="btn-icon" onClick={switchFormOpened}>
          {formOpened ? <X /> : <Plus />}
        </button>
      </div>

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
    </div>
  );
}
