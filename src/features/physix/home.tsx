import Link from 'next/link';
import {ArrowUpRight, CalendarDays, Video, Search, ArrowRight, Layers} from 'lucide-react';
import {Shell} from './shell';
import {CareCard, type CareTone} from './care-card';
import type {IllustrationName} from './illustration';
import type {VisitMode, serviceCandidates} from './catalogue';
import styles from './home.module.css';

type HomeService = {
  title: string;
  art: IllustrationName;
  service: (typeof serviceCandidates)[number]['id'];
  tone: CareTone;
  mode?: VisitMode;
};
const services: readonly HomeService[] = [
  {title: 'Physiotherapy', art: 'assessment', service: 'physiotherapy', tone: 'mint'},
  {title: 'Sports rehab', art: 'sports', service: 'sports-rehabilitation', tone: 'sand'},
  {title: 'Movement & mobility', art: 'mobility', service: 'movement', tone: 'sage'},
  {title: 'Online consultation', art: 'online', service: 'physiotherapy', mode: 'online', tone: 'forest'},
];

function bookingHref(item: HomeService): string {
  return '/book?' + new URLSearchParams({
    service: item.service, step: 'time', ...(item.mode ? {mode: item.mode} : {}),
  });
}

export function PublicHome({preview}: {preview: boolean}) {
  return <Shell preview={preview}>
    <div className={styles.home}>
      <section className={styles.welcome} aria-labelledby="home-title">
        <h1 id="home-title">Move better.<br/><span>Every day.</span></h1>
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
          <Link href="/book">All services<ArrowUpRight size={15} aria-hidden="true"/></Link>
        </div>
        {preview ? <div className={styles.serviceGrid} data-home-collection="services">
          {services.map((item, index) => <CareCard key={item.art} {...item}
            className={styles.discoveryCard} href={bookingHref(item)} headingLevel={3}
            label={item.title + ' — choose an appointment'} priority={index < 2}
            sizes="(min-width: 1160px) 250px, (min-width: 1000px) calc((100vw - 124px) / 4), calc((100vw - 52px) / 2)"/>)}
        </div> : <p className="px-note">The clinic is preparing its service catalogue.</p>}
      </section>
      <Link href="/care/programmes" className={styles.plan} aria-label="Open my programmes">
        <span className={styles.planIcon}><Layers size={25} aria-hidden="true"/></span>
        <span className={styles.planCopy}><h2>Your care, all together.</h2><p>Plans, sessions and progress.</p></span>
        <ArrowUpRight className={styles.planArrow} size={20} aria-hidden="true"/>
      </Link>
      <nav className={styles.practical} aria-label="Clinic information">
        <Link href="/first-visit">Your first visit<ArrowUpRight size={16} aria-hidden="true"/></Link>
        <Link href="/about">About PhysiX<ArrowUpRight size={16} aria-hidden="true"/></Link>
      </nav>
    </div>
  </Shell>;
}
