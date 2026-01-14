import { useParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useChatMessages } from '@/hooks/useChatMessages';
import MessageList from '@/components/MessageList';
import ChatInput from '@/components/ChatInput';
import classes from './Chat.module.scss';

function Chat() {
  const { chatId } = useParams();
  const { refreshAuth } = useAuth();

  const { chat, messages, isGenerating, sendMessage } = useChatMessages(chatId);

  const sendHandler = async (prompt: string) => {
    await sendMessage(prompt);
    await refreshAuth();
  };

  if (!chat) {
    return <span>Загрузка...</span>;
  }

  return (
    <div className={classes.wrapper}>
      <MessageList messages={messages} isGenerating={isGenerating} />
      <ChatInput
        onSend={sendHandler}
        disabled={isGenerating}
        placeholder={`Написать ${chat.model}...`}
      />
    </div>
  );
}

export default Chat;
