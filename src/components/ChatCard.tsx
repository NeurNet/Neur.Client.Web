import { Link } from 'react-router-dom';
import type { Chat } from '@/utils/chats';

function ChatCard({ chat }: { chat: Chat }) {
  return (
    <Link to={`/chat/${chat.id}`} className="card">
      <h1>{chat.model.name}</h1>
      <span>Версия модели: {chat.model.version}</span>
      <span>Дата создания: {new Date(chat.createdAt).toLocaleString('ru')}</span>
    </Link>
  );
}

export default ChatCard;
