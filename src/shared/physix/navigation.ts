/** Public navigation is stable across sign-in. Paths are not authorization. */
export const primaryDestinations = [
  {key: 'home', href: '/', label: 'Home'},
  {key: 'book', href: '/book', label: 'Book'},
  {key: 'care', href: '/care', label: 'My care'},
] as const;
export type PrimarySection = (typeof primaryDestinations)[number]['key'];
const id = '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}';
const privatePath = new RegExp('^/care(?:/(?:programmes(?:/' + id + ')?|workouts/' + id + '|sessions/' + id + '|schedule|progress|appointments(?:/' + id + ')?|check-ins|profile))?$','i');
export function isCarePath(value: string): boolean { return value === value.trim() && privatePath.test(value); }
export function safeCareReturn(value: unknown): string {
  return typeof value === 'string' && isCarePath(value) ? value : '/care';
}
export function careLoginHref(destination: unknown): string {
  return '/login?returnTo=' + encodeURIComponent(safeCareReturn(destination));
}
export function primarySection(pathname: string): PrimarySection {
  if (pathname === '/book' || pathname.startsWith('/book/')) return 'book';
  if (pathname === '/login' || pathname === '/care' || pathname.startsWith('/care/') || pathname === '/app' || pathname.startsWith('/app/') || pathname.startsWith('/dev/demo')) return 'care';
  return 'home';
}
/** Old bookmarks are redirects only. Opaque record IDs remain subject to server authorization. */
export function legacyCareDestination(parts: readonly string[]): string | null {
  if (parts.length === 0) return '/care';
  if (parts.length === 1 && parts[0] === 'book') return '/book';
  const mapped = parts[0] === 'plans' ? ['programmes', ...parts.slice(1)] : [...parts];
  const result = '/care/' + mapped.join('/');
  return isCarePath(result) ? result : null;
}
export function bookingQuery(query: Record<string, string | string[] | undefined>): string {
  const result = new URLSearchParams();
  for (const key of ['service','mode','step','q']) {
    const value = query[key];
    if (typeof value === 'string' && value.length <= 160) result.set(key, value);
  }
  return result.size ? '?' + result.toString() : '';
}
