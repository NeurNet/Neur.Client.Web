import classes from './ControlPanel.module.css';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { ModelForm } from '@/components/control-panel/model-form';
import { ModelList } from '@/components/control-panel/model-list';
import { UserList } from '@/components/control-panel/user-list';
import { RequestList } from '@/components/control-panel/request-list';
import { Button } from '@/components/ui/button';
import { Loader } from '@/components/loader';

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
            variant="ghost"
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
