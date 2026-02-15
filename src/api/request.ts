import { client } from './client';

export type Request = {
  id: string;
  model_id: string;
  model_name: string;
  token_cost: number;
  status: string;
  created_at: string;
  started_at: string;
  finished_at: string;
};

export async function fetchRequests() {
  const res = await client.get<Request[]>('/requests');
  return res.data;
}
