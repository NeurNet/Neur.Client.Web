import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '@/providers/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import classes from './Login.module.css';

export function Login() {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = (e: React.SubmitEvent) => {
    e.preventDefault();
    login({ username, password });
    navigate('/');
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
          <Button isLoading={isLoading}>Войти</Button>
        </form>
      </div>
    </div>
  );
}
