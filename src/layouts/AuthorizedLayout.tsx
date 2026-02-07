import { Navigate, Outlet } from 'react-router';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import type { Role } from '@/api/user';

export function AuthorizedLayout({ minimumRole = 'teacher' }: { minimumRole: Role }) {
  const { currentUser, isLoading } = useCurrentUser();

  const roleToNumber = (role: Role) => {
    switch (role) {
      case 'student':
        return 0;
      case 'teacher':
        return 1;
      case 'admin':
        return 2;
    }
  };

  if (isLoading) return <span>Loading...</span>;
  if (!currentUser || roleToNumber(currentUser.role) < roleToNumber(minimumRole)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
