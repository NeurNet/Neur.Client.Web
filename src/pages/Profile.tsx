import { Navigate } from 'react-router';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/Button';
import { FullScreenLoader } from '@/components/FullScreenLoader';

export function Profile() {
  const { user, loading, logout } = useAuth();

  if (loading) return <FullScreenLoader />;
  if (!user) return <Navigate to="/login" replace />;

  return (
    <div>
      <p>
        Выполнен вход как {user.username} ({user.role})
      </p>

      <Button onClick={logout}>Выйти</Button>
    </div>
  );
}
