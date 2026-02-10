import classes from './ErrorMessage.module.css';

export function ErrorMessage({ message }: { message?: string }) {
  return (
    <div className={classes.container}>
      <h1 className={classes.smile}>:(</h1>
      <span className={classes.description}>Что-то пошло не так!</span>
      {message && <span className={classes.error}>{message}</span>}
    </div>
  );
}
