import Link from 'next/link';
import {ArrowUpRight, CalendarDays, Video, Search, ArrowRight, Layers} from 'lucide-react';
import {Shell} from './shell';
import {Illustration, type IllustrationName} from './illustration';
import styles from './home.module.css';

const discovery: {title: string; art: IllustrationName; service: string; mode?: 'online'; tone: string}[] = [
  {title: 'Physiotherapy', art: 'assessment', service: 'physiotherapy', tone: 'mint'},
  {title: 'Sports rehab', art: 'sports', service: 'sports-rehabilitation', tone: 'sand'},
  {title: 'Back care', art: 'back', service: 'physiotherapy', tone: 'sage'},
  {title: 'Neck & shoulders', art: 'neck', service: 'physiotherapy', tone: 'stone'},
  {title: 'Movement & mobility', art: 'mobility', service: 'movement', tone: 'sage'},
  {title: 'Online consultation', art: 'online', service: 'physiotherapy', mode: 'online', tone: 'mint'},
];

export function PublicHome({preview}: {preview: boolean}) {
  return <Shell preview={preview}>
    <div className={styles.home}>
      <section className={styles.welcome}>
        <h1>Move better.<br /><span>Every day.</span></h1>
        <form className={'px-search ' + styles.search} action="/book" role="search">
          <Search size={19} aria-hidden="true" />
          <label className="sr-only" htmlFor="home-search">Search services</label>
          <input id="home-search" name="q" type="search" placeholder="What brings you here?" autoComplete="off" />
          <button type="submit" aria-label="Search services"><ArrowRight size={19} aria-hidden="true" /></button>
        </form>
        <div className={styles.actions}>
          <Link href="/book"><CalendarDays size={18} aria-hidden="true" />Book a visit</Link>
          <Link href="/book?mode=online"><Video size={18} aria-hidden="true" />Online consult</Link>
        </div>
      </section>
      <section className={styles.discovery} aria-labelledby="discovery-title">
        <div className={styles.sectionHeading}><h2 id="discovery-title">How we can help</h2><Link href="/book">All services<ArrowUpRight size={16} aria-hidden="true" /></Link></div>
        {preview ? <div className={styles.cards}>
          {discovery.map((item, index) => <Link key={item.art} className={styles.card} data-tone={item.tone}
            href={'/book?' + new URLSearchParams({service: item.service, step: 'time', ...(item.mode ? {mode: item.mode} : {})})}
            aria-label={item.title + ' — choose an appointment'}>
            <span className={styles.art}><Illustration name={item.art} priority={index < 2} /></span>
            <span className={styles.cardTitle}>{item.title}<ArrowUpRight size={17} aria-hidden="true" /></span>
          </Link>)}
        </div> : <p className="px-note">The clinic is preparing its service catalogue.</p>}
      </section>
      <Link href="/app" className={styles.plan}>
        <span className={styles.planIcon}><Layers size={26} aria-hidden="true" /></span>
        <span><h2>Your plan, with you.</h2><p>Exercises. Appointments. Progress.</p></span>
        <ArrowUpRight size={21} aria-hidden="true" />
      </Link>
      <div className={styles.practical}><Link href="/first-visit">Your first visit<ArrowUpRight size={16} /></Link><Link href="/about">About PhysiX<ArrowUpRight size={16} /></Link></div>
    </div>
  </Shell>;
}
