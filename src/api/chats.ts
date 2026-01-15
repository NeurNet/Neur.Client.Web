export async function createChat(modelId: string): Promise<string> {
  return `new-chat-${modelId}`;
}
