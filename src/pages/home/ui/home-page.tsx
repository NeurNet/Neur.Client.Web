import classes from './home-page.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ChatInput } from '@/features/chat';
import { ModelDialog } from '@/features/chat';

export function HomePage() {
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);
  const [initialMessage, setInitialMessage] = useState('');

  const handleModelSelect = (modelId: string) => {
    const params = new URLSearchParams({
      initialMessage,
      modelId,
    });

    navigate(`/chat/new?${params.toString()}`);
  };

  return (
    <div className={classes.wrapper}>
      <title>NeurNet</title>

      <span className={classes.welcome}>Привет! Чем могу помочь?</span>
      <ChatInput
        placeholder="Спросите NeurNet"
        onChange={(e) => setInitialMessage(e.target.value)}
        onSend={() => setShowDialog(true)}
      />

      {showDialog && (
        <ModelDialog onClose={() => setShowDialog(false)} onModelSelect={handleModelSelect} />
      )}
    </div>
  );
}
