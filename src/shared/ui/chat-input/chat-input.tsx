import classes from './chat-input.module.css';
import { useState } from 'react';
import { ChevronUp, Square } from 'lucide-react';
import { Button } from '../button';

interface ChatInputProps {
  isGenerating?: boolean;
  disabled?: boolean;
  defaultValue?: string;
  onSend?: (value: string) => void;
  onStop?: () => void;
}

export function ChatInput({
  isGenerating,
  disabled,
  defaultValue = '',
  onSend,
  onStop,
}: ChatInputProps) {
  const [text, setText] = useState(defaultValue);

  const buttonShown = text !== '' || isGenerating;

  const onSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    if (isGenerating && onStop) {
      onStop();
    } else if (onSend) {
      onSend(text);
    }

    setText('');
  };

  return (
    <form className={classes.wrapper} onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Спросите NeurNet"
        className={classes.chatInput}
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={isGenerating}
      />

      <Button
        className={classes.send}
        style={{ display: buttonShown ? 'flex' : 'none' }}
        type="submit"
        size="icon"
        disabled={disabled}
      >
        {isGenerating ? <Square /> : <ChevronUp />}
      </Button>
    </form>
  );
}
