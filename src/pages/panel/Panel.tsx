import { useState } from 'react';
import { ModelForm } from '@/components/control-panel/model-form';
import { ModelsList } from '@/components/control-panel/models-list';
import { UsersList } from '@/components/control-panel/users-list';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import classes from './Panel.module.css';

export function Panel() {
  const [modelFormExpanded, setModelFormExpanded] = useState(false);

  return (
    <>
      <h1>Панель управления</h1>

      <section>
        <h2>Модели</h2>

        <Button
          className={classes.addModel}
          variant="ghost"
          onClick={() => setModelFormExpanded(!modelFormExpanded)}
        >
          {modelFormExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />} Добавить модель
        </Button>

        {modelFormExpanded && <ModelForm />}

        <ModelsList />
      </section>

      <section>
        <h2>Пользователи</h2>
        <UsersList />
      </section>
    </>
  );
}
