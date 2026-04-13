import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { requestLogin } from '@/api/user';
import classes from './Login.module.css';
import loginArt from '@/assets/login_art.png';
import logo from '@/assets/logo.png';

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
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      await navigate('/');
    },
  });

  const submitHandler = (e: React.SubmitEvent) => {
    e.preventDefault();
    login({ username, password });
  };

  return (
    <div className={classes.wrapper}>
      <section className={classes.formSection}>
        <div className={classes.formWrapper}>
          <div className={classes.logo}>
            <img src={logo} alt="NeurNet logo" />

            <div className={classes.logoText}>
              <span className={classes.name}>NeurNet</span>
              <span className={classes.description}>
                Платформа для работы
                <br />с нейросетями
              </span>
            </div>
          </div>

          <form className={classes.form} onSubmit={submitHandler}>
            <Input
              type="text"
              placeholder="Имя пользователя"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
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

            <Button type="submit" disabled={isPending}>
              Войти
            </Button>

            {error && <span className={classes.error}>{error.message}</span>}
          </form>
        </div>

        <span className={classes.copyright}>
          &copy; 2025 АНПОО &quot;Колледж Цифровых Технологий&quot;
        </span>
      </section>

      <img src={loginArt} className={classes.loginArt} alt="Login art" />
    </div>
  );
}
