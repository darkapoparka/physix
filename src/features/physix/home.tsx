import Link from 'next/link';
import {ArrowRight, ArrowUpRight, CalendarDays, Search, Video} from 'lucide-react';
import type {HomeCareSummary} from '@/shared/physix/home-care';
import {homeCareSummary} from '@/shared/physix/home-care';
import {Shell} from './shell';
import {EditorialPhoto, type EditorialImage} from './editorial-media';
import {HomeCare} from './home-care';
import {HomeVisits, FirstVisitDetails} from './home-visits';
import styles from './home.module.css';

const services: readonly {title:string; image:EditorialImage; service:string; marker:string}[] = [
  {title:'Physiotherapy',image:'manual',service:'physiotherapy',marker:'assessment'},
  {title:'Sports rehab',image:'sports',service:'sports-rehabilitation',marker:'sports'},
  {title:'Movement & mobility',image:'movement',service:'movement',marker:'mobility'},
];

export function PublicHome({preview,care=homeCareSummary(null)}:{preview:boolean;care?:HomeCareSummary}) {
  return <Shell preview={preview} home>
    <div className={styles.home}>
      <section className={styles.masthead} aria-labelledby="home-title" data-home-masthead>
        {preview && <EditorialPhoto image="manual" priority className={styles.heroPhoto} sizes="(min-width:1200px) 1100px, 100vw"/>}
        <div className={styles.heroInner}><div className={styles.welcome}>
          <h1 id="home-title">Move better.<span>Every day.</span></h1>
          <form className={'px-search '+styles.search} action="/book" role="search">
            <Search size={19} aria-hidden="true"/><label className="sr-only" htmlFor="home-search">Search services</label>
            <input id="home-search" name="q" type="search" placeholder="What brings you here?" autoComplete="off"/>
            <button type="submit" aria-label="Search services"><ArrowRight size={19} aria-hidden="true"/></button>
          </form>
          <div className={styles.actions}>
            <Link href="/book?mode=in_clinic"><CalendarDays size={17} aria-hidden="true"/>Book a visit</Link>
            <Link href="/book?mode=online"><Video size={17} aria-hidden="true"/>Online consult</Link>          </div>
        </div></div>
      </section>
      <div className={styles.content}>
        <section className={styles.discovery} aria-labelledby="discovery-title">
          <div className={styles.sectionHeading}><h2 id="discovery-title">How we can help</h2>
            <Link href="/book">View all<ArrowUpRight size={15} aria-hidden="true"/></Link></div>
          {preview ? <div className={styles.serviceRail} data-home-collection="services" role="region" aria-label="Appointment services" tabIndex={0}>
            {services.map(item => <Link className={styles.service} key={item.service} data-media-tile={item.marker}
              href={'/book?'+new URLSearchParams({service:item.service,step:'time'})} aria-label={item.title+' — choose an appointment'}>
              <div className={styles.serviceMedia}><EditorialPhoto image={item.image} sizes="(min-width:1200px) 340px, (min-width:700px) 30vw, 52vw"/></div>
              <div className={styles.serviceTitle}><h3>{item.title}</h3><ArrowUpRight size={17} aria-hidden="true"/></div>
            </Link>)}
          </div> : <p className="px-note">The clinic is preparing its service catalogue.</p>}
        </section>
        <div className={styles.lower}>
          <section aria-labelledby="visit-title"><div className={styles.sectionHeading}><h2 id="visit-title">In person. Or online.</h2></div>
            <HomeVisits/>
          </section>
          <HomeCare summary={care}/>
        </div>
        <nav className={styles.practical} aria-label="Clinic information"><FirstVisitDetails/><Link href="/plans">Explore programmes<ArrowUpRight size={14}/></Link><Link href="/about">About PhysiX<ArrowUpRight size={14}/></Link></nav>
      </div>
    </div>
  </Shell>;
}
