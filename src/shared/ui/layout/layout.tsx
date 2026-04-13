import { useSession } from '@/features/session';
import { Navigate, Outlet } from 'react-router';

export function Layout() {
  const session = useSession();

  if (session.isPending) return null;
  if (!session.data) return <Navigate to="/signin" replace />;

  return <Outlet />;
}
