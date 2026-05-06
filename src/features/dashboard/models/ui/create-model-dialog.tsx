import classes from './create-model-dialog.module.css';
import { Input } from '@/shared/ui/input';
import { Dialog } from '@/shared/ui/dialog';
import { Label } from '@/shared/ui/label';
import { Button } from '@/shared/ui/button';
import { Textarea } from '@/shared/ui/textarea';
import { Select } from '@/shared/ui/select';

interface CreateModelDialogProps {
  open?: boolean;
  onClose?: () => void;
}

export function CreateModelDialog({ open, onClose }: CreateModelDialogProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <h2 className={classes.title}>Добавить модель</h2>

      <form>
        <div className={classes.row}>
          <div className={classes.field}>
            <Label htmlFor="name">Название</Label>
            <Input type="text" id="name" placeholder="Введите название..." />
          </div>
        </div>

        <div className={classes.row}>
          <div className={classes.field}>
            <Label htmlFor="model">Имя модели в Ollama</Label>
            <Input type="text" id="model" placeholder="Введите имя модели в Ollama..." />
          </div>
        </div>

        <div className={classes.row}>
          <div className={classes.field}>
            <Label htmlFor="context">Контекст (системный промпт)</Label>
            <Textarea id="context" placeholder="Введите системный контекст..." />
          </div>
        </div>

        <div className={classes.row}>
          <div className={classes.field}>
            <Label htmlFor="type">Тип генерации</Label>
            <Select id="type">
              <option value="text">Текст</option>
              <option value="code">Код</option>
              <option value="images">Изображения</option>
            </Select>
          </div>

          <div className={classes.field}>
            <Label htmlFor="version">Версия</Label>
            <Input type="text" id="version" defaultValue="1.0" placeholder="Введите версию..." />
          </div>
        </div>

        <div className={classes.row}>
          <div className={classes.field}>
            <Label htmlFor="status">Статус доступа</Label>
            <Select id="status">
              <option value="open">Публичная</option>
              <option value="locked">Закрытая</option>
            </Select>
          </div>
        </div>

        <div className={classes.row}>
          <Button type="button" variant="outline" className={classes.field} onClick={onClose}>
            Отмена
          </Button>

          <Button type="submit" className={classes.field}>
            Сохранить
          </Button>
        </div>
      </form>
    </Dialog>
  );
}
