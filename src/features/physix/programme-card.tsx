import {Layers} from 'lucide-react';
import {MediaTile} from './editorial-media';
import media from './editorial-media.module.css';
import styles from './care-hub.module.css';
import type {Programme} from '@/shared/physix/programmes';

export function ProgrammeCard({programme,index=0}:{programme:Programme;index?:number}) {
  const label=programme.completed+' of '+programme.total+' sessions finished';
  return <MediaTile href={'/care/programmes/'+programme.id} title={programme.title}
    image={index%2?'sports':'movement'} badge="Assigned in care"
    detail={programme.total+(programme.total===1?' session':' sessions')+' · Version '+programme.version}
    label={'Open programme: '+programme.title}>
    <div className={media.completion}><span>{programme.total?label:'No active sessions'}</span>
      {programme.progress!==null&&<progress max={100} value={programme.progress} aria-label={label}/>}
    </div>
  </MediaTile>;
}
/** No duplicate photographic hero on the programme detail page. */
export function ProgrammeOverview({programme}:{programme:Programme}) {
  return <section className={styles.programmeSummary} aria-label="Programme summary">
    <span className={styles.summaryIcon}><Layers size={26} aria-hidden="true"/></span>
    <div><span className={styles.summaryLabel}>Assigned in care</span>
      <p>{programme.total?programme.completed+' of '+programme.total+' sessions finished':'No active sessions'}</p>
      {programme.progress!==null&&<progress max={100} value={programme.progress} aria-label={programme.completed+' of '+programme.total+' sessions finished'}/>}
      <small>Version {programme.version}</small>
    </div>
  </section>;
}
