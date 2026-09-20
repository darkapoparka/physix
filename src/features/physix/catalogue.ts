// Candidates from Motion Makers. Not a published clinical/service catalogue.
export const serviceCandidates=[
 {id:'physiotherapy',name:'Physiotherapy',category:'Assessment & care',image:'/physix/editorial/manual.webp',modes:['in_clinic','online'],search:'physiotherapy back neck pain assessment'},
 {id:'sports-rehabilitation',name:'Sports rehabilitation',category:'Return to movement',image:'/physix/editorial/sports.webp',modes:['in_clinic'],search:'sports injury knee shoulder rehabilitation'},
 {id:'movement',name:'Movement & mobility',category:'Exercise & movement',image:'/physix/editorial/movement.webp',modes:['in_clinic','online'],search:'mobility posture movement flexibility exercise'},
] as const;
export type {VisitMode} from '@/shared/physix/booking-link';
export type ServiceId = typeof serviceCandidates[number]['id'];
// Explicit preview configuration, not an assumption about catalogue ordering.
export const onlineConsultationServiceId = 'physiotherapy' satisfies ServiceId;
