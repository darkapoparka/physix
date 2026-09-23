import Image from 'next/image';
import Link from 'next/link';
import {
  CalendarDays,
  ChevronRight,
  Search,
  ArrowRight,
  ArrowUpRight,
  Video,
} from 'lucide-react';
import {homeCareSummary, type HomeCareSummary} from '@/shared/physix/home-care';
import type {AppointmentSummary} from '@/shared/physix/appointments';
import {Shell} from './shell';
import {HomeAppointment} from './home-appointment';
import {HomeCare} from './home-care';
import {HomeVisits} from './home-visits';
import {homeBookingLinks, homeIssues, homeServiceTiles} from './home-content';
import styles from './home.module.css';

function HomeSearch() {
  return <form className={styles.search} action="/book" role="search">
    <Search size={22} aria-hidden="true" />
    <label className="sr-only" htmlFor="home-search">Search services</label>
    <input id="home-search" name="q" type="search" placeholder="Search services" autoComplete="off" />
    <button type="submit" aria-label="Search services"><ArrowRight size={20} aria-hidden="true" /></button>
  </form>;
}

function HomeBookingActions() {
  return <div className={styles.actions} aria-label="Book an appointment">
    <Link href={homeBookingLinks.clinic} data-home-booking="in_clinic" aria-label="Book an in-clinic appointment">
      <span className={styles.actionIcon}><CalendarDays size={20} aria-hidden="true" /></span>
      <span className={styles.actionCopy}><strong>Book in clinic</strong></span>
    </Link>
    <Link href={homeBookingLinks.online} data-home-booking="online" aria-label="Book an online consultation">
      <span className={styles.actionIcon}><Video size={20} aria-hidden="true" /></span>
      <span className={styles.actionCopy}><strong>Book online</strong></span>
    </Link>
  </div>;
}

function HomeHero() {
  return <>
  <div className={styles.heroBackground}>
  <div className={styles.heroStage}>
    <section className={styles.masthead} aria-labelledby="home-title" data-home-masthead>
      <div className={styles.welcome}>
        <h1 id="home-title">How can we help?</h1>
      </div>
    </section>
    <HomeSearch />
    <HomeBookingActions />
  </div>
  </div>
  </>;
}
function SectionHeading({id, title}: {id: string; title: string}) {
  return <div className={styles.sectionHeading}>
    <h2 id={id}>{title}</h2>
  </div>;
}

function CommonIssues() {
  return (
    <section className={styles.issues} aria-labelledby="issues-title">
      <SectionHeading id="issues-title" title="Common issues" />
      <div className={styles.issueRail} data-home-issues role="region" aria-label="Common issues" tabIndex={0}>
        {homeIssues.map(issue => <Link className={styles.issueCard} href={issue.href} key={issue.id} data-home-issue={issue.id}>
          <span className={styles.cardLabel}><strong>{issue.name}</strong><ChevronRight size={19} aria-hidden="true" /></span>
        </Link>)}
      </div>
    </section>
  );
}

function ServiceDiscovery() {
  return (
    <section className={styles.discovery} aria-labelledby="services-title">
      <SectionHeading id="services-title" title="Our services" />
      <div className={styles.serviceGrid} data-home-collection="services" aria-label="Appointment services">
        {homeServiceTiles.map((service, index) => <Link
          className={styles.serviceCard}
          key={service.id}
          data-media-tile={service.marker}
          href={service.href}
          aria-label={service.label + (service.id === 'online-programmes' ? '' : ' — choose an appointment')}
        >
          <Image src={service.photo} alt="" aria-hidden="true" width={600} height={500} priority={index === 0}
            sizes="(min-width: 1000px) 540px, 50vw" />
          <span className={styles.cardLabel}><strong>{service.label}</strong><ArrowUpRight size={16} aria-hidden="true" /></span>
        </Link>)}
      </div>
    </section>
  );
}

type HomeProps = {preview: boolean; care?: HomeCareSummary; appointment?: AppointmentSummary | null};

export function PublicHome({preview, care = homeCareSummary(null), appointment = null}: HomeProps) {
  return (
    <Shell preview={preview} home>
      <div className={styles.home} data-home-reference="booking-aligned-20260923" data-design-system="physix-v2">
        <HomeHero />
        <div className={styles.content}>
          <ServiceDiscovery />
          <CommonIssues />
          <HomeAppointment appointment={appointment} />
          <HomeVisits />
          <HomeCare summary={care} compact />
        </div>
      </div>
    </Shell>
  );
}
