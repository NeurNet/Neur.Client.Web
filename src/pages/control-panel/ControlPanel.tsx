import classes from './ControlPanel.module.css';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { Button } from '@/components/ui/button';
import { Loader } from '@/components/loader';
import { UserList } from './UserList';
import { RequestList } from './RequestList';
import { ModelList } from './ModelList';
import { ModelForm } from './ModelForm';

export function ControlPanel() {
  const { currentUser, isLoading } = useCurrentUser();

  const [modelFormExpanded, setModelFormExpanded] = useState(false);

  if (isLoading) return <Loader />;
  if (!currentUser) return null;

  return (
    <>
      <h1>Панель управления</h1>

      {currentUser.role === 'admin' && (
        <section>
          <h2>Модели</h2>

          <ModelList />

          <Button
            className={classes.addModel}
            onClick={() => setModelFormExpanded(!modelFormExpanded)}
          >
            {modelFormExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />} Добавить
            модель
          </Button>

          {modelFormExpanded && <ModelForm />}
        </section>
      )}

      <section>
        <h2>Пользователи</h2>
        <UserList />
      </section>

      <section>
        <h2>История запросов</h2>
        <RequestList />
      </section>
    </>
  );
}
