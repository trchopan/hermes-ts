export function json(value: any): string {
  return JSON.stringify(value, null, 2);
}
