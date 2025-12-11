export function isActiveTab(pathname: string, to: string) {
  const pathnameParts = pathname.split('/').filter(Boolean);
  const toParts = to.split('/').filter(Boolean);

  if (toParts.length === 1 && pathnameParts.length === 1) return true;

  return pathnameParts[1] === toParts[1];
}
