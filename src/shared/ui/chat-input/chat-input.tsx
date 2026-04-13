import { ChevronUp } from 'lucide-react';
import { Button } from '../button';
import classes from './chat-input.module.css';
import { useState } from 'react';

export function ChatInput() {
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
        <Button className={classes.send} size="icon">
          <ChevronUp />
        </Button>
      )}
    </div>
  );
}
