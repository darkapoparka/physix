"use client";
import Link from 'next/link';
import {useState} from 'react';
import {ArrowRight, ArrowUpRight, MapPin, Video} from 'lucide-react';
import {Sheet} from './ui';
import styles from './home.module.css';

type VisitKind = 'in_clinic' | 'online';
function VisitInformation({kind,onClose}:{kind:VisitKind;onClose:()=>void}) {
  const clinic = kind === 'in_clinic';
  return <Sheet title={clinic?'Visiting PhysiX':'Your online appointment'} onClose={onClose}>
    <p>{clinic?'Plan your visit to the centre.':'Choose a video consultation and a time that works for you.'}</p>
    <dl className={styles.visitFacts}>
      {clinic ? <><div><dt>Address</dt><dd>Awaiting clinic confirmation</dd></div><div><dt>Opening hours</dt><dd>Awaiting clinic confirmation</dd></div><div><dt>Arrival & accessibility</dt><dd>Details to be supplied by the centre</dd></div></>
        : <><div><dt>Appointment</dt><dd>A consultation by video</dd></div><div><dt>Exercise plan</dt><dd>Separate from the appointment</dd></div><div><dt>Joining details</dt><dd>Awaiting clinic confirmation</dd></div></>}
    </dl>
    <p className="px-note">{clinic?'Preview imagery is illustrative, not the actual centre or Charlie. Directions will appear when the address is confirmed.':'Local test reservations do not create a video meeting or send an invitation.'}</p>
    <Link className="button primary full" href={'/book?mode='+kind} onClick={onClose}>{clinic?'Browse in-clinic times':'Browse online times'}<ArrowRight size={17}/></Link>
  </Sheet>;
}

export function HomeVisits() {
  const [details,setDetails] = useState<VisitKind|null>(null);
  return <><div className={styles.visitList}>
    <article className={styles.visitRow} data-home-visit="in_clinic">
      <span className={styles.visitIcon}><MapPin size={22} aria-hidden="true"/></span>
      <div><h3>Visit PhysiX</h3><p>Physiotherapy at the centre.</p><button type="button" aria-haspopup="dialog" onClick={()=>setDetails('in_clinic')}>Location & hours<ArrowUpRight size={13}/></button></div>
      <Link href="/book?mode=in_clinic" aria-label="Book in clinic"><ArrowRight size={18}/></Link>
    </article>    <article className={styles.visitRow} data-home-visit="online">
      <span className={styles.visitIcon}><Video size={22} aria-hidden="true"/></span>
      <div><h3>Meet online</h3><p>A consultation by video.</p><button type="button" aria-haspopup="dialog" onClick={()=>setDetails('online')}>How it works<ArrowUpRight size={13}/></button></div>
      <Link href="/book?service=physiotherapy&mode=online&step=time" aria-label="Book online"><ArrowRight size={18}/></Link>
    </article>
  </div>{details && <VisitInformation kind={details} onClose={()=>setDetails(null)}/>}</>;
}

export function FirstVisitDetails() {
  const [open,setOpen] = useState(false);
  return <><button type="button" aria-haspopup="dialog" onClick={()=>setOpen(true)}>Your first visit<ArrowUpRight size={14}/></button>
    {open && <Sheet title="Your first visit" onClose={()=>setOpen(false)}><div className={styles.questions}>
      <section><h3>Getting started</h3><p>Explore services and choose an in-clinic or online appointment without signing in first.</p></section>
      <section><h3>Your exercise programme</h3><p>An appointment and an exercise programme are separate. Assigned programmes and saved sessions appear in My care.</p></section>
      <section><h3>Before you arrive</h3><p>The centre’s address, accessibility information and arrival instructions are awaiting confirmation.</p></section>
      <Link className="button primary" href="/book" onClick={()=>setOpen(false)}>Find an appointment<ArrowRight size={17}/></Link>
    </div></Sheet>}
  </>;
}
