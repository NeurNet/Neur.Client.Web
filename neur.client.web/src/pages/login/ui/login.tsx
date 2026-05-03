import classes from './login.module.css';
import art from '../assets/art.png';
import logo from '@/shared/assets/logo.png';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useLogin, type Credentials } from '@/features/auth';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';

export function Login() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Credentials>();

  const loginMutation = useLogin();

  const onSubmit: SubmitHandler<Credentials> = (data) => {
    loginMutation.mutate(data, {
      onError: (err) => setError('root', { message: err.message }),
    });
  };

  return (
    <div className={classes.wrapper}>
      <title>Вход в аккаунт - NeurNet</title>

      <div className={classes.content}>
        <div>
          <div className={classes.logo}>
            <img src={logo} alt="NeurNet logo" />

            <div>
              <span className={classes.title}>NeurNet</span>
              <span className={classes.description}>
                Платформа для работы
                <br />с нейросетями
              </span>
            </div>
          </div>

          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <Input
              type="text"
              placeholder="Логин"
              autoComplete="username"
              failed={!!errors.username}
              {...register('username', { required: true })}
            />

            <Input
              type="password"
              placeholder="Пароль"
              autoComplete="current-password"
              failed={!!errors.password}
              {...register('password', { required: true })}
            />

            <Button type="submit">Войти</Button>

            {errors.root && <span className={classes.error}>{errors.root.message}</span>}
          </form>

          <span className={classes.copyright}>
            &copy; 2025 АНПОО &quot;Колледж Цифровых Технологий&quot;
          </span>
        </div>
      </div>

      <img src={art} className={classes.art} alt="Login art" />
    </div>
  );
}
