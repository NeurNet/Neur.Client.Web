import classes from './avatar.module.css';

interface AvatarProps {
  children?: React.ReactNode;
}

export function Avatar({ children }: AvatarProps) {
  return (
    <div className={classes.avatar}>
      <span>{children}</span>
    </div>
  );
}
