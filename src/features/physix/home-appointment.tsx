"use client";
import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {type AppointmentSummary} from '@/shared/physix/appointments';
import styles from './appointments.module.css';
import {NextAppointmentCard} from './next-appointment-card';

/** A small authorized projection; no patient identifiers, notes or check-ins enter public Home. */
export function HomeAppointment({appointment}: {appointment: AppointmentSummary | null}) {
  const router = useRouter(), [invalidated, setInvalidated] = useState<AppointmentSummary | null | undefined>(undefined);
  useEffect(() => {
    const clear = () => {setInvalidated(appointment); router.refresh();};
    const restored = (event: PageTransitionEvent) => {if (event.persisted) clear();};
    const channel = typeof BroadcastChannel === 'undefined' ? null : new BroadcastChannel('physix-local-identity');
    if (channel) channel.onmessage = clear;
    window.addEventListener('pageshow', restored);
    return () => {channel?.close(); window.removeEventListener('pageshow', restored);};
  }, [appointment, router]);
  if (!appointment || invalidated === appointment) return null;
  return <section className={styles.homePreview} data-home-appointment aria-labelledby="home-appointment-title">
    <NextAppointmentCard appointment={appointment} titleId="home-appointment-title"/>
  </section>;
}
