import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import classes from './Login.module.scss';
import toast from 'react-hot-toast';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    login(username, password)
      .then(() => navigate('/'))
      .catch((err: Error) => toast.error(err.message))
      .finally(() => setIsLoading(false));
  };

  return (
    <div className={classes.wrapper}>
      <p>{import.meta.env.VITE_NAME}</p>
      <h1>Вход в аккаунт</h1>
      <form onSubmit={onSubmit} className={classes.form}>
        <input
          type="text"
          placeholder="Логин"
          className="input"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          className="input"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="button" disabled={isLoading}>
          Вход
        </button>
      </form>
      <Link to="/" className="link">
        Вернуться назад
      </Link>
    </div>
  );
}

export default Login;
