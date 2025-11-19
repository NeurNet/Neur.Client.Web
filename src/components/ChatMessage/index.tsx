import { useEffect, useRef } from 'react';
import type { IChatMessage } from '@/utils/messages';
import classes from './ChatMessage.module.scss';

function ChatMessage({ chatMessage }: { chatMessage: IChatMessage }) {
  const thinkingRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (thinkingRef.current) {
      thinkingRef.current.scrollTo(thinkingRef.current.scrollWidth, 0);
    }
  }, [chatMessage.thinkingText]);

  return (
    <div
      className={classes.message}
      style={
        chatMessage.author === 'user'
          ? { marginLeft: 'auto', borderBottomRightRadius: 0 }
          : { borderBottomLeftRadius: 0 }
      }
    >
      {chatMessage.thinkingText && (
        <div className={classes.thinking} ref={thinkingRef}>
          Думает: {chatMessage.thinkingText}
        </div>
      )}
      <pre className={classes.messageBody}>{chatMessage.body}</pre>
    </div>
  );
}

export default ChatMessage;
