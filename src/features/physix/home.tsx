import Link from 'next/link';
import {ArrowUpRight, CalendarDays, Video, Search, ArrowRight, Layers} from 'lucide-react';
import {Shell} from './shell';
import {CareCard, type CareTone} from './care-card';
import {Illustration, type IllustrationName} from './illustration';
import styles from './home.module.css';

type DiscoveryItem = {title: string; art: IllustrationName; service: string; tone: CareTone};
const services: readonly DiscoveryItem[] = [
  {title: 'Physiotherapy', art: 'assessment', service: 'physiotherapy', tone: 'mint'},
  {title: 'Sports rehab', art: 'sports', service: 'sports-rehabilitation', tone: 'sand'},
  {title: 'Movement & mobility', art: 'mobility', service: 'movement', tone: 'sage'},
];
const focusAreas: readonly DiscoveryItem[] = [
  {title: 'Back care', art: 'back', service: 'physiotherapy', tone: 'sage'},
  {title: 'Neck & shoulders', art: 'neck', service: 'physiotherapy', tone: 'sand'},
];
const bookingHref = (service: string) => '/book?' + new URLSearchParams({service, step: 'time'});

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
        <div className={styles.sectionHeading}>
          <h2 id="discovery-title">How we can help</h2>
          <Link href="/book">All services<ArrowUpRight size={16} aria-hidden="true" /></Link>
        </div>
        {preview ? <div className={styles.serviceRail} aria-label="Appointment services">
          {services.map((item, index) => <CareCard key={item.art} {...item}
            href={bookingHref(item.service)} label={item.title + ' — choose an appointment'}
            priority={index === 0} />)}
        </div> : <p className="px-note">The clinic is preparing its service catalogue.</p>}
      </section>
      {preview && <div className={styles.supporting}>
        <section aria-labelledby="focus-title">
          <div className={styles.sectionHeading}><h2 id="focus-title">Find your focus</h2></div>
          <div className={styles.focusGrid}>
            {focusAreas.map(item => <CareCard key={item.art} {...item} layout="row"
              href={bookingHref(item.service)} label={item.title + ' — choose an appointment'}
              sizes="(min-width: 1000px) 250px, (min-width: 700px) 23vw, 46vw" />)}
          </div>
        </section>
        <Link className={styles.online} data-care-card="online" data-tone="forest"
          href="/book?service=physiotherapy&mode=online&step=time" aria-label="Online consultation — choose an appointment">
          <div><Video size={23} aria-hidden="true" /><h2>Care, wherever<br />you are.</h2>
            <span>Online consultation<ArrowUpRight size={17} aria-hidden="true" /></span></div>
          <Illustration name="online" sizes="(min-width: 700px) 270px, 55vw" />
        </Link>
      </div>}
      <Link href="/app" className={styles.plan}>
        <span className={styles.planIcon}><Layers size={28} aria-hidden="true" /></span>
        <span><h2>Your care, all together.</h2><p>Your programmes, schedule and progress.</p></span>
        <ArrowUpRight size={21} aria-hidden="true" />
      </Link>
      <div className={styles.practical}>
        <Link href="/first-visit">Your first visit<ArrowUpRight size={16} aria-hidden="true" /></Link>
        <Link href="/about">About PhysiX<ArrowUpRight size={16} aria-hidden="true" /></Link>
      </div>
    </div>
  </Shell>;
}
