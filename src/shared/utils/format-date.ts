export function formatDate(date: string) {
  const formattedDate = new Date(date).toLocaleDateString('en', {
    month: 'short',
    year: 'numeric',
    day: 'numeric',
  });

  return formattedDate;
}

export function formateDateTime(date: string) {
  const formattedTime = new Date(date).toLocaleTimeString('en', {
    hour12: true,
    hour: 'numeric',
    minute: 'numeric',
  });

  return formattedTime;
}
