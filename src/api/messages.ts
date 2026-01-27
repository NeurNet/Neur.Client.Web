export type Message = {
  id: string;
  chat_id: string;
  created_at: string;
  role: string;
  content: string;
};

export async function sendMessage(prompt: string, chatId: string) {
  const res = await fetch(import.meta.env.VITE_API_URL + `/chats/${chatId}/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ prompt }),
  });

  if (!res.ok) {
    throw new Error('Произошла ошибка!');
  }

  return res.body!.getReader();
}
