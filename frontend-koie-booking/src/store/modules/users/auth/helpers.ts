export function isLoggedIn(token: string | null): boolean {
  return token ? token.length > 0 : false;
}
