import { useEffect, useState } from 'react';
import { getModels, type Model } from '@/api/models';
import { ModelCard } from '@/components/ModelCard';
import { FullScreenLoader } from '@/components/FullScreenLoader';
import classes from './Home.module.css';

export function Home() {
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getModels()
      .then((data) => setModels(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <FullScreenLoader />;
  if (error) return <span>Ошибка: {error}</span>;

  return (
    <div className={classes.models}>
      {models.length === 0 ? (
        <span>Нет доступных моделей!</span>
      ) : (
        models.map((model) => <ModelCard key={model.id} model={model} />)
      )}
    </div>
  );
}
