import Link from 'next/link';
import {ArrowUpRight} from 'lucide-react';
import type {ScheduledWorkout} from '@/shared/gymaf/contracts';
import {EditorialPhoto, type EditorialImage} from './editorial-media';
import styles from './editorial-media.module.css';

function cover(workout:ScheduledWorkout):EditorialImage {
  // Decorative sample covers only; these do not specify or demonstrate the prescribed exercises.
  return workout.prescription.dayOffset===2?'sports':'movement';
}
export function SessionFeature({workout,resumable=false}:{workout:ScheduledWorkout;resumable?:boolean}) {
  const date=new Date(workout.scheduled_date+'T12:00:00Z').toLocaleDateString('en-GB',{day:'numeric',month:'short',timeZone:'UTC'});
  return <Link href={'/care/workouts/'+workout.id} className={'px-today-card '+styles.feature} data-session-feature
    aria-label={'Open session: '+workout.prescription.title}>
    <div className={styles.featureImage}><EditorialPhoto image={cover(workout)} priority/></div>
    <span className={styles.featureBadge}>{resumable?'Continue session':workout.state==='completed'?'Recorded session':'Next session'}</span>
    <span className={styles.featureCue}><ArrowUpRight size={19} aria-hidden="true"/></span>
    <div className={styles.featureCopy}><h2>{workout.prescription.title}</h2>
      <p>{workout.prescription.exercises.length} exercises · {date}</p></div>
  </Link>;
}
export function SessionOverviewPhoto({workout}:{workout:ScheduledWorkout}) {
  return <figure className={styles.overviewMedia} style={{margin:0}}>
    <EditorialPhoto image={cover(workout)} priority/>
    <figcaption>Illustrative cover. Follow your practitioner’s written instructions below.</figcaption>
  </figure>;
}
