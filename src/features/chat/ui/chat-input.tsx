import classes from './chat-input.module.css';
import { Button } from '@/shared/ui/button';
import { ChevronUp, Square } from 'lucide-react';
import { useState } from 'react';

interface ChatInputProps {
  isGenerating?: boolean;
  onSend?: (value: string) => void;
  onStop?: () => void;
}

export function ChatInput({ isGenerating = false, onSend, onStop }: ChatInputProps) {
  const [text, setText] = useState('');

  return (
    <div className={classes.wrapper}>
      <input
        placeholder="Спросите NeurNet"
        className={classes.input}
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={isGenerating}
      />

      {isGenerating ? (
        <Button size="icon" className={classes.button} onClick={onStop}>
          <Square />
        </Button>
      ) : text.trim() !== '' ? (
        <Button size="icon" className={classes.button} onClick={() => onSend?.(text)}>
          <ChevronUp />
        </Button>
      ) : null}
    </div>
  );
}
