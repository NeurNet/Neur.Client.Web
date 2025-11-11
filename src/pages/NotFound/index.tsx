import { Link } from 'react-router-dom';
import classes from './NotFound.module.scss';

function NotFound() {
  return (
    <div className={classes.wrapper}>
      <h1>404</h1>
      <p>Страница не найдена</p>
      <Link to="/">
        <button className="button">Вернуться домой</button>
      </Link>
    </div>
  );
}

export default NotFound;
