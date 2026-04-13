import classes from './signin.module.css';
import loginArt from './login_art.png';
import logo from './logo.png';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SessionApi, type Credentials } from '@/features/session';
import { useNavigate } from 'react-router';

type Inputs = {
  username: string;
  password: string;
};

export function Signin() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Inputs>();

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const signin = useMutation({
    mutationFn: (credentials: Credentials) => SessionApi.signin(credentials),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['session'] });
      navigate('/', { replace: true });
    },
    onError: (err) => setError('root', { message: err.message }),
  });

  const error = errors.username?.message || errors.password?.message || errors.root?.message;

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

          <form className={classes.form} onSubmit={handleSubmit((data) => signin.mutate(data))}>
            <Input
              disabled={signin.isPending}
              type="text"
              placeholder="Логин"
              autoComplete="username"
              autoFocus
              {...register('username', { required: 'Введите логин' })}
            />

            <Input
              disabled={signin.isPending}
              type="password"
              placeholder="Пароль"
              autoComplete="new-password"
              {...register('password', { required: 'Введите пароль' })}
            />

            <Button disabled={signin.isPending} type="submit">
              Войти
            </Button>

            {error && <span className={classes.error}>{error}</span>}
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
