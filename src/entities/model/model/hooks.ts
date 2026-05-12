import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ModelApi } from '../api/model';
import toast from 'react-hot-toast';
import type { CreateModel, Model, UpdateModel } from './types';

export function useModels() {
  return useQuery({
    queryKey: ['models'],
    queryFn: ModelApi.fetchModels,
  });
}

export function useOllamaModels() {
  return useQuery({
    queryKey: ['ollamaModels'],
    queryFn: ModelApi.fetchOllamaModels,
  });
}

export function useCreateModel() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ModelApi.createModel,
    onSuccess: async (_, { name }: CreateModel) => {
      await queryClient.invalidateQueries({ queryKey: ['models'] });
      toast.success(`Вы создали модель ${name}!`);
    },
    onError: (error) => toast.error(error.message),
  });
}

export function useUpdateModel() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ModelApi.updateModel,
    onSuccess: async (_, { model }: UpdateModel) => {
      await queryClient.invalidateQueries({ queryKey: ['models'] });
      toast.success(`Вы обновили модель ${model.name}!`);
    },
    onError: (error) => toast.error(error.message),
  });
}

export function useRemoveModel() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: Model) => ModelApi.deleteModel(id),
    onSuccess: async (_, { name }: Model) => {
      await queryClient.invalidateQueries({ queryKey: ['models'] });
      toast.success(`Вы удалили модель ${name}!`);
    },
    onError: (error) => toast.error(error.message),
  });
}
