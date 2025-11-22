import { useState, type FormEvent } from 'react';
import classes from './ChatInput.module.scss';

function ChatInput({
  onSend,
  disabled,
  placeholder,
}: {
  onSend: (prompt: string) => Promise<void>;
  disabled: boolean;
  placeholder: string;
}) {
  const [prompt, setPrompt] = useState('');

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) {
      return;
    }

    void onSend(prompt);
    setPrompt('');
  };

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <input
        type="text"
        placeholder={placeholder}
        className="input"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        required
      />
      <button type="submit" disabled={disabled} className="button">
        Сгенерировать
      </button>
    </form>
  );
}

export default ChatInput;
