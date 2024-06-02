export function splitPathname(pathname: string): string[] {
  const pathParts = pathname.split('/');

  // Remove the locale if it exists
  const localeIndex = pathParts.findIndex(
    (part) => part.length === 2 && /^[a-z]{2}$/.test(part)
  );
  if (localeIndex !== -1) {
    pathParts.splice(localeIndex, 1);
  }

  return pathParts.filter((part) => part !== '');
}
