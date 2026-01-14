import { useEffect, useRef } from 'react';
import ChatMessage, { type MessageState } from '../ChatMessage';
import classes from './MessageList.module.scss';

function MessageList({
  messages,
  isGenerating,
}: {
  messages: MessageState[];
  isGenerating: boolean;
}) {
  const messagesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = messagesRef.current;
    if (!el) {
      return;
    }

    const isAtBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 200;

    if (isAtBottom) {
      el.scrollTo({
        top: el.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  return (
    <div className={classes.messages} ref={messagesRef}>
      {messages.map((message) => (
        <ChatMessage message={message} key={message.id} />
      ))}

      {isGenerating && <span>Думает...</span>}
    </div>
  );
}

export default MessageList;
