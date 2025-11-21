import type { ChatMessageState } from '@/utils/messages';
import classes from './ChatMessage.module.scss';

function ChatMessage({ chatMessage }: { chatMessage: ChatMessageState }) {
  return (
    <div
      className={classes.message}
      style={
        chatMessage.role === 'User'
          ? { marginLeft: 'auto', borderBottomRightRadius: 0 }
          : { borderBottomLeftRadius: 0 }
      }
    >
      <pre className={classes.messageBody}>{chatMessage.content}</pre>
    </div>
  );
}

export default ChatMessage;
