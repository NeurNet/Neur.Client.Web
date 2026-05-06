import classes from './home-page.module.css';
import { useState } from 'react';
import { ChatInput } from '@/features/chat';
import { ModelDialog } from '@/features/chat';

export function HomePage() {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <div className={classes.wrapper}>
      <title>Новый чат - NeurNet</title>

      <span className={classes.welcome}>Привет! Чем могу помочь?</span>

      <ChatInput placeholder="Спросите NeurNet" onSend={() => setShowDialog(true)} />

      <ModelDialog open={showDialog} onClose={() => setShowDialog(false)} />
    </div>
  );
}
