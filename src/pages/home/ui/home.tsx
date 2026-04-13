import { ChatInput } from '@/shared/ui/chat-input';
import classes from './home.module.css';

export function Home() {
  return (
    <div className={classes.wrapper}>
      <h1 className={classes.title}>Привет! Чем могу помочь?</h1>
      <ChatInput />
    </div>
  );
}
