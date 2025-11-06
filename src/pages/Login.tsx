import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { authenticate } from '@/utils/auth';
import classes from './Login.module.scss';

function Login() {
  const navigate = useNavigate();
  const { refreshAuth } = useAuth();

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    authenticate(login, password)
      .then(() => refreshAuth())
      .then(() => navigate('/'))
      .catch((err: Error) => setError(err.message))
      .finally(() => setIsLoading(false));
  };

  return (
    <div className={classes.wrapper}>
      <p>Нейросети колледжа</p>
      <h1>Вход в аккаунт</h1>
      <form onSubmit={onSubmit} className={classes.form}>
        <input
          type="text"
          placeholder="Логин"
          onChange={(e) => setLogin(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p>Неверный логин или пароль!</p>}
        <button type="submit" disabled={isLoading}>
          Вход
        </button>
      </form>
      <Link to="/">Вернуться назад</Link>
    </div>
  );
}

export default Login;
