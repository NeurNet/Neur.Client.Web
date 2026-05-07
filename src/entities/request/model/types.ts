export type RequestStatus = 'success' | 'failed';

export interface Request {
  id: string;
  model_id: string;
  model_name: string;
  model_ollama: string;
  token_cost: number;
  status: RequestStatus;
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
    role: 'user' | 'ai';
    content: string;
  };
}

export interface RequestsResponse {
  items: Request[];
  total: number;
}
