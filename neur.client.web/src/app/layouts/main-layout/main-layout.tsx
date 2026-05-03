import { useSession } from '@/features/auth';
import { Navigate, Outlet } from 'react-router';

export function MainLayout() {
  const session = useSession();

  if (session.isPending) return null;
  if (!session.data) return <Navigate to="/login" replace />;

  return (
    <div>
      <Outlet />
    </div>
  );
}
