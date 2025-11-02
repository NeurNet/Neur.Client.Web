import { useState, type FormEvent } from 'react';
import classes from './Chat.module.scss';

function Chat() {
  const [prompt, setPrompt] = useState('');

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={onSubmit} className={classes.form}>
        <input type="text" placeholder="Prompt" onChange={(e) => setPrompt(e.target.value)} />
        <input type="submit" value="Generate" />
      </form>
    </div>
  );
}

export default Chat;
