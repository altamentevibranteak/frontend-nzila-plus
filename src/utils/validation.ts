export function validateRequired(value: unknown) {
  if (value === undefined || value === null) return false;
  try {
    return String(value).trim().length > 0;
  } catch {
    return false;
  }
}

export function validateEmail(email: string) {
  if (!email) return false;
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/i;
  return re.test(String(email).toLowerCase());
}

export function minLength(value: string, n: number) {
  return !!value && value.length >= n;
}
