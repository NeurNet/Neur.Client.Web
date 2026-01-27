import type { Message } from '@/api/messages';
import { ChatMessage } from '../ChatMessage';
import classes from './MessageList.module.css';

export function MessageList({ messages }: { messages: Message[] }) {
  return (
    <div className={classes.messages}>
      {messages.map((message) => (
        <ChatMessage key={message.id} author={message.role}>
          {message.content}
        </ChatMessage>
      ))}
    </div>
  );
}
