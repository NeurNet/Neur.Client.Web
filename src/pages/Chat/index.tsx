import { useState, type FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import { generateResponse } from '@/utils/chats';
import type { IChatMessage } from '@/utils/messages';
import classes from './Chat.module.scss';
import ChatMessage from '@/components/ChatMessage';

function Chat() {
  const { chatId } = useParams();
  const [prompt, setPrompt] = useState('');
  const [chatMessages, setChatMessages] = useState<IChatMessage[]>([]);

  const generateHandler = (e: FormEvent) => {
    e.preventDefault();

    if (!chatId) {
      return;
    }

    setChatMessages([...chatMessages, { author: 'user', body: prompt }]);
    setPrompt('');

    generateResponse(chatId, prompt)
      .then(async (reader) => {
        const decoder = new TextDecoder();

        while (true) {
          const { value, done } = await reader.read();
          if (done) {
            break;
          }

          const eventResponse = decoder.decode(value);
          const [type, data] = eventResponse.split(': ');

          switch (type) {
            case 'data':
              setChatMessages((chatMessages) => [
                ...(chatMessages[chatMessages.length - 1].author === 'bot'
                  ? chatMessages.slice(0, -1)
                  : chatMessages),
                {
                  author: 'bot',
                  body: chatMessages[chatMessages.length - 1].body + data,
                },
              ]);

              break;
            case 'event':
              console.log(`event: '${data}'`);
              break;
          }
        }
      })
      .catch(console.error);
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.messages}>
        {chatMessages.map((message, i) => (
          <ChatMessage chatMessage={message} key={i} />
        ))}
      </div>

      <form onSubmit={generateHandler} className={classes.form}>
        <input
          type="text"
          placeholder="Напишите сообщение"
          className="input"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          required
        />
        <button type="submit" className="button">
          Сгенерировать
        </button>
      </form>
    </div>
  );
}

export default Chat;
