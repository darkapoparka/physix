import {serviceCandidates, onlineConsultationServiceId, type ServiceId} from './catalogue';
import type {HomeArtworkName} from './home-artwork';
import {bookingHref} from '@/shared/physix/booking-link';

// Presentation metadata only. Names, eligibility and search terms stay in the catalogue.
const servicePresentation = {
  physiotherapy: {art: 'service-physiotherapy', marker: 'assessment'},
  'sports-rehabilitation': {art: 'service-sports', marker: 'sports'},
  movement: {art: 'service-mobility', marker: 'mobility'},
} satisfies Record<ServiceId, {art: HomeArtworkName; marker: string}>;

export const homeServices = serviceCandidates.map(service => ({
  ...service,
  ...servicePresentation[service.id],
  detail: service.modes.length > 1 ? 'Clinic + online' : 'In clinic',
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
