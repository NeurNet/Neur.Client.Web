import { useState } from 'react';
import { createModel, type CreateModel } from '@/api/model';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import classes from './ModelForm.module.css';

const initialData: CreateModel = {
  name: '',
  model: '',
  type: 'text',
  version: '',
  status: 'open',
};

export function ModelForm() {
  const [formData, setFormData] = useState(initialData);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createModel,
    onSuccess: async () => await queryClient.invalidateQueries({ queryKey: ['models'] }),
  });

  const createModelHandler = (e: React.SubmitEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <form className={classes.form} onSubmit={createModelHandler}>
      <Input
        type="text"
        name="name"
        value={formData.name}
        onChange={changeHandler}
        placeholder="Название (например: Saiga)"
        required
      />

      <Input
        type="text"
        name="model"
        value={formData.model}
        onChange={changeHandler}
        placeholder="Имя модели (как в Ollama, например: saiga:7b)"
        required
      />

      <Select name="type" onChange={changeHandler}>
        <option value="text">Генерация текста</option>
        <option value="code">Генерация кода</option>
        <option value="image">Генерация изображений</option>
      </Select>

      <Input
        type="text"
        name="version"
        value={formData.version}
        onChange={changeHandler}
        placeholder="Версия (например: 1.0)"
        required
      />

      <Select name="status" onChange={changeHandler}>
        <option value="open">Публичная модель</option>
        <option value="locked">Приватная модель</option>
      </Select>

      <Button type="submit" showLoader={mutation.isPending}>
        Добавить
      </Button>
    </form>
  );
}
