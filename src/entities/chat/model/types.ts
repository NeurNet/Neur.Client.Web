export interface Chat {
  id: string;
  model_id: string;
  model_name: string;
  model: string;
  created_at: string;
  updated_at: string;
}

export interface GenerateMessage {
  conversation_id: string;
  model_id: string;
  message: string;
}
