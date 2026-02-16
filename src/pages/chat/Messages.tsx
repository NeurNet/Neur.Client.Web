import type { Message } from '@/api/message';
import classes from './Chat.module.css';
import clsx from 'clsx';

export function Messages({ messages }: { messages: Message[] }) {
  return (
    <div className={classes.messages}>
      {messages.map((message) => (
        <div
          key={message.id}
          className={clsx(classes.message, message.role === 'user' && classes.userMessage)}
        >
          {message.content}
        </div>
      ))}
    </div>
  );
}
