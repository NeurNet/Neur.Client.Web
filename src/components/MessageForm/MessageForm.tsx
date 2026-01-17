import { useState } from 'react';
import { sendMessage } from '@/api/messages';
import Input from '@/components/Input/Input';
import Button from '@/components/Button/Button';
import classes from './MessageForm.module.css';

export default function MessageForm({ chatId }: { chatId: string }) {
  const [prompt, setPrompt] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    sendMessage(prompt, chatId)
      .then()
      .catch((err) => setError(err.message))
      .finally(() => {
        setPrompt('');
        setLoading(false);
      });
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <Input
        placeholder="Напишите что-нибудь"
        style={{ flex: 1 }}
        onChange={(e) => setPrompt(e.target.value)}
        disabled={loading}
        required
      />
      <Button type="submit" loading={loading}>Отправить</Button>
    </form>
  );
}
