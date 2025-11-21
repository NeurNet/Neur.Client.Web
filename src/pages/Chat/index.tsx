import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import { generateResponse } from '@/utils/chats';
import { getMessages, type IChatMessage } from '@/utils/messages';
import { useAuth } from '@/contexts/AuthContext';
import ChatMessage from '@/components/ChatMessage';
import classes from './Chat.module.scss';
import toast from 'react-hot-toast';

function Chat() {
  const { chatId } = useParams();
  const { refreshAuth } = useAuth();

  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [chatMessages, setChatMessages] = useState<IChatMessage[]>([]);

  const messagesRef = useRef<HTMLDivElement | null>(null);

  const appendUserMessage = (content: string) => {
    setChatMessages((prev) => [
      ...prev,
      {
        created_at: new Date().toISOString(),
        role: 'User',
        content,
      },
    ]);
  };

  const appendAssistantChunk = (chunk: string) => {
    setChatMessages((prev) => {
      const last = prev[prev.length - 1];

      if (last.role === 'Assistant') {
        return [
          ...prev.slice(0, -1),
          {
            ...last,
            content: last.content + chunk,
          },
        ];
      } else {
        return [
          ...prev,
          {
            created_at: new Date().toISOString(),
            role: 'Assistant',
            content: chunk,
          },
        ];
      }
    });
  };

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();

    if (!chatId) {
      return;
    }

    appendUserMessage(prompt);
    setIsGenerating(true);
    setPrompt('');

    generateResponse(chatId, prompt)
      .then(async (stream) => {
        const decoder = new TextDecoder();

        while (true) {
          const { done, value } = await stream.read();
          if (done) {
            break;
          }

          const chunk = decoder.decode(value);
          appendAssistantChunk(chunk);
        }
      })
      .then(refreshAuth)
      .catch((err: Error) => toast.error(err.message))
      .finally(() => setIsGenerating(false));
  };

  useEffect(() => {
    if (chatId) {
      getMessages(chatId)
        .then((messages) => setChatMessages(messages))
        .catch((err: Error) => toast.error(err.message));
    }
  }, [chatId]);

  return (
    <div className={classes.wrapper}>
      <div className={classes.messages} ref={messagesRef}>
        {chatMessages.map((message) => (
          <ChatMessage chatMessage={message} key={message.created_at} />
        ))}
      </div>

      <form onSubmit={submitHandler} className={classes.form}>
        <input
          type="text"
          placeholder="Напишите сообщение"
          className="input"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          required
        />
        <button type="submit" disabled={isGenerating} className="button">
          Сгенерировать
        </button>
      </form>
    </div>
  );
}

export default Chat;
