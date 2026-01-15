import Button from '@/components/Button/Button';
import { useAuth } from '@/contexts/AuthContext/AuthContext';

export default function Profile() {
  const { user, logout } = useAuth();

  if (!user) {
    return <div>Пользователь не авторизован</div>;
  }

  return (
    <div>
      <p>Имя пользователя: {user?.username}</p>
      <p>Роль: {user?.role}</p>

      <Button onClick={logout}>Выйти</Button>
    </div>
  );
}
