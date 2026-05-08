import clsx from 'clsx';
import classes from './role-item.module.css';

interface RoleItemProps {
  name: string;
  description: string;
  active?: boolean;
  onClick?: () => void;
}

export function RoleItem({ name, description, active = false, onClick }: RoleItemProps) {
  return (
    <div className={clsx(classes.item, active && classes.active)} onClick={onClick}>
      <h1 className={classes.name}>{name}</h1>
      <span className={classes.description}>{description}</span>
    </div>
  );
}
