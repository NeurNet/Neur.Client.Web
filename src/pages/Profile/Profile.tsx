import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { getUsers, type User } from '@/api/users';
import { getModels, type Model } from '@/api/models';
import { useAuth } from '@/contexts/AuthContext';
import { ModelForm } from '@/components/ModelForm';
import { Button } from '@/components/Button';
import { ModelsTable } from '@/components/ModelsTable';
import { UsersTable } from '@/components/UsersTable';
import classes from './Profile.module.css';

export function Profile() {
  const { user, logout } = useAuth();

  const [models, setModels] = useState<Model[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [modelFormOpened, setModelFormOpened] = useState<boolean>(false);

  const switchModelFormOpened = () => setModelFormOpened(!modelFormOpened);

  useEffect(() => {
    Promise.all([getModels(), getUsers()])
      .then(([models, users]) => {
        setModels(models);
        setUsers(users);
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <span>Loading...</span>;
  }

  if (error) {
    return <span>Error: {error}</span>;
  }

  if (!user) {
    return <div>Пользователь не авторизован</div>;
  }

  return (
    <div className={classes.container}>
      <p>
        Выполнен вход как {user.username} ({user.role})
      </p>
      <Button onClick={logout}>Выйти</Button>

      {user.role === 'admin' && (
        <div className={classes.admin}>
          <div>
            <h2>Пользователи</h2>
            <UsersTable users={users} />
          </div>

          <div>
            <div className={classes.modelsHeading}>
              <h2>Модели</h2>
              <button className={classes.addButton} onClick={switchModelFormOpened}>
                <Plus />
              </button>
            </div>

            {modelFormOpened && <ModelForm />}

            <ModelsTable models={models} />
          </div>
        </div>
      )}
    </div>
  );
}
