import { useState } from 'react';
import { Button } from '../ui/button';
import { createModel, type CreateModel } from '@/api/models';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const initialForm: CreateModel = {
  name: '',
  model: '',
  type: 'text',
  version: '1.0',
  status: 'open',
};

export function CreateModelForm() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createModel,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['models'] }),
  });

  const [form, setForm] = useState<CreateModel>(initialForm);

  const submitHandler = (e: React.SubmitEvent) => {
    e.preventDefault();
    mutation.mutate(form);
    setForm(initialForm);
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { value, name } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <form onSubmit={submitHandler} className="form">
      <div className="input-container">
        <label htmlFor="name">Название</label>
        <input
          type="text"
          placeholder="Saiga"
          name="name"
          id="name"
          onChange={changeHandler}
          value={form.name}
          required
        />
      </div>

      <div className="input-container">
        <label htmlFor="model-name">Имя модели (как в Ollama)</label>
        <input
          type="text"
          placeholder="saiga:7b"
          name="model"
          id="model-name"
          onChange={changeHandler}
          value={form.model}
          required
        />
      </div>

      <div className="input-container">
        <label htmlFor="type">Тип модели</label>
        <select onChange={changeHandler} value={form.type} name="type" id="type" required>
          <option value="text">Генерация текста</option>
          <option value="code">Генерация кода</option>
          <option value="image">Генерация изображений</option>
        </select>
      </div>

      <div className="input-container">
        <label htmlFor="version">Версия модели</label>
        <input
          type="text"
          name="version"
          id="version"
          onChange={changeHandler}
          value={form.version}
          required
        />
      </div>

      <div className="input-container">
        <label htmlFor="status">Статус модели</label>
        <select onChange={changeHandler} value={form.status} name="status" id="status" required>
          <option value="locked">Приватная модель</option>
          <option value="open">Публичная модель</option>
        </select>
      </div>

      <Button type="submit" loading={mutation.isPending}>
        Добавить модель
      </Button>
    </form>
  );
}
