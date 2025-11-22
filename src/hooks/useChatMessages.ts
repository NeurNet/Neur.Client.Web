import { useEffect, useState } from 'react';
import { generateResponse, getChat, type Chat } from '@/utils/chats';
import type { MessageState } from '@/components/ChatMessage';
import toast from 'react-hot-toast';

export function useChatMessages(chatId?: string) {
  const [chat, setChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<MessageState[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const appendUserMessage = (content: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        role: 'user',
        content,
      },
    ]);
  };

  const appendAssistantChunk = (chunk: string) => {
    setMessages((prev) => {
      const last = prev[prev.length - 1];

      if (last.role === 'assistant') {
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
            id: crypto.randomUUID(),
            role: 'assistant',
            content: chunk,
          },
        ];
      }
    });
  };

  const sendMessage = async (prompt: string) => {
    if (!chatId) {
      return;
    }

    appendUserMessage(prompt);
    setIsGenerating(true);

    try {
      const stream = await generateResponse(chatId, prompt);
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await stream.read();
        if (done) {
          break;
        }

        appendAssistantChunk(decoder.decode(value));
      }
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error('Произошла ошибка!');
      }
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    if (chatId) {
      getChat(chatId)
        .then((chat) => {
          setChat(chat);
          setMessages(
            chat.messages.map((m) => ({
              id: m.id,
              role: m.role,
              content: m.content,
            }))
          );
        })
        .catch((err: Error) => toast.error(err.message));
    }
  }, [chatId]);

  return {
    chat,
    messages,
    isGenerating,
    sendMessage,
  };
}
