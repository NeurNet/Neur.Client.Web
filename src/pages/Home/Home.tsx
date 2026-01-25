import { useEffect, useState } from 'react';
import { getModels, type Model } from '@/api/models';
import { ModelCard } from '@/components/ModelCard';
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

  return (
    <div className={classes.models}>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        models.map((model) => (
          <ModelCard model={model} />
        ))
      )}
    </div>
  );
}
