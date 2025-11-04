import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { authenticate } from '@/utils/auth';
import classes from './Login.module.scss';

function Login() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    authenticate(login, password).then(console.log).catch(console.error);
  };

  return (
    <div className={classes.wrapper}>
      <h1>Войти в аккаунт</h1>
      <form onSubmit={onSubmit} className={classes.form}>
        <input type="text" placeholder="Логин" onChange={(e) => setLogin(e.target.value)} />
        <input type="password" placeholder="Пароль" onChange={(e) => setPassword(e.target.value)} />
        <input type="submit" value="Войти" />
      </form>
      <Link to="/">Вернуться назад</Link>
    </div>
  );
}

export default Login;
