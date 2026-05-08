import type { Message } from '@/entities/chat';
import classes from './message-item.module.css';
import clsx from 'clsx';

interface MessageItemProps {
  message: Message;
}

export function MessageItem({ message }: MessageItemProps) {
  return (
    <div className={clsx(classes.message, message.role === 'user' && classes.userMessage)}>
      {message.content}
    </div>
  );
}
