import { Link, Navigate, Outlet, useNavigate } from 'react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { SidebarButton } from '@/components/ui/SidebarButton';
import { requestLogout, type Role } from '@/api/user';
import { LogOut } from 'lucide-react';
import classes from './AuthorizedLayout.module.css';

export function AuthorizedLayout({ minimumRole = 'teacher' }: { minimumRole: Role }) {
  const { currentUser, isLoading } = useCurrentUser();

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isPending } = useMutation({
    mutationFn: requestLogout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      navigate('/login');
    },
  });

  const APP_NAME = import.meta.env.VITE_APP_NAME;

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

  return (
    <div className={classes.container}>
      <nav className={classes.sidebar}>
        <Link to="/" className={classes.logos}>
          <span>{APP_NAME}</span>
          <span>НейроХаб</span>
        </Link>

        <SidebarButton
          variant="danger"
          onClick={() => logout()}
          showLoader={isPending}
          className={classes.exit}
          icon={<LogOut size={20} />}
        >
          Выйти
        </SidebarButton>
      </nav>

      <main className={classes.main}>
        <Outlet />
      </main>
    </div>
  );
}
