import { client } from './client';
import type { MessageRole } from './message';

export type Request = {
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
  message: {
    id: string;
    role: MessageRole;
    content: string;
  } | null;
};

export async function fetchRequests() {
  const res = await client.get<Request[]>('/requests');
  return res.data;
}
