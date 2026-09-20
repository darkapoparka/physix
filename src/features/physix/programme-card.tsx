import {CareCard, type CareTone} from './care-card';
import {Illustration} from './illustration';
import styles from './care-hub.module.css';
import type {Programme} from '@/shared/physix/programmes';
export function ProgrammeCard({programme, index = 0}: {programme: Programme; index?: number}) {
  const tones: CareTone[] = ['mint', 'sage', 'sand'];
  return <CareCard href={'/care/programmes/' + programme.id} title={programme.title} art="assessment"
    tone={tones[index % tones.length]} badge="Assigned in care" className={styles.programmeCover}
    detail={programme.total + (programme.total === 1 ? ' session' : ' sessions') + ' · Version ' + programme.version}
    completion={{value: programme.progress || 0, label: programme.completed + ' of ' + programme.total + ' sessions finished'}}
    label={'Open programme: ' + programme.title} sizes="(min-width: 1000px) 340px, (min-width: 700px) 44vw, 86vw" />;
}

/** Static detail summary, not a second link back to the page already open. */
export function ProgrammeOverview({programme}:{programme:Programme}) {
  return <section className={styles.programmeSummary} aria-label="Programme summary">
    <Illustration name="assessment" sizes="120px"/>
    <div><span className={styles.summaryLabel}>Assigned in care</span>
      <p>{programme.completed} of {programme.total} sessions finished</p>
      <progress max={100} value={programme.progress || 0} aria-label={programme.completed+' of '+programme.total+' sessions finished'}/>
      <small>Version {programme.version}</small>
    </div>
  </section>;
}
