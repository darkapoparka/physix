import {CareCard, type CareTone} from './care-card';
import type {Programme} from '@/shared/physix/programmes';
export function ProgrammeCard({programme, index = 0}: {programme: Programme; index?: number}) {
  const tones: CareTone[] = ['mint', 'sage', 'sand'];
  return <CareCard href={'/app/plans/' + programme.id} title={programme.title} art="assessment"
    tone={tones[index % tones.length]} badge="Assigned in care"
    detail={programme.total + (programme.total === 1 ? ' session' : ' sessions') + ' · Version ' + programme.version}
    completion={{value: programme.progress || 0, label: programme.completed + ' of ' + programme.total + ' sessions finished'}}
    label={'Open programme: ' + programme.title} sizes="(min-width: 1000px) 340px, (min-width: 700px) 44vw, 86vw" />;
}
