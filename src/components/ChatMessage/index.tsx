import classes from './ChatMessage.module.scss';

export interface MessageState {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

function ChatMessage({ message }: { message: MessageState }) {
  return (
    <div
      className={classes.message}
      style={
        message.role === 'user'
          ? { marginLeft: 'auto', borderBottomRightRadius: 0 }
          : { borderBottomLeftRadius: 0 }
      }
    >
      <b>{message.role}</b>
      <pre className={classes.messageBody}>{message.content}</pre>
    </div>
  );
}

export default ChatMessage;
