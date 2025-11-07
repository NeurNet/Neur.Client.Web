import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import classes from './Login.module.scss';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    login(username, password)
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
          onChange={(e) => setUsername(e.target.value)}
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
