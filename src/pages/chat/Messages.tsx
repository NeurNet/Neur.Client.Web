import { useEffect, useRef } from 'react';
import type { Message } from '@/api/message';
import classes from './Chat.module.css';
import clsx from 'clsx';

export function Messages({ messages }: { messages: Message[] }) {
  const messagesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!messagesRef.current) return;
    messagesRef.current.scrollTo(0, messagesRef.current.scrollHeight);
  }, [messages]);

  return (
    <div className={classes.messages} ref={messagesRef}>
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
