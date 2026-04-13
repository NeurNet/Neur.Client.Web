import { ChevronUp } from 'lucide-react';
import { Button } from '../button';
import classes from './chat-input.module.css';
import { useState } from 'react';

interface ChatInputProps {
  onSend: (value: string) => void;
}

export function ChatInput({ onSend }: ChatInputProps) {
  const [text, setText] = useState('');

  return (
    <div className={classes.wrapper}>
      <input
        className={classes.chatInput}
        value={text}
        onChange={(e) => setText(e.target.value)}
        type="text"
        placeholder="Спросите NeurNet"
      />

      {text !== '' && (
        <Button className={classes.send} onClick={() => onSend(text)} size="icon">
          <ChevronUp />
        </Button>
      )}
    </div>
  );
}
