import type {Bootstrap,RelationshipDetail} from '@/shared/gymaf/contracts';
export type Appointment={id:string;offer_id:string;service_name:string;mode:'in_clinic'|'online';starts_at:string;ends_at:string;timezone:string;state:'confirmed'|'cancelled';payment_state:'not_required_local';patient_id:string};
export type ProgrammeRecord={id:string;relationshipId:string;versionId:string;version:number;title:string;scheduledIds:string[]};
export type LocalAccount={programmes:ProgrammeRecord[];account:Bootstrap;relationship:RelationshipDetail|null;appointments:Appointment[];environment:'local-test'};
export type ServiceOffer={id:string;name:string;modes:('in_clinic'|'online')[];duration_minutes:number};
export type AvailableSlot={startsAt:string;endsAt:string;timezone:string};
