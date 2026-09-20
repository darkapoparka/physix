import Link from 'next/link';
import {ArrowUpRight, CalendarDays, Video, Search, ArrowRight, Layers} from 'lucide-react';
import {Shell} from './shell';
import {CareCard, type CareTone} from './care-card';
import type {IllustrationName} from './illustration';
import type {VisitMode, serviceCandidates} from './catalogue';
import styles from './home.module.css';

export type HomeBrowse = 'services' | 'areas';
type DiscoveryItem = {
  title: string;
  art: IllustrationName;
  service: (typeof serviceCandidates)[number]['id'];
  tone: CareTone;
  mode?: VisitMode;
};
const discovery: Record<HomeBrowse, readonly DiscoveryItem[]> = {
  services: [
    {title: 'Physiotherapy', art: 'assessment', service: 'physiotherapy', tone: 'mint'},
    {title: 'Sports rehab', art: 'sports', service: 'sports-rehabilitation', tone: 'sand'},
    {title: 'Movement & mobility', art: 'mobility', service: 'movement', tone: 'sage'},
    {title: 'Online consultation', art: 'online', service: 'physiotherapy', mode: 'online', tone: 'forest'},
  ],
  areas: [
    {title: 'Back care', art: 'back', service: 'physiotherapy', tone: 'sage'},
    {title: 'Neck & shoulders', art: 'neck', service: 'physiotherapy', tone: 'sand'},
  ],
};

// Area choices are discovery entries for existing services, not new clinical offers.
function bookingHref(item: DiscoveryItem): string {
  return '/book?' + new URLSearchParams({
    service: item.service, step: 'time', ...(item.mode ? {mode: item.mode} : {}),
  });
}

export function PublicHome({preview, browse = 'services'}: {preview: boolean; browse?: HomeBrowse}) {
  return <Shell preview={preview}>
    <div className={styles.home}>
      <section className={styles.welcome}>
        <h1>Move better.<br/><span>Every day.</span></h1>
        <form className={'px-search ' + styles.search} action="/book" role="search">
          <Search size={19} aria-hidden="true"/>
          <label className="sr-only" htmlFor="home-search">Search services</label>
          <input id="home-search" name="q" type="search" placeholder="What brings you here?" autoComplete="off"/>
          <button type="submit" aria-label="Search services"><ArrowRight size={19} aria-hidden="true"/></button>
        </form>
        <div className={styles.actions}>
          <Link href="/book"><CalendarDays size={18} aria-hidden="true"/>Book a visit</Link>
          <Link href="/book?mode=online"><Video size={18} aria-hidden="true"/>Online consult</Link>
        </div>
      </section>
      <section className={styles.discovery} aria-labelledby="discovery-title">
        <div className={styles.sectionHeading}>
          <h2 id="discovery-title">How we can help</h2>
          <Link href="/book">All services<ArrowUpRight size={16} aria-hidden="true"/></Link>
        </div>
        {preview ? <>
          <nav className={styles.browse} aria-label="Browse care">
            <Link href="/" scroll={false} aria-current={browse === 'services' ? 'page' : undefined}>Services</Link>
            <Link href="/?browse=areas" scroll={false} aria-current={browse === 'areas' ? 'page' : undefined}>By area</Link>
          </nav>
          <div key={browse} className={styles.serviceRail} role="region"
            aria-label={browse === 'services' ? 'Appointment services' : 'Areas of care'} data-home-collection={browse}>
            {discovery[browse].map((item, index) => <CareCard key={item.art} {...item}
              className={styles.discoveryCard} href={bookingHref(item)}
              label={item.title + ' — choose an appointment'} priority={index === 0}
              sizes="(min-width: 1000px) 260px, (min-width: 700px) 44vw, 72vw"/>)}
          </div>
        </> : <p className="px-note">The clinic is preparing its service catalogue.</p>}
      </section>
      <Link href="/care/programmes" className={styles.plan} aria-label="Open my programmes">
        <span className={styles.planIcon}><Layers size={27} aria-hidden="true"/></span>
        <span><h2>Your care, all together.</h2><p>Plans, sessions and progress.</p></span>
        <span className={styles.planArrow}><ArrowUpRight size={19} aria-hidden="true"/></span>
      </Link>
      <div className={styles.practical}>
        <Link href="/first-visit">Your first visit<ArrowUpRight size={16} aria-hidden="true"/></Link>
        <Link href="/about">About PhysiX<ArrowUpRight size={16} aria-hidden="true"/></Link>
      </div>
    </div>
  </Shell>;
}
