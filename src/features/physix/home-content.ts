import {serviceCandidates, onlineConsultationServiceId, type ServiceId} from './catalogue';
import type {EditorialImage} from './editorial-media';
import {bookingHref} from '@/shared/physix/booking-link';

// Presentation metadata only. Names, eligibility and search terms stay in the catalogue.
const servicePresentation = {
  physiotherapy: {photo: 'manual', marker: 'assessment'},
  'sports-rehabilitation': {photo: 'sports', marker: 'sports'},
  movement: {photo: 'movement', marker: 'mobility'},
} satisfies Record<ServiceId, {photo: EditorialImage; marker: string}>;

export const homeServices = serviceCandidates.map(service => ({
  ...service,
  ...servicePresentation[service.id],
  href: bookingHref({service, step: 'time'}),
}));

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
