import Link from 'next/link';
import {ArrowUpRight, CalendarDays, Video, Search, ArrowRight, Layers, Activity, ChevronDown} from 'lucide-react';
import {Shell} from './shell';
import {CareCard, type CareTone} from './care-card';
import {HomeVisits} from './home-visits';
import type {IllustrationName} from './illustration';
import type {serviceCandidates} from './catalogue';
import styles from './home.module.css';

type HomeService = {
  title: string; art: IllustrationName;
  service: (typeof serviceCandidates)[number]['id']; tone: CareTone;
};
const services: readonly HomeService[] = [
  {title: 'Physiotherapy', art: 'assessment', service: 'physiotherapy', tone: 'mint'},
  {title: 'Sports rehab', art: 'sports', service: 'sports-rehabilitation', tone: 'sand'},
  {title: 'Movement & mobility', art: 'mobility', service: 'movement', tone: 'sage'},
];

export function PublicHome({preview}: {preview: boolean}) {
  return <Shell preview={preview}>
    <div className={styles.home}>
      <section className={styles.welcome} aria-labelledby="home-title">
        <p className={styles.identity}>Physiotherapy & rehabilitation</p>
        <h1 id="home-title">Move better.<br/><span>Every day.</span></h1>
        <form className={'px-search ' + styles.search} action="/book" role="search">
          <Search size={19} aria-hidden="true"/>
          <label className="sr-only" htmlFor="home-search">Search services</label>
          <input id="home-search" name="q" type="search" placeholder="What brings you here?" autoComplete="off"/>
          <button type="submit" aria-label="Search services"><ArrowRight size={19} aria-hidden="true"/></button>
        </form>
        <div className={styles.actions}>
          <Link href="/book?mode=in_clinic"><CalendarDays size={18} aria-hidden="true"/>Book a visit</Link>
          <Link href="/book?mode=online"><Video size={18} aria-hidden="true"/>Online consult</Link>
        </div>
      </section>
      <section className={styles.discovery} aria-labelledby="discovery-title">
        <div className={styles.sectionHeading}>
          <h2 id="discovery-title">How we can help</h2>
          <Link href="/book">All services<ArrowUpRight size={15} aria-hidden="true"/></Link>
        </div>
        {preview ? <div className={styles.serviceRail} data-home-collection="services"
          role="region" aria-label="Appointment services" tabIndex={0}>
          {services.map((item, index) => <CareCard key={item.art} {...item}
            className={styles.discoveryCard} headingLevel={3}
            href={'/book?' + new URLSearchParams({service: item.service, step: 'time'})}
            label={item.title + ' — choose an appointment'} priority={index === 0}
            sizes="(min-width: 1160px) 340px, (min-width: 700px) 30vw, 68vw"/>)}
        </div> : <p className="px-note">The clinic is preparing its service catalogue.</p>}
      </section>
      <section aria-labelledby="visit-title" className={styles.visits}>
        <div className={styles.sectionHeading}><h2 id="visit-title">At the centre. Or online.</h2></div>
        <HomeVisits preview={preview}/>
      </section>
      <section className={styles.care} aria-labelledby="home-care-title">
        <div className={styles.careHeading}><Layers size={24} aria-hidden="true"/><span>Between appointments</span></div>
        <h2 id="home-care-title">Your plan, with you.</h2>
        <p>Open your exercises, pick up a saved session and see your progress.</p>
        <div className={styles.careTools} aria-label="Patient care features">
          <span><Layers size={17} aria-hidden="true"/>Your plans</span>
          <span><CalendarDays size={17} aria-hidden="true"/>Your schedule</span>
          <span><Activity size={17} aria-hidden="true"/>Your progress</span>
        </div>
        <div className={styles.careActions}>
          <Link href="/care/programmes" aria-label="Open my programmes">Open my programmes<ArrowRight size={18} aria-hidden="true"/></Link>
          <Link href="/plans">Explore programmes<ArrowUpRight size={16} aria-hidden="true"/></Link>
        </div>
      </section>
      <section className={styles.questions} aria-labelledby="first-visit-title">
        <div className={styles.sectionHeading}><h2 id="first-visit-title">Before your first visit</h2></div>
        <details><summary>Do I need an account to get started?<ChevronDown size={17} aria-hidden="true"/></summary>
          <p>You can explore services and choose a time without signing in. Your saved appointments, plans and exercise history stay in My care.</p>
        </details>
        <details><summary>Is an online appointment an exercise plan?<ChevronDown size={17} aria-hidden="true"/></summary>
          <p>No. An online appointment is a consultation by video. An exercise programme is a separate plan you follow in My care; it is not automatically included in an appointment.</p>
        </details>
        <details><summary>Where will my exercises appear?<ChevronDown size={17} aria-hidden="true"/></summary>
          <p>A programme appears in My care after it has been assigned to your account. Open it to see its sessions, record your exercises and return to saved progress.</p>
        </details>
      </section>
      <nav className={styles.practical} aria-label="Clinic information">
        <Link href="/first-visit">Your first visit<ArrowUpRight size={16} aria-hidden="true"/></Link>
        <Link href="/about">About PhysiX<ArrowUpRight size={16} aria-hidden="true"/></Link>
      </nav>
    </div>
  </Shell>;
}
