import type { IMessage } from '@/features/chat';
import classes from './message.module.css';
import clsx from 'clsx';

interface MessageProps {
  message: IMessage;
}

export function Message({ message }: MessageProps) {
  return (
    <div className={clsx(classes.message, message.role === 'user' && classes.userMessage)}>
      {message.content}
    </div>
  );
}
