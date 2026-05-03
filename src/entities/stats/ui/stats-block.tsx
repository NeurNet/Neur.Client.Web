import classes from './stats-block.module.css';
import { Button } from '@/shared/ui/button';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router';

interface StatsBlockProps {
  icon: React.ReactNode;
  count: number;
  name: string;
  to: string;
}

export function StatsBlock({ icon, count, name, to }: StatsBlockProps) {
  return (
    <div className={classes.block}>
      {icon}

      <div className={classes.bottom}>
        <div>
          <span className={classes.count}>
            {count.toLocaleString('en-US').replaceAll(',', ' ')}
          </span>
          <span className={classes.name}>{name}</span>
        </div>

        <Link to={to}>
          <Button size="icon">
            <ChevronRight />
          </Button>
        </Link>
      </div>
    </div>
  );
}
