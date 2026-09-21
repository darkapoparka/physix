import {bookingHref} from '@/shared/physix/booking-link';
import {serviceCandidates, onlineConsultationServiceId, type ServiceId} from './catalogue';

// Presentation metadata only. Names and mode eligibility remain in the catalogue.
const servicePresentation = {
  physiotherapy: {photo: '/physix/home-2026/service-physiotherapy.webp', marker: 'assessment', label: 'Physiotherapy'},
  'sports-rehabilitation': {photo: '/physix/home-2026/service-sports.webp', marker: 'sports', label: 'Sports rehab'},
  movement: {photo: '/physix/home-2026/service-mobility.webp', marker: 'mobility', label: 'Movement & mobility'},
} satisfies Record<ServiceId, {photo: string; marker: string; label: string}>;

export const homeServices = serviceCandidates.map(service => ({
  ...service,
  ...servicePresentation[service.id],
  href: bookingHref({service, step: 'time'}),
}));

export const homeServiceTiles = [
  ...homeServices,
  {
    id: 'online-programmes',
    name: 'Online programmes',
    label: 'Online programmes',
    photo: '/physix/home-2026/service-online.webp',
    marker: 'programmes',
    href: '/plans',
  },
] as const;

export const homeIssues = [
  {id: 'back', name: 'Back pain', photo: '/physix/home-2026/issue-back.webp', href: '/book?q=back'},
  {id: 'neck', name: 'Neck & shoulder', photo: '/physix/home-2026/issue-neck.webp', href: '/book?q=neck'},
  {id: 'knee', name: 'Knee pain', photo: '/physix/home-2026/issue-knee.webp', href: '/book?q=knee'},
  {id: 'sports', name: 'Sports injury', photo: '/physix/home-2026/issue-sports.webp', href: '/book?q=sports'},
] as const;

const onlineConsultation = serviceCandidates.find(service =>
  service.id === onlineConsultationServiceId && service.modes.some(mode => mode === 'online')
);

export const homeBookingLinks = {
  clinic: bookingHref({mode: 'in_clinic'}),
  online: bookingHref({mode: 'online'}),
  onlineTimes: onlineConsultation
    ? bookingHref({service: onlineConsultation, mode: 'online', step: 'time'})
    : bookingHref({mode: 'online'}),
};
