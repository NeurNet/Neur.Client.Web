export type Message = {
  id: string;
  chat_id: string;
  created_at: string;
  role: string;
  content: string;
};

export async function sendMessage(prompt: string, chatId: string) {
  const res = await fetch(import.meta.env.VITE_API_URL + `/chats/${chatId}/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ prompt }),
  });

  return res.body!.getReader();
}
