export type Model = {
  id: string;
  name: string;
  model: string;
  type: 'text' | 'image' | 'code';
  version: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export async function getModels(): Promise<Model[]> {
  return [
    {
      id: '1',
      name: 'GPT-4',
      model: 'gpt-4',
      type: 'text',
      version: '1.0.0',
      status: 'active',
      createdAt: '2023-10-01T12:00:00Z',
      updatedAt: '2023-10-10T12:00:00Z',
    },
    {
      id: '2',
      name: 'Dall-E',
      model: 'dall-e-3',
      type: 'image',
      version: '2.1.0',
      status: 'active',
      createdAt: '2023-09-15T08:30:00Z',
      updatedAt: '2023-10-05T09:45:00Z',
    },
    {
      id: '3',
      name: 'DaVinci Code',
      model: 'code-davinci-002',
      type: 'code',
      version: '3.0.5',
      status: 'inactive',
      createdAt: '2023-08-20T14:20:00Z',
      updatedAt: '2023-09-25T16:10:00Z',
    },
  ];
}
