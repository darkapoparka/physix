import { notFound } from 'next/navigation';
import { demoEnabled } from '@/shared/physix/demo';
import { PatientDemo } from '@/features/physix/patient-demo';
import { SessionDemo } from '@/features/physix/session-demo';
import { BookingDemo, type BookingStep } from '@/features/physix/booking-demo';
const bookingRoutes: Record<string, BookingStep> = {
  book: 'service', 'book/time': 'time', 'book/details': 'details',
  'book/review': 'review', 'book/complete': 'complete',
};
export default async function DemoPage({ params, searchParams }: {
  params: Promise<{ path?: string[] }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  if (!demoEnabled(process.env)) notFound();
  const route = (await params).path?.join('/') || '';
  if (Object.hasOwn(bookingRoutes, route)) {
    const query = await searchParams;
    return <BookingDemo key={route} step={bookingRoutes[route]}
      initialService={typeof query.service === 'string' ? query.service.slice(0, 80) : ''}
      initialMode={query.mode === 'online' ? 'online' : 'in_clinic'} />;
  }
  if (route === '') return <PatientDemo screen="home" />;
  if (route === 'plans') return <PatientDemo screen="plans" />;
  if (route === 'plans/demo-plan') return <PatientDemo screen="detail" />;
  if (route === 'sessions/demo-session') return <SessionDemo />;
  if (route === 'progress') return <PatientDemo screen="progress" />;
  notFound();
}
