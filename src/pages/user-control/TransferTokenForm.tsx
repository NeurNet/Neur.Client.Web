import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { transferTokens } from '@/api/user';
import classes from './TransferTokenForm.module.css';

export function TransferTokenForm({ userId }: { userId: string }) {
  const [tokens, setTokens] = useState(10);

  const queryClient = useQueryClient();

  const {
    mutate: addTokens,
    isPending,
    error,
  } = useMutation({
    mutationFn: (token_count: number) => transferTokens({ user_id: userId || '', token_count }),
    onSuccess: async () => await queryClient.invalidateQueries({ queryKey: ['users', userId] }),
  });

  const addTokensHandler = (e: React.SubmitEvent) => {
    e.preventDefault();
    addTokens(tokens);
  };

  return (
    <form className={classes.tokenForm} onSubmit={addTokensHandler}>
      <Input type="number" value={tokens} onChange={(e) => setTokens(Number(e.target.value))} />
      <Button type="submit" showLoader={isPending}>
        Передать
      </Button>
      {error && <span className={classes.error}>{error.message}</span>}
    </form>
  );
}
