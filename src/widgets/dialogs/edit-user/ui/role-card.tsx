import clsx from 'clsx';
import classes from './role-card.module.css';

interface RoleItemProps {
  title: string;
  description: string;
  selected?: boolean;
  onClick?: () => void;
}

export function RoleCard({ title, description, selected = false, onClick }: RoleItemProps) {
  return (
    <div className={clsx(classes.card, selected && classes.selected)} onClick={onClick}>
      <h1 className={classes.title}>{title}</h1>
      <span className={classes.description}>{description}</span>
    </div>
  );
}
