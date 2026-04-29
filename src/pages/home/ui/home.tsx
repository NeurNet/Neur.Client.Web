import classes from './home.module.css';
import { ChatInput } from '@/shared/ui/chat-input';
import { SelectModelDialog } from '@/widgets/dialogs/select-model';
import { useState } from 'react';

export function Home() {
  const [dialogShown, setDialogShown] = useState(false);
  const [message, setMessage] = useState('');

  const onSend = (message: string) => {
    setMessage(message);
    setDialogShown(true);
  };

  return (
    <div className={classes.wrapper}>
      <h1 className={classes.title}>Привет! Чем могу помочь?</h1>
      <ChatInput onSend={onSend} />

      <SelectModelDialog
        open={dialogShown}
        onClose={() => setDialogShown(false)}
        message={message}
      />
    </div>
  );
}
