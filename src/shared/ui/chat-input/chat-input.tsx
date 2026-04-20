import classes from './chat-input.module.css';
import { useState } from 'react';
import { ChevronUp, Square } from 'lucide-react';
import { Button } from '../button';

interface ChatInputProps {
  isGenerating?: boolean;
  onSend: (value: string) => void;
  onStop: () => void;
}

export function ChatInput({ isGenerating, onSend, onStop }: ChatInputProps) {
  const [text, setText] = useState('');

  const buttonShown = text === '' || !isGenerating;

  const onSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    if (isGenerating) {
      onStop();
    } else {
      onSend(text);
    }

    setText('');
  };

  return (
    <form className={classes.wrapper} onSubmit={onSubmit}>
      <input
        className={classes.chatInput}
        value={text}
        onChange={(e) => setText(e.target.value)}
        type="text"
        placeholder="Спросите NeurNet"
        disabled={isGenerating}
      />

      <Button
        className={classes.send}
        style={{ display: buttonShown ? 'flex' : 'none' }}
        type="submit"
        size="icon"
      >
        {isGenerating ? <Square /> : <ChevronUp />}
      </Button>
    </form>
  );
}
