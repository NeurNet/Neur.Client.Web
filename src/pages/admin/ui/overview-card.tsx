import classes from './overview-card.module.css';
import { Button } from '@/shared/ui/button';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router';

interface OverviewCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  to: string;
}

export function OverviewCard({ icon, title, description, to }: OverviewCardProps) {
  return (
    <div className={classes.card}>
      {icon}

      <div className={classes.bottom}>
        <div className={classes.data}>
          <span className={classes.stat}>{title}</span>
          <span>{description}</span>
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
