import { ChatList } from '@/components/chat/chat-list';
import { ModelList } from '@/components/model/model-list';
import classes from './Home.module.css';

export function Home() {
  return (
    <div className={classes.container}>
      <ChatList />
      <ModelList />
    </div>
  );
}
