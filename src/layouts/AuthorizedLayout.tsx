import { Navigate, Outlet } from 'react-router';
import { useAuth } from '@/providers/auth';

export function AuthorizedLayout() {
  const { user, isLoading } = useAuth();

  if (isLoading) return <span>Loading...</span>;
  if (!user) return <Navigate to="/login" replace />;

  return <Outlet />;
}
