import type { IChatMessage } from '@/utils/chats';
import classes from './ChatMessage.module.scss';
import { useAuth } from '@/contexts/AuthContext';

function ChatMessage({ chatMessage, modelName }: { chatMessage: IChatMessage; modelName: string }) {
  const { authUser } = useAuth();

  return (
    <div
      className={classes.message}
      style={
        chatMessage.role === 'user'
          ? { marginLeft: 'auto', borderBottomRightRadius: 0 }
          : { borderBottomLeftRadius: 0 }
      }
    >
      <b>{chatMessage.role === 'assistant' ? modelName : authUser?.username}</b>
      <pre className={classes.messageBody}>{chatMessage.content}</pre>
    </div>
  );
}

export default ChatMessage;
