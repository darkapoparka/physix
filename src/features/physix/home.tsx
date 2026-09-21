import Image from 'next/image';
import Link from 'next/link';
import {
  CalendarDays,
  ChevronRight,
  Search,
  SlidersHorizontal,
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

function HomeHero() {
  return (
    <div className={styles.heroStage}>
      <section className={styles.masthead} aria-labelledby="home-title" data-home-masthead>
        <Image
          className={styles.heroImage}
          src="/physix/home-2026/hero.webp"
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="(min-width: 1000px) 1200px, 100vw"
        />
        <div className={styles.heroShade} aria-hidden="true" />
        <div className={styles.welcome}>
          <h1 id="home-title">Move better.<span>Live more.</span></h1>
          <p>Expert physiotherapy.<br />In clinic or online.</p>
        </div>
        <form className={styles.search} action="/book" role="search">
          <Search size={22} aria-hidden="true" />
          <label className="sr-only" htmlFor="home-search">Search services</label>
          <input
            id="home-search"
            name="q"
            type="search"
            placeholder="Search conditions, treatments or services…"
            autoComplete="off"
          />
          <button type="submit" aria-label="Search services">
            <SlidersHorizontal size={20} aria-hidden="true" />
          </button>
        </form>
      </section>
      <div className={styles.actions} aria-label="Book an appointment">
        <Link href={homeBookingLinks.clinic} data-home-booking="in_clinic">
          <span className={styles.actionIcon}><CalendarDays size={23} aria-hidden="true" /></span>
          <span className={styles.actionCopy}><strong>Book a visit</strong><small>In-clinic appointment</small></span>
          <span className={styles.actionCue}><ChevronRight size={22} aria-hidden="true" /></span>
        </Link>
        <Link href={homeBookingLinks.online} data-home-booking="online">
          <span className={styles.actionIcon}><Video size={23} aria-hidden="true" /></span>
          <span className={styles.actionCopy}><strong>Online consult</strong><small>From anywhere</small></span>
          <span className={styles.actionCue}><ChevronRight size={22} aria-hidden="true" /></span>
        </Link>
      </div>
    </div>
  );
}

function SectionHeading({id, title, href}: {id: string; title: string; href: string}) {
  return <div className={styles.sectionHeading}>
    <h2 id={id}>{title}</h2>
    <Link href={href}>View all<ChevronRight size={17} aria-hidden="true" /></Link>
  </div>;
}

function CommonIssues() {
  return (
    <section className={styles.issues} aria-labelledby="issues-title">
      <SectionHeading id="issues-title" title="Common issues" href="/book" />
      <div className={styles.issueRail} data-home-issues role="region" aria-label="Common issues" tabIndex={0}>
        {homeIssues.map(issue => <Link className={styles.issueCard} href={issue.href} key={issue.id} data-home-issue={issue.id}>
          <Image src={issue.photo} alt="" aria-hidden="true" fill sizes="(min-width: 1000px) 240px, 38vw" />
          <span className={styles.mediaShade} aria-hidden="true" />
          <span className={styles.cardLabel}><strong>{issue.name}</strong><ChevronRight size={19} aria-hidden="true" /></span>
        </Link>)}
      </div>
    </section>
  );
}

function ServiceDiscovery({preview}: {preview: boolean}) {
  return (
    <section className={styles.discovery} aria-labelledby="services-title">
      <SectionHeading id="services-title" title="Our services" href="/book" />
      {preview ? <div className={styles.serviceGrid} data-home-collection="services" aria-label="Appointment services">
        {homeServiceTiles.map((service, index) => <Link
          className={styles.serviceCard}
          key={service.id}
          data-media-tile={service.marker}
          href={service.href}
          aria-label={service.label + (service.id === 'online-programmes' ? '' : ' — choose an appointment')}
        >
          <Image src={service.photo} alt="" aria-hidden="true" fill priority={index === 0}
            sizes="(min-width: 1000px) 540px, 50vw" />
          <span className={styles.mediaShade} aria-hidden="true" />
          <span className={styles.cardLabel}><strong>{service.label}</strong><ChevronRight size={19} aria-hidden="true" /></span>
        </Link>)}
      </div> : <p className={styles.unavailable}>The clinic is preparing its service catalogue.</p>}
    </section>
  );
}

type HomeProps = {preview: boolean; care?: HomeCareSummary; appointment?: AppointmentSummary | null};

export function PublicHome({preview, care = homeCareSummary(null), appointment = null}: HomeProps) {
  const hasProgramme = care.state === 'assigned';
  return (
    <Shell preview={preview} home>
      <div className={styles.home} data-home-reference="dark-app-20260921" data-design-system="physix-v2">
        <HomeHero />
        <div className={styles.content}>
          <HomeAppointment appointment={appointment} />
          {hasProgramme && <HomeCare summary={care} />}
          <CommonIssues />
          <ServiceDiscovery preview={preview} />
          {!hasProgramme && <HomeCare summary={care} />}
          <HomeVisits />
        </div>
      </div>
    </Shell>
  );
}
