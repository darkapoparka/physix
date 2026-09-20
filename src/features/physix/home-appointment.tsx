"use client";
import Link from 'next/link';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {ArrowRight} from 'lucide-react';
import type {AppointmentSummary} from '@/shared/physix/appointments';
import {AppointmentCard} from './appointment-card';
import styles from './appointments.module.css';

/** A small authorized projection; no patient identifiers, notes or check-ins enter public Home. */
export function HomeAppointment({appointment}: {appointment: AppointmentSummary | null}) {
  const router = useRouter(), [invalidated, setInvalidated] = useState<AppointmentSummary | null | undefined>(undefined);
  const [now] = useState(() => Date.now());
  useEffect(() => {
    const clear = () => {setInvalidated(appointment); router.refresh();};
    const restored = (event: PageTransitionEvent) => {if (event.persisted) clear();};
    const channel = typeof BroadcastChannel === 'undefined' ? null : new BroadcastChannel('physix-local-identity');
    if (channel) channel.onmessage = clear;
    window.addEventListener('pageshow', restored);
    return () => {channel?.close(); window.removeEventListener('pageshow', restored);};
  }, [appointment, router]);
  if (!appointment || invalidated === appointment) return null;
  return <section className={styles.homePreview} data-home-appointment aria-label="Next appointment">
    <div className={styles.previewLabel}><span>Next appointment</span><Link href="/care/appointments">All visits <ArrowRight size={14}/></Link></div>
    <AppointmentCard item={appointment} now={now} compact/>
  </section>;
}
