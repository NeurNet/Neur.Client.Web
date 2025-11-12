import { useRef, useState, type FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import { generateResponse } from '@/utils/chats';
import type { IChatMessage } from '@/utils/messages';
import ChatMessage from '@/components/ChatMessage';
import classes from './Chat.module.scss';

function Chat() {
  const { chatId } = useParams();

  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [chatMessages, setChatMessages] = useState<IChatMessage[]>([]);

  const messagesRef = useRef<HTMLDivElement | null>(null);

  const appendUserMessage = (text: string) => {
    setChatMessages((prev) => [...prev, { author: 'user', body: text, thinkingText: '' }]);
  };

  const appendBotChunk = (chunk: string, isThinking: boolean) => {
    setChatMessages((prev) => {
      const last = prev.at(-1);
      const botMsg =
        last?.author === 'bot'
          ? { ...last }
          : ({ author: 'bot', body: '', thinkingText: '' } satisfies IChatMessage);

      if (isThinking) {
        botMsg.thinkingText += chunk;
      } else {
        botMsg.body += chunk;
      }

      const updated = last?.author === 'bot' ? prev.slice(0, -1) : prev;
      return [...updated, botMsg];
    });

    if (messagesRef.current) {
      messagesRef.current.scrollTo(0, messagesRef.current.scrollHeight);
    }
  };

  const generateHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (!chatId || !prompt.trim()) return;

    appendUserMessage(prompt);
    setIsGenerating(true);
    setPrompt('');

    try {
      const reader = await generateResponse(chatId, prompt);
      const decoder = new TextDecoder();

      let isThinking = false;

      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          break;
        }

        const chunk = decoder.decode(value);
        console.log(JSON.stringify(chunk));

        if (chunk.includes('<think>')) {
          isThinking = true;
        } else if (chunk.includes('</think>')) {
          isThinking = false;
        } else {
          appendBotChunk(chunk, isThinking);
        }
      }
    } catch (err) {
      console.error(err);
    }

    setIsGenerating(false);
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.messages} ref={messagesRef}>
        {chatMessages.map((message, i) => (
          <ChatMessage chatMessage={message} key={i} />
        ))}
      </div>

      <form onSubmit={(e) => void generateHandler(e)} className={classes.form}>
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
