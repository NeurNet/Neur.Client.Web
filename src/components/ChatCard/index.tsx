import { Link } from 'react-router-dom';
import type { Chat } from '@/utils/chats';
import classes from './ChatCard.module.scss';

function ChatCard({ chat, onDelete }: { chat: Chat; onDelete: () => void }) {
  const creationDate = new Date(chat.created_at).toLocaleString('ru');

  return (
    <div className={classes.card}>
      <span>ID: {chat.model_id}</span>
      <span>Дата создания: {creationDate}</span>

      <div className={classes.buttons}>
        <Link to={`/chat/${chat.id}`}>
          <button className="button">Перейти</button>
        </Link>

        <button className="button" onClick={onDelete}>
          Удалить
        </button>
      </div>
    </div>
  );
}

export default ChatCard;
