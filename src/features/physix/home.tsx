import Link from 'next/link';
import {ArrowRight, CalendarDays, Search, Video} from 'lucide-react';
import {homeCareSummary, type HomeCareSummary} from '@/shared/physix/home-care';
import type {AppointmentSummary} from '@/shared/physix/appointments';
import {Shell} from './shell';
import {HomeAppointment} from './home-appointment';
import {HomeArtwork} from './home-artwork';
import {HomeCare} from './home-care';
import {HomeVisits, FirstVisitDetails} from './home-visits';
import {homeServices, homeBookingLinks} from './home-content';
import styles from './home.module.css';

function HomeHero({preview}: {preview: boolean}) {
  return (
    <section className={styles.masthead} aria-labelledby="home-title" data-home-masthead>
      {preview && <HomeArtwork name="hero" priority className={styles.heroPhoto}/>}
      <div className={styles.heroInner}>
        <div className={styles.welcome}>
          <h1 id="home-title">Move better.<span>Every day.</span></h1>
          <p className={styles.intro}>Physiotherapy, in person or online.</p>
        </div>
        <div className={styles.heroControls}>
          <form className={styles.search} action="/book" role="search">
            <Search size={20} aria-hidden="true"/>
            <label className="sr-only" htmlFor="home-search">Search services</label>
            <input id="home-search" name="q" type="search" placeholder="Find a service" autoComplete="off"/>
            <button type="submit" aria-label="Search services"><ArrowRight size={20} aria-hidden="true"/></button>
          </form>
          <div className={styles.actions}>
            <Link href={homeBookingLinks.clinic}><CalendarDays size={18} aria-hidden="true"/><span>Book a visit</span></Link>
            <Link href={homeBookingLinks.online}><Video size={18} aria-hidden="true"/><span>Online consult</span></Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceDiscovery({preview}: {preview: boolean}) {
  return (
    <section className={styles.discovery} aria-labelledby="discovery-title">
      <div className={styles.sectionHeading}>
        <h2 id="discovery-title">How we can help</h2>
        <Link href="/book">View all<ArrowRight size={16} aria-hidden="true"/></Link>
      </div>
      {preview ? (
        <div className={styles.serviceRail} data-home-collection="services" role="region" aria-label="Appointment services" tabIndex={0}>
          {homeServices.map(service => (
            <Link className={styles.service} key={service.id} data-media-tile={service.marker}
              href={service.href} aria-label={service.name + ' — choose an appointment'}>
              <div className={styles.serviceMedia}><HomeArtwork name={service.art}/></div>
              <div className={styles.serviceCopy}>
                <h3>{service.name}</h3>
                <p>{service.detail}</p>
                <span className={styles.cardArrow}><ArrowRight size={18} aria-hidden="true"/></span>
              </div>
            </Link>
          ))}
        </div>
      ) : <p className="px-note">The clinic is preparing its service catalogue.</p>}
    </section>
  );
}

type HomeProps = {preview: boolean; care?: HomeCareSummary; appointment?: AppointmentSummary | null};

export function PublicHome({preview, care = homeCareSummary(null), appointment = null}: HomeProps) {
  const hasProgramme = care.state === 'assigned';
  return (
    <Shell preview={preview} home>
      <div className={styles.home} data-home-reference="imagegen-20260920" data-design-system="physix-v1">
        <HomeHero preview={preview}/>
        <div className={styles.content}>
          <HomeAppointment appointment={appointment}/>
          {hasProgramme && <HomeCare summary={care} preview={preview}/>}
          <ServiceDiscovery preview={preview}/>
          <section aria-labelledby="visit-title" className={styles.visits}>
            <div className={styles.sectionHeading}><h2 id="visit-title">In person. Or online.</h2></div>
            <HomeVisits preview={preview}/>
          </section>
          {!hasProgramme && <HomeCare summary={care} preview={preview}/>}
          <nav className={styles.practical} aria-label="Clinic information">
            <FirstVisitDetails/>
            <Link href="/plans">Explore programmes<ArrowRight size={16} aria-hidden="true"/></Link>
            <Link href="/about">About PhysiX<ArrowRight size={16} aria-hidden="true"/></Link>
          </nav>
        </div>
      </div>
    </Shell>
  );
}
