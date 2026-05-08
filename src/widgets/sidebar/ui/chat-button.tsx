import type { Chat } from '@/entities/chat';
import { SidebarButton } from './sidebar-button';
import { timeAgo } from '@/shared/lib';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';

interface ChatButtonProps {
  chat: Chat;
}

export function ChatButton({ chat }: ChatButtonProps) {
  const [ago, setAgo] = useState(timeAgo(chat.created_at));

  useEffect(() => {
    const interval = setInterval(() => setAgo(timeAgo(chat.created_at)), 1000);
    return () => clearInterval(interval);
  }, [chat.created_at]);

  return (
    <Link to={`/chat/${chat.id}`}>
      <SidebarButton label={ago}>{chat.model_name}</SidebarButton>
    </Link>
  );
}
