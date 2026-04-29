import classes from './chat.module.css';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ChatApi, type Chat, type IMessage } from '@/features/chat';
import { ChatInput } from '@/shared/ui/chat-input';
import { Message } from './message';
import { isCancel, type AxiosProgressEvent } from 'axios';
import type { MessageRole } from '@/entities/request';
import { useSession } from '@/entities/session';

interface ResponseChunk {
  type: 'meta' | 'data';
  data: string;
  completed: boolean;
}

export function Chat() {
  const session = useSession();

  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const { chatId } = useParams();
  const queryClient = useQueryClient();

  const messagesRef = useRef<HTMLDivElement | null>(null);
  const processedLengthRef = useRef(0);
  const abortControllerRef = useRef<AbortController | null>(null);
  const chatIdRef = useRef<string | null>(null);

  const [isGenerating, setIsGenerating] = useState(false);

  const chat = useQuery({
    queryKey: ['chats', chatId],
    queryFn: () => ChatApi.fetchChatById(chatId || ''),
  });

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTo({
        top: messagesRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [chat.data?.messages]);

  const appendChunk = (chunk: string, role: MessageRole) => {
    if (!chunk.trim()) return;

    queryClient.setQueryData<Chat>(['chats', chatId], (oldChat) => {
      if (!oldChat) return oldChat;

      const messages = [...oldChat.messages];
      const lastMessage = messages[messages.length - 1];

      if (role === 'assistant' && lastMessage?.role === 'assistant') {
        messages[messages.length - 1] = {
          ...lastMessage,
          content: lastMessage.content + chunk,
        };
      } else {
        const newMessage: IMessage = {
          id: crypto.randomUUID(),
          chat_id: chatId || '',
          created_at: new Date().toISOString(),
          role,
          content: chunk,
        };
        messages.push(newMessage);
      }

      return { ...oldChat, messages };
    });
  };

  const stopGeneration = () => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;
  };

  const onSend = async (message: string) => {
    if (!chatId) return;

    appendChunk(message, 'user');

    processedLengthRef.current = 0;
    abortControllerRef.current = new AbortController();
    setIsGenerating(true);

    try {
      await ChatApi.sendMessage(
        {
          conversation_id: chatId === 'new' ? null : chatId,
          model_id: searchParams.get('model_id'),
          message,
        },
        {
          signal: abortControllerRef.current.signal,
          onDownloadProgress: (e: AxiosProgressEvent) => {
            const responseText = (e.event?.target as XMLHttpRequest | null)?.response ?? '';
            const newText = responseText.slice(processedLengthRef.current);
            processedLengthRef.current = responseText.length;

            const lines = newText.split('\n');

            for (const line of lines) {
              if (!line.trim()) continue;

              try {
                const parsed: ResponseChunk = JSON.parse(line);

                if (parsed.type === 'data') {
                  if (parsed.data) {
                    appendChunk(parsed.data, 'assistant');
                  }
                } else if (parsed.type === 'meta') {
                  chatIdRef.current = parsed.data;
                }

                if (parsed.completed && chatId === 'new') {
                  navigate(`/chat/${chatIdRef.current}`);
                  return;
                }
              } catch {
                console.warn('Failed to parse streaming chunk:', line);
              }
            }
          },
        },
      );
    } catch (err) {
      if (isCancel(err)) {
        console.log('Generation stopped by user');
        return;
      }

      console.error('Failed to send message:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className={classes.wrapper}>
      {chat.data && (
        <>
          <div className={classes.header}>
            <h1 className={classes.modelName}>{chat.data.model}</h1>
            <span className={classes.model}>{chat.data.model_name}</span>
          </div>

          <div className={classes.messages} ref={messagesRef}>
            {chat.data.messages.map((m) => (
              <Message key={m.id} message={m} />
            ))}
          </div>
        </>
      )}

      <ChatInput
        onSend={onSend}
        disabled={session.data?.tokens === 0}
        onStop={stopGeneration}
        isGenerating={isGenerating}
        defaultValue={searchParams.get('message') || ''}
      />

      <span className={classes.disclaimer}>
        NeurNet может допускать ошибки. Проверяйте важную информацию.
      </span>
    </div>
  );
}
