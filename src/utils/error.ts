export function getErrorMessage(err: unknown): string {
  if (!err) return 'Unknown error';
  if (typeof err === 'string') return err;
  if (err instanceof Error) return err.message;
  try {
    const maybe = err as { message?: string };
    if (maybe && maybe.message) return maybe.message;
  } catch {}
  return String(err);
}

export default getErrorMessage;
