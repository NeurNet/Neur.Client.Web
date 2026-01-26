import classes from './FullScreenLoader.module.css';

export function FullScreenLoader() {
  return (
    <div className={classes.wrapper}>
        <img
          src="https://it-college.ru/images/Logo5.png"
          alt="Логотип Колледжа Цифровых Технологий"
          className={classes.loader}
          width={64}
          height={64}
        />
    </div>
  );
}
