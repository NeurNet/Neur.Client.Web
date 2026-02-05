import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '@/providers/auth';
import { Button } from '@/components/ui/button';
import classes from './Login.module.css';

export function Login() {
  const { login } = useAuth();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setLoading(true);
    login(username, password)
      .then(() => navigate('/'))
      .catch((error: Error) => alert(error.message))
      .finally(() => setLoading(false));
  };

  return (
    <div className={classes.wrapper}>
      <span>НейроХаб</span>
      <h1 className={classes.title}>Вход в систему</h1>

      <form onSubmit={handleSubmit} className="form">
        <div className="input-container">
          <label htmlFor="username">
            Имя пользователя
          </label>
          <input
            type="text"
            id="username"
            placeholder="i00s0000"
            autoComplete="username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="input-container">
          <label htmlFor="password">
            Пароль
          </label>
          <input
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <Button type="submit" loading={loading}>
          Войти
        </Button>
      </form>
    </div>
  );
}
