import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '@/providers/auth';
import { Button } from '@/components/ui/button';
import { Input, InputGroup } from '@/components/ui/input';
import { Form } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
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

      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Label htmlFor="username">
            Имя пользователя
          </Label>
          <Input
            type="text"
            id="username"
            placeholder="i00s0000"
            autoComplete="username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </InputGroup>

        <InputGroup>
          <Label htmlFor="password">
            Пароль
          </Label>
          <Input
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </InputGroup>

        <Button type="submit" loading={loading}>
          Войти
        </Button>
      </Form>
    </div>
  );
}
