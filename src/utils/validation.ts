export function validEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
}

export function passwordIssue(pw: string): string | undefined {
  if (pw.length < 8) return 'Use at least 8 characters.';
  if (!/\d/.test(pw)) return 'Include at least one number.';
  return undefined;
}