import {notFound, redirect} from 'next/navigation';
import {legacyCareDestination, bookingQuery} from '@/shared/physix/navigation';
export const dynamic = 'force-dynamic';
/** Compatibility only; /care is the single patient renderer and authorization boundary. */
export default async function LegacyPatientPage({params, searchParams}: {
  params: Promise<{path?: string[]}>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const destination = legacyCareDestination((await params).path || []);
  if (!destination) notFound();
  redirect(destination + (destination === '/book' ? bookingQuery(await searchParams) : ''));
}
