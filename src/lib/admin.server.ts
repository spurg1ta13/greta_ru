/**
 * Server-only admin guard. The dashboard is restricted to a single account.
 */
export const ADMIN_EMAIL = "grespurga@gmail.com";

export function isAdminEmail(email: unknown): boolean {
  return typeof email === "string" && email.toLowerCase() === ADMIN_EMAIL;
}
