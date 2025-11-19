export class TimeoutError extends Error {
  constructor(message = 'Время ожидания сервера истекло!') {
    super(message);
    this.name = 'TimeoutError';
  }
}
