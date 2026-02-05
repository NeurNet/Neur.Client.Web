import { useState } from 'react';
import { sendMessage } from '@/api/messages';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form } from '@/components/ui/form';
import classes from './MessageForm.module.css';

export function MessageForm({ chatId }: { chatId: string }) {
  const [prompt, setPrompt] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    setLoading(true);

    sendMessage(prompt, chatId)
      .then(async (data) => {
        const decoder = new TextDecoder();

        while (true) {
          const { done, value } = await data.read();
          if (done) {
            break;
          }

          const chunk = decoder.decode(value, { stream: true });
          console.log('Received chunk:', chunk); 
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => {
        setPrompt('');
        setLoading(false);
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className={classes.inputContainer}>
        {error && <span className={classes.error}>{error}</span>}
        <Input
          placeholder="Напишите что-нибудь"
          style={{ flex: 1 }}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={loading}
          required
        />
      </div>
      <Button type="submit" loading={loading}>
        Отправить
      </Button>
    </Form>
  );
}
