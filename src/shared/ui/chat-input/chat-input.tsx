import classes from './chat-input.module.css';
import { useState } from 'react';
import { ChevronUp } from 'lucide-react';
import { Button } from '../button';

interface ChatInputProps {
  onSend: (value: string) => void;
}

export function ChatInput({ onSend }: ChatInputProps) {
  const [text, setText] = useState('');

  const onSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    onSend(text);
  };

  return (
    <form className={classes.wrapper} onSubmit={onSubmit}>
      <input
        className={classes.chatInput}
        value={text}
        onChange={(e) => setText(e.target.value)}
        type="text"
        placeholder="Спросите NeurNet"
        required
      />

      <Button
        type="submit"
        className={classes.send}
        style={{ display: text === '' ? 'none' : 'flex' }}
        size="icon"
      >
        <ChevronUp />
      </Button>
    </form>
  );
}
