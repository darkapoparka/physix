"use client";
import Link from 'next/link';
import {useState} from 'react';
import {ArrowRight, ArrowUpRight, MapPin, Video} from 'lucide-react';
import {Sheet} from './ui';
import {HomeArtwork} from './home-artwork';
import {homeBookingLinks} from './home-content';
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
    <Link className="button primary full" href={kind === 'in_clinic' ? homeBookingLinks.clinic : homeBookingLinks.online} onClick={onClose}>{clinic?'Browse in-clinic times':'Browse online times'}<ArrowRight size={17}/></Link>
  </Sheet>;
}

export function HomeVisits({preview = false}: {preview?: boolean}) {
  const [details, setDetails] = useState<VisitKind | null>(null);
  const items = [
    {kind: 'in_clinic' as const, title: 'In clinic', icon: MapPin, art: 'visit-centre' as const, href: homeBookingLinks.clinic, action: 'Book a visit', label: 'In clinic — Book a visit', details: 'Visit details'},
    {kind: 'online' as const, title: 'Online consult', icon: Video, art: 'visit-online' as const, href: homeBookingLinks.onlineTimes, action: 'Book online', label: 'Online consult — Book online', details: 'How it works'},
  ];
  return <>
    <div className={styles.visitList}>
      {items.map(({kind, title, icon: Icon, art, href, action, label, details: detailLabel}) => (
        <article className={styles.visitCard} data-home-visit={kind} key={kind}>
          {preview && <HomeArtwork name={art} className={styles.visitPhoto}/>}
          <Link className={styles.visitBook} href={href} aria-label={label}>
            <span className={styles.visitIcon}><Icon size={20} aria-hidden="true"/></span>
            <h3>{title}</h3>
            <span className={styles.visitAction}>{action}<ArrowRight size={16} aria-hidden="true"/></span>
          </Link>
          <button type="button" className={styles.visitDetails} aria-haspopup="dialog"
            aria-label={detailLabel + (kind === 'in_clinic' ? ' — location and access' : ' — online visits')} onClick={() => setDetails(kind)}>
            {detailLabel}<ArrowUpRight size={14} aria-hidden="true"/>
          </button>
        </article>
      ))}
    </div>
    {details && <VisitInformation kind={details} onClose={() => setDetails(null)}/>}
  </>;
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
