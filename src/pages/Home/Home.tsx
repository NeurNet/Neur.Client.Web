import { ChatList } from '@/components/ChatList';
import classes from './Home.module.css';
import { ModelList } from '@/components/ModelList';

export function Home() {
  return (
    <div className={classes.container}>
      <ChatList />
      <ModelList />
    </div>
  );
}
