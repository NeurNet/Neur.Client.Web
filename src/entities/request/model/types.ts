export type MessageRole = 'user' | 'assistant';

export interface IRequest {
  id: string;
  model_id: string;
  model_name: string;
  token_cost: number;
  status: string;
  created_at: string;
  started_at: string;
  finished_at: string;
  user: {
    id: string;
    username: string;
    name: string;
    surname: string;
  };
  message?: {
    id: string;
    role: MessageRole;
    content: string;
  };
}

export interface RequestsResponse {
  items: IRequest[];
  total: number;
}
