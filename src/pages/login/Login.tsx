import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { requestLogin } from '@/api/user';
import classes from './Login.module.css';

export function Login() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const {
    mutate: login,
    isPending,
    error,
  } = useMutation({
    mutationFn: requestLogin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      navigate('/');
    },
  });

  const submitHandler = (e: React.SubmitEvent) => {
    e.preventDefault();
    login({ username, password });
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.login}>
        <span>NeurNet</span>
        <h1 className={classes.heading}>Вход в аккаунт</h1>
        <form className={classes.form} onSubmit={submitHandler}>
          <Input
            type="text"
            placeholder="Имя пользователя"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Пароль"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" isLoading={isPending}>Войти</Button>
        </form>
        {error && <span className={classes.error}>{error.message}</span>}
      </div>
    </div>
  );
}
