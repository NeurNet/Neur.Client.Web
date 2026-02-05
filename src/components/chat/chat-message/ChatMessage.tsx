import classes from './ChatMessage.module.css';

export function ChatMessage({
  children,
  className,
  author,
}: {
  children: React.ReactNode;
  className?: string;
  author: string;
}) {
  return (
    <div className={`${classes.wrapper} ${className}`}>
      <span className={classes.author}>{author}</span>
      <div className={classes.message}>{children}</div>
    </div>
  );
}
