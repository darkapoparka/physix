import Link from 'next/link';
import {ArrowRight, ArrowUpRight, Search} from 'lucide-react';
import {homeCareSummary, type HomeCareSummary} from '@/shared/physix/home-care';
import type {AppointmentSummary} from '@/shared/physix/appointments';
import {Shell} from './shell';
import {HomeAppointment} from './home-appointment';
import {EditorialPhoto} from './editorial-media';
import {HomeCare} from './home-care';
import {HomeVisits} from './home-visits';
import {homeServices, homeBookingLinks} from './home-content';
import styles from './home.module.css';

function HomeHero() {
  return (
    <section className={styles.masthead} aria-labelledby="home-title" data-home-masthead>
      <div className={styles.welcome}>
        <h1 id="home-title">Move better.<span>Every day.</span></h1>
        <p>Physiotherapy, in person or online.</p>
      </div>
      <div className={styles.heroControls}>
        <form className={styles.search} action="/book" role="search">
          <Search size={20} aria-hidden="true"/>
          <label className="sr-only" htmlFor="home-search">Search services</label>
          <input id="home-search" name="q" type="search" placeholder="Find a service" autoComplete="off"/>
          <button type="submit" aria-label="Search services"><ArrowRight size={20} aria-hidden="true"/></button>
        </form>
        <div className={styles.actions} aria-label="Book an appointment">
          <Link href={homeBookingLinks.clinic} data-home-booking="in_clinic">
            <span>Book a visit</span><ArrowUpRight size={18} aria-hidden="true"/>
          </Link>
          <Link href={homeBookingLinks.online} data-home-booking="online">
            <span>Online consult</span><ArrowUpRight size={18} aria-hidden="true"/>
          </Link>
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
        <Link href="/book">View all<ArrowRight size={17} aria-hidden="true"/></Link>
      </div>
      {preview ? (
        <div className={styles.serviceRail} data-home-collection="services" role="region" aria-label="Appointment services" tabIndex={0}>
          {homeServices.map((service, index) => (
            <Link className={styles.service} key={service.id} data-media-tile={service.marker}
              href={service.href} aria-label={service.name + ' — choose an appointment'}>
              <div className={styles.serviceMedia}>
                <EditorialPhoto image={service.photo} priority={index === 0}
                  sizes="(min-width: 1200px) 342px, (min-width: 600px) 30vw, 55vw"/>
              </div>
              <div className={styles.serviceCopy}>
                <h3>{service.name}</h3><ArrowUpRight size={18} aria-hidden="true"/>
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
      <div className={styles.home} data-home-reference="contrast-20260921" data-design-system="physix-v2">
        <HomeHero/>
        <div className={styles.content}>
          <HomeAppointment appointment={appointment}/>
          {hasProgramme && <HomeCare summary={care}/>}
          <ServiceDiscovery preview={preview}/>
          <div className={styles.closing} data-care-included={!hasProgramme || undefined}>
            {!hasProgramme && <HomeCare summary={care}/>}
            <HomeVisits/>
          </div>
        </div>
      </div>
    </Shell>
  );
}
