import type { IChatMessage } from '@/utils/messages';
import classes from './ChatMessage.module.scss';

function ChatMessage({ chatMessage }: { chatMessage: IChatMessage }) {
  return (
    <div
      className={classes.message}
      style={
        chatMessage.author === 'user'
          ? { marginLeft: 'auto', borderBottomRightRadius: 0 }
          : { borderBottomLeftRadius: 0 }
      }
    >
      {chatMessage.body}
    </div>
  );
}

export default ChatMessage;
