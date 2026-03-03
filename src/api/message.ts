export type Message = {
  id: string;
  chat_id: string;
  created_at: string;
  role: 'user' | 'bot';
  content: string;
};

export async function sendMessage({ chatId, prompt }: { chatId: string; prompt: string }) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/chats/${chatId}/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt }),
    credentials: 'include',
  });

  if (!res.ok) {
    if (res.status === 402) {
      throw new Error('Недостаточно токенов для отправки сообщения');
    }

    throw new Error('Что-то пошло не так!');
  }

  return res.body;
}
