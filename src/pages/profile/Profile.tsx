import { Navigate } from 'react-router';
import { useAuth } from '@/providers/auth';
import { Button } from '@/components/ui/button';
import { FullScreenLoader } from '@/components/ui/full-screen-loader';

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
