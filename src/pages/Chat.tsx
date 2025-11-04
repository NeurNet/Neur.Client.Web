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
        <input
          type="text"
          placeholder="Опишите то, что вы бы хотели увидеть от нейросети"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <input type="submit" value="Сгенерировать" />
      </form>
    </div>
  );
}

export default Chat;
