import { Navigate, Outlet } from 'react-router';
import { useCurrentUser } from '@/hooks/useCurrentUser';

export function AuthorizedLayout() {
  const { currentUser, isLoading } = useCurrentUser();

  if (isLoading) return <span>Loading...</span>;
  if (!currentUser) return <Navigate to="/login" replace />;

  return <Outlet />;
}
