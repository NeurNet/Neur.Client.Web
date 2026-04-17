import classes from './users.module.css';
import { Select } from '@/shared/ui/select';
import { Input } from '@/shared/ui/input';

export function Users() {
  return (
    <div>
      <div className={classes.filters}>
        <Input className={classes.search} placeholder="Поиск по имени или ID" role="search" />

        <Select>
          <option value="all">Все роли</option>
          <option value="students">Студенты</option>
          <option value="teachers">Преподаватели</option>
          <option value="admins">Админы</option>
        </Select>
      </div>
    </div>
  );
}
