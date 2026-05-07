// TODO: divide logic into multiple files

import classes from './chat-page.module.css';
import toast from 'react-hot-toast';
import { Navigate, useNavigate, useParams, useSearchParams } from 'react-router';
import { ChatApi, useChat, type Chat, type Message, type MessageRole } from '@/entities/chat';
import { ChatInput } from '@/features/chat';
import { useRef, useState } from 'react';
import { isAxiosError } from 'axios';
import { MessageItem } from './message-item';
import { useQueryClient } from '@tanstack/react-query';

interface ResponseChunk {
  type: 'meta' | 'data';
  data: string;
}

export function ChatPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const initialMessage = searchParams.get('initialMessage');
  const modelId = searchParams.get('modelId');

  const isNewChat = id === 'new';

  const [message, setMessage] = useState(initialMessage ?? '');
  const [isGenerating, setIsGenerating] = useState(false);

  const activeChatIdRef = useRef(id);
  const processedLengthRef = useRef(0);
  const abortControllerRef = useRef<AbortController | null>(null);

  const { data: chat } = useChat(id);

  const appendChunk = (chunk: string, role: MessageRole) => {
    if (!chunk.trim()) return;

    queryClient.setQueryData<Chat>(['chats', activeChatIdRef.current], (oldChat) => {
      if (!oldChat) return oldChat;

      const messages = [...oldChat.messages];
      const lastMessage = messages[messages.length - 1];

      if (role === 'assistant' && lastMessage?.role === 'assistant') {
        messages[messages.length - 1] = {
          ...lastMessage,
          content: lastMessage.content + chunk,
        };
      } else {
        const newMessage: Message = {
          id: crypto.randomUUID(),
          chat_id: id ?? '',
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

  const onSend = async () => {
    appendChunk(message, 'user');
    setMessage('');

    processedLengthRef.current = 0;
    abortControllerRef.current = new AbortController();
    setIsGenerating(true);

    try {
      await ChatApi.generateMessage(
        {
          conversation_id: isNewChat ? null : (chat?.id ?? null),
          model_id: modelId,
          message: message,
        },
        {
          signal: abortControllerRef.current.signal,
          onDownloadProgress: (e) => {
            const responseText: string = e.event.target.response;
            const newText = responseText.slice(processedLengthRef.current);
            processedLengthRef.current = responseText.length;

            const lines = newText.split('\n');

            for (const line of lines) {
              if (!line.trim()) continue;

              try {
                const parsed: ResponseChunk = JSON.parse(line);

                if (parsed.type === 'meta') {
                  activeChatIdRef.current = parsed.data;
                  navigate(`/chat/${parsed.data}`, { replace: true });

                  queryClient.invalidateQueries({ queryKey: ['chats'] });
                } else if (parsed.type === 'data') {
                  appendChunk(parsed.data, 'assistant');
                }
              } catch {
                console.warn('Failed to parse streaming chunk:', line);
              }
            }
          },
        },
      );
    } catch (err) {
      if (isAxiosError(err) && err.response?.status === 402) {
        toast.error('Недостаточно токенов!');
        return;
      }

      toast.error('Произошла ошибка!');
    } finally {
      setIsGenerating(false);
    }
  };

  if (isNewChat && (!initialMessage || !modelId)) return <Navigate to="/" />;

  return (
    <div className={classes.wrapper}>
      {chat && (
        <div className={classes.top}>
          <h2 className={classes.name}>{chat.model_name}</h2>
          <span className={classes.model}>{chat.model}</span>
        </div>
      )}

      <div className={classes.chat}>
        <div className={classes.messages}>
          {chat?.messages.map((message) => (
            <MessageItem key={message.id} message={message} />
          ))}
        </div>

        <ChatInput
          placeholder="Спросите NeurNet"
          defaultValue={message}
          isGenerating={isGenerating}
          onStop={stopGeneration}
          onChange={(e) => setMessage(e.target.value)}
          onSend={onSend}
        />

        <span className={classes.disclaimer}>
          NeurNet может допускать ошибки. Проверяйте важную информацию.
        </span>
      </div>
    </div>
  );
}
