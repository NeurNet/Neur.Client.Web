import classes from './login-page.module.css';
import art from '../assets/art.png';
import logo from '@/shared/assets/logo.png';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';

export function LoginPage() {
  return (
    <div className={classes.wrapper}>
      <title>Вход в аккаунт - NeurNet</title>

      <div className={classes.content}>
        <div>
          <div className={classes.logo}>
            <img src={logo} alt="NeurNet Logo" />

            <div>
              <h1>NeurNet</h1>
              <span className={classes.description}>
                Платформа для работы
                <br />с нейросетями
              </span>
            </div>
          </div>

          <form className={classes.form}>
            <Input type="text" placeholder="Логин" autoComplete="username" />
            <Input type="password" placeholder="Пароль" autoComplete="current-password" />
            <Button type="submit">Войти</Button>
          </form>

          <span className={classes.copyright}>
            &copy; 2025 АНПОО &quot;Колледж Цифровых Технологий&quot;
          </span>
        </div>
      </div>

      <img src={art} alt="Login Art" />
    </div>
  );
}
