import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { requestLogout } from '@/api/user';
import { ChevronsLeft, ChevronsRight, Cpu, LogOut, Settings } from 'lucide-react';
import { SidebarButton } from './sidebar-button';
import { ChatList } from './chat-list';
import classes from './Sidebar.module.css';
import clsx from 'clsx';

export function Sidebar() {
  const { currentUser } = useCurrentUser();

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isPending } = useMutation({
    mutationFn: requestLogout,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      await navigate('/login');
    },
  });

  const [collapsed, setCollapsed] = useState(window.innerWidth <= 800);

  if (!currentUser) return <span>Loading...</span>;

  return (
    <nav className={clsx(classes.sidebar, collapsed && classes.collapsed)}>
      <Link to="/">
        <SidebarButton icon={<Cpu size={20} />} hideText={collapsed}>
          Модели
        </SidebarButton>
      </Link>

      <hr />

      {!collapsed && <ChatList />}

      <div className={classes.bottom}>
        {(currentUser.role === 'admin' || currentUser.role === 'teacher') && (
          <Link to="/panel">
            <SidebarButton icon={<Settings size={20} />} hideText={collapsed}>
              Панель управления
            </SidebarButton>
          </Link>
        )}

        <SidebarButton
          variant="danger"
          onClick={() => logout()}
          showLoader={isPending}
          className={classes.exit}
          icon={<LogOut size={20} />}
          hideText={collapsed}
        >
          Выйти
        </SidebarButton>

        <SidebarButton
          icon={collapsed ? <ChevronsRight size={20} /> : <ChevronsLeft size={20} />}
          onClick={() => setCollapsed(!collapsed)}
          hideText={collapsed}
        >
          Свернуть
        </SidebarButton>
      </div>
    </nav>
  );
}
