export function paramString(
  value: string | string[] | undefined | null,
): string | undefined {
  if (value == null) return undefined;
  return Array.isArray(value) ? value[0] : value;
}
