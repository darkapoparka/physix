import Link from 'next/link';
import {ArrowRight, CalendarDays, Search, Video} from 'lucide-react';
import {homeCareSummary, type HomeCareSummary} from '@/shared/physix/home-care';
import {Shell} from './shell';
import {HomeArtwork, type HomeArtworkName} from './home-artwork';
import {HomeCare} from './home-care';
import {HomeVisits, FirstVisitDetails} from './home-visits';
import styles from './home.module.css';

const services: readonly {title: string; detail: string; art: HomeArtworkName; service: string; marker: string}[] = [
  {title: 'Physiotherapy', detail: 'Recover. Move. Thrive.', art: 'service-physiotherapy', service: 'physiotherapy', marker: 'assessment'},
  {title: 'Sports rehab', detail: 'Get back stronger.', art: 'service-sports', service: 'sports-rehabilitation', marker: 'sports'},
  {title: 'Movement & mobility', detail: 'Move freely. Live fully.', art: 'service-mobility', service: 'movement', marker: 'mobility'},
];

export function PublicHome({preview, care = homeCareSummary(null)}: {preview: boolean; care?: HomeCareSummary}) {
  return <Shell preview={preview} home>
    <div className={styles.home} data-home-reference="imagegen-20260920">
      <section className={styles.masthead} aria-labelledby="home-title" data-home-masthead>
        {preview && <HomeArtwork name="hero" priority className={styles.heroPhoto}/>}
        <div className={styles.heroInner}>
          <div className={styles.welcome}>
            <h1 id="home-title">Move better.<span>Every day.</span></h1>
            <p className={styles.intro}>{preview ? 'Expert care. A stronger, healthier you.' : 'Physiotherapy and rehabilitation.'}</p>
          </div>
          <div className={styles.heroControls}>
            <form className={'px-search ' + styles.search} action="/book" role="search">
              <Search size={21} aria-hidden="true"/><label className="sr-only" htmlFor="home-search">Search services</label>
              <input id="home-search" name="q" type="search" placeholder="What brings you here?" autoComplete="off"/>
              <button type="submit" aria-label="Search services"><ArrowRight size={21} aria-hidden="true"/></button>
            </form>
            <div className={styles.actions}>
              <Link href="/book?mode=in_clinic"><CalendarDays size={18} aria-hidden="true"/><span>Book a visit</span><ArrowRight size={17} aria-hidden="true"/></Link>
              <Link href="/book?mode=online"><Video size={18} aria-hidden="true"/><span>Online consult</span><ArrowRight size={17} aria-hidden="true"/></Link>
            </div>
          </div>
        </div>
      </section>
      <div className={styles.content}>
        <section className={styles.discovery} aria-labelledby="discovery-title">
          <div className={styles.sectionHeading}><h2 id="discovery-title">How we can help</h2>
            <Link href="/book">View all<ArrowRight size={17} aria-hidden="true"/></Link></div>
          {preview ? <div className={styles.serviceRail} data-home-collection="services" role="region" aria-label="Appointment services" tabIndex={0}>
            {services.map(item => <Link className={styles.service} key={item.service} data-media-tile={item.marker}
              href={'/book?' + new URLSearchParams({service: item.service, step: 'time'})} aria-label={item.title + ' — choose an appointment'}>
              <div className={styles.serviceMedia}><HomeArtwork name={item.art}/></div>
              <div className={styles.serviceCopy}><h3>{item.title}</h3><p>{item.detail}</p>
                <span className={styles.cardArrow}><ArrowRight size={18} aria-hidden="true"/></span></div>
            </Link>)}
          </div> : <p className="px-note">The clinic is preparing its service catalogue.</p>}
        </section>
        <section aria-labelledby="visit-title" className={styles.visits}>
          <div className={styles.sectionHeading}><h2 id="visit-title">In person. Or online.</h2></div>
          <HomeVisits preview={preview}/>
        </section>
        <HomeCare summary={care} preview={preview}/>
        <nav className={styles.practical} aria-label="Clinic information"><FirstVisitDetails/><Link href="/plans">Explore programmes<ArrowRight size={14}/></Link><Link href="/about">About PhysiX<ArrowRight size={14}/></Link></nav>
      </div>
    </div>
  </Shell>;
}
