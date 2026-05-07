export function timeAgo(dateString: string): string {
  const date = new Date(dateString);
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

  if (seconds < 60) return `${seconds} с.`;

  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes} м.`;

  const hours = Math.round(seconds / 3600);
  if (hours < 24) return `${hours} ч.`;

  const days = Math.round(seconds / 86400);
  if (days < 30) return `${days} д.`;

  const months = Math.round(seconds / (86400 * 30));
  if (months < 12) return `${months} мес.`;

  const years = Math.round(seconds / (86400 * 365));
  return `${years} г.`;
}
