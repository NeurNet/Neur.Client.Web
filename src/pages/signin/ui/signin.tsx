import classes from './signin.module.css';
import loginArt from './login_art.png';
import logo from './logo.png';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';

export function Signin() {
  return (
    <div className={classes.wrapper}>
      <div className={classes.content}>
        <div>
          <div className={classes.logo}>
            <img src={logo} alt="NeurNet logo" />

            <div>
              <h1 className={classes.title}>NeurNet</h1>
              <span className={classes.description}>
                Платформа для работы
                <br />с нейросетями
              </span>
            </div>
          </div>

          <form className={classes.form}>
            <Input type="text" placeholder="Логин" autoComplete="username" autoFocus required />
            <Input type="password" placeholder="Пароль" autoComplete="new-password" required />
            <Button type="submit">Войти</Button>
          </form>
        </div>

        <span className={classes.copyright}>
          &copy; 2025 АНПОО &quot;Колледж Цифровых Технологий&quot;
        </span>
      </div>

      <img src={loginArt} className={classes.loginArt} alt="Login art" />
    </div>
  );
}
