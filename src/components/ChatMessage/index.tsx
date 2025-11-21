import type { IChatMessage } from '@/utils/messages';
import classes from './ChatMessage.module.scss';

function ChatMessage({ chatMessage }: { chatMessage: IChatMessage }) {
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
