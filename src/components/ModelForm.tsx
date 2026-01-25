import { useState } from 'react';
import { Button } from './Button/Button';
import { createModel, type CreateModel } from '@/api/models';

const initialForm: CreateModel = {
  name: '',
  model: '',
  type: 'text',
  version: '',
  status: 'open',
};

export function ModelForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const [form, setForm] = useState<CreateModel>(initialForm);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(form);

    createModel(form)
      .then(() => setForm(initialForm))
      .finally(() => setLoading(false));
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { value, name, type } = e.target;

    let checked = 'open';
    if (type === 'checkbox') {
      checked = e.target.checked ? 'private' : 'open';
    }

    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  return (
    <form onSubmit={submitHandler} className="form">
      <input
        type="text"
        placeholder="Название (напр. saiga)"
        name="name"
        onChange={changeHandler}
        value={form.name}
        required
      />
      <input
        type="text"
        placeholder="Модель (напр. saiga:7b)"
        name="model"
        onChange={changeHandler}
        value={form.model}
        required
      />
      <select onChange={changeHandler} value={form.type} name="type" required>
        <option value="text">Генерация текста</option>
        <option value="code">Генерация кода</option>
        <option value="image">Генерация изображений</option>
      </select>
      <input
        type="text"
        placeholder="Версия (напр. 1.0)"
        name="version"
        onChange={changeHandler}
        value={form.version}
        required
      />
      <div>
        <input
          type="checkbox"
          id="private"
          name="status"
          checked={form.status === 'closed'}
          onChange={changeHandler}
        />
        <label htmlFor="private">Приватная модель</label>
      </div>
      <Button type="submit" loading={loading}>
        Добавить модель
      </Button>
    </form>
  );
}
