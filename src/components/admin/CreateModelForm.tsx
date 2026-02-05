import { useState } from 'react';
import { Button } from '../ui/button';
import { Form } from '../ui/form';
import { Input, InputGroup } from '../ui/input';
import { Select } from '../ui/select';
import { Label } from '../ui/label';
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
    <Form onSubmit={submitHandler}>
      <InputGroup>
        <Label htmlFor="name">Название</Label>
        <Input
          type="text"
          placeholder="Saiga"
          name="name"
          id="name"
          onChange={changeHandler}
          value={form.name}
          required
        />
      </InputGroup>

      <InputGroup>
        <Label htmlFor="model-name">Имя модели (как в Ollama)</Label>
        <Input
          type="text"
          placeholder="saiga:7b"
          name="model"
          id="model-name"
          onChange={changeHandler}
          value={form.model}
          required
        />
      </InputGroup>

      <InputGroup>
        <Label htmlFor="type">Тип модели</Label>
        <Select onChange={changeHandler} value={form.type} name="type" id="type" required>
          <option value="text">Генерация текста</option>
          <option value="code">Генерация кода</option>
          <option value="image">Генерация изображений</option>
        </Select>
      </InputGroup>

      <InputGroup>
        <Label htmlFor="version">Версия модели</Label>
        <Input
          type="text"
          name="version"
          id="version"
          onChange={changeHandler}
          value={form.version}
          required
        />
      </InputGroup>

      <InputGroup>
        <Label htmlFor="status">Статус модели</Label>
        <Select onChange={changeHandler} value={form.status} name="status" id="status" required>
          <option value="locked">Приватная модель</option>
          <option value="open">Публичная модель</option>
        </Select>
      </InputGroup>

      <Button type="submit" loading={mutation.isPending}>
        Добавить модель
      </Button>
    </Form>
  );
}
