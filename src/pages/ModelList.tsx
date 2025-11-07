import { useEffect, useState } from 'react';
import { fetchModels, type Model } from '@/utils/models';
import Header from '@/components/Header';
import ModelCard from '@/components/ModelCard';
import classes from './ModelList.module.scss';

function ModelList() {
  const [models, setModels] = useState<Model[]>([]);
  const [modelsLoading, setModelsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setModelsLoading(true);
    fetchModels()
      .then((models) => setModels(models))
      .catch((err: Error) => setError(err.message))
      .finally(() => setModelsLoading(false));
  }, []);

  return (
    <div>
      <Header />
      <div className={classes.models}>
        {modelsLoading ? (
          <span>Загрузка...</span>
        ) : (
          error ?? models.map((model) => <ModelCard model={model} key={model.id} />)
        )}
      </div>
    </div>
  );
}

export default ModelList;
