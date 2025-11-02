import classes from './ModelList.module.scss';

function ModelList() {
  return (
    <div className={classes.wrapper}>
      <h1>Выберите модель:</h1>
      <div className={classes.models}>
        <div className={classes.model}>
          <h2>LLaMa 8B</h2>
          <p>Text model v1.2</p>
        </div>
        <div className={classes.model}>
          <h2>Midjourney XL</h2>
          <p>Image model v1.5</p>
        </div>
        <div className={classes.model}>
          <h2>Codex</h2>
          <p>Code model v1</p>
        </div>
      </div>
    </div>
  );
}

export default ModelList;
