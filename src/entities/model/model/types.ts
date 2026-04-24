export type ModelType = 'text' | 'code' | 'image';
export type ModelStatus = 'open' | 'locked';

export interface Model {
  id: string;
  name: string;
  model: string;
  type: ModelType;
  version: string;
  status: ModelStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateModel {
  name: string;
  model: string;
  context: string;
  type: ModelType;
  version: string;
  status: ModelStatus;
}

export type UpdateModel = CreateModel;
