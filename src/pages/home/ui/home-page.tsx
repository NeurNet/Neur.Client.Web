import { ChatInput } from '@/features/chat';
import classes from './home-page.module.css';

export function HomePage() {
  return (
    <div className={classes.wrapper}>
      <span className={classes.welcome}>Привет! Чем могу помочь?</span>

      <ChatInput />
    </div>
  );
}
