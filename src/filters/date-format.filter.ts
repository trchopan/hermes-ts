export function dateFormat(
  value: number,
  locale: string,
  options?: any
): string {
  const opts = options || {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit"
  };
  return new Date(value).toLocaleString(locale, opts);
}
