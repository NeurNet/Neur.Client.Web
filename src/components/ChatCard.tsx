import { Link } from 'react-router-dom';
import type { Chat } from '@/utils/chats';

function ChatCard({ chat }: { chat: Chat }) {
  const creationDate = new Date(chat.created_at).toLocaleString('ru');

  return (
    <Link to={`/chat/${chat.id}`} className="card">
      <h1>ID: {chat.model_id}</h1>
      <span>Дата создания: {creationDate}</span>
    </Link>
  );
}

export default ChatCard;
