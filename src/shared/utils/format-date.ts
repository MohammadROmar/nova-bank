export function formatDate(date: string) {
  const formattedDate = new Date(date).toLocaleDateString('en', {
    month: 'short',
    year: 'numeric',
    day: '2-digit',
  });

  return formattedDate;
}
