"use client";
import Link from 'next/link';
import {useState} from 'react';
import {MapPin, Video, ArrowRight, ArrowUpRight} from 'lucide-react';
import {Illustration, type IllustrationName} from './illustration';
import {Sheet} from './ui';
import styles from './home.module.css';

type VisitKind = 'in_clinic' | 'online';
const visits: readonly {kind: VisitKind; title: string; text: string; art: IllustrationName; action: string; info: string}[] = [
  {kind: 'in_clinic', title: 'Visit PhysiX', text: 'Meet in person at the rehabilitation centre.', art: 'back', action: 'Book in clinic', info: 'Location & visit details'},
  {kind: 'online', title: 'Meet online', text: 'A consultation by video, without the journey.', art: 'online', action: 'Book online', info: 'How online visits work'},
];

/** A visit modality is not a treatment or a purchased programme. */
export function HomeVisits({preview}: {preview: boolean}) {
  const [details, setDetails] = useState<VisitKind | null>(null);
  return <>
    <div className={styles.visitList}>
      {visits.map(visit => <article key={visit.kind} data-home-visit={visit.kind} className={styles.visitCard}>
        <div className={styles.visitMain}>
          <div className={styles.visitCopy}>
            <span className={styles.visitLabel}>{visit.kind === 'in_clinic' ? <MapPin size={17} aria-hidden="true"/> : <Video size={17} aria-hidden="true"/>}{visit.kind === 'in_clinic' ? 'In person' : 'Online'}</span>
            <h3>{visit.title}</h3><p>{visit.text}</p>
          </div>
          {preview && <Illustration name={visit.art} className={styles.visitArt} sizes="(min-width: 1000px) 220px, (min-width: 700px) 20vw, 43vw"/>}
        </div>
        <div className={styles.visitActions}>
          <Link href={visit.kind === 'online' ? '/book?service=physiotherapy&mode=online&step=time' : '/book?mode=in_clinic'}>{visit.action}<ArrowRight size={17} aria-hidden="true"/></Link>
          <button type="button" aria-haspopup="dialog" onClick={()=>setDetails(visit.kind)}>{visit.info}<ArrowUpRight size={15} aria-hidden="true"/></button>
        </div>
      </article>)}
    </div>
    {details && <Sheet title={details === 'in_clinic' ? 'Visiting PhysiX' : 'Your online appointment'} onClose={()=>setDetails(null)}>
      {details === 'in_clinic' ? <>
        <p className="px-note">The centre’s practical details have not yet been added to this preview.</p>
        <dl className={styles.visitFacts}>
          <div><dt>Address</dt><dd>Awaiting clinic confirmation</dd></div>
          <div><dt>Opening hours</dt><dd>Awaiting clinic confirmation</dd></div>
          <div><dt>Arrival & accessibility</dt><dd>Details to be supplied by the centre</dd></div>
        </dl>
        <p className="px-note">Directions will appear once the actual location is confirmed. No example map pin is being shown as the clinic.</p>
      </> : <>
        <p>Choose an online service and an available time. Review the appointment before reserving it.</p>
        <dl className={styles.visitFacts}>
          <div><dt>Appointment</dt><dd>A consultation by video</dd></div>
          <div><dt>Exercise plan</dt><dd>Separate from the appointment</dd></div>
          <div><dt>Video provider & joining details</dt><dd>Awaiting clinic confirmation</dd></div>
        </dl>
        <p className="px-note">Local test reservations do not create a video meeting or send an invitation.</p>
      </>}
      <Link className="button primary full" href={'/book?mode='+details} onClick={()=>setDetails(null)}>{details === 'in_clinic' ? 'Browse in-clinic times' : 'Browse online times'}<ArrowRight size={17}/></Link>
    </Sheet>}
  </>;
}
