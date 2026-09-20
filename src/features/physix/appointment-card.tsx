import Link from 'next/link';
import {ArrowRight, CalendarDays, Check, Video, MapPin} from 'lucide-react';
import {appointmentLabels, appointmentBucket, appointmentStatus, type AppointmentSummary} from '@/shared/physix/appointments';
import styles from './appointments.module.css';

export function AppointmentCard({item, now, compact = false}: {item: AppointmentSummary; now: number; compact?: boolean}) {
  const labels = appointmentLabels(item), bucket = appointmentBucket(item, now);
  return <Link href={'/care/appointments/' + item.id} className={styles.card + ' px-care-appointment' + (compact ? ' ' + styles.preview : '')}
    data-appointment-id={item.id} aria-label={'View appointment: ' + item.service_name + ', ' + labels.date + ', ' + labels.time + ' ' + labels.zone}>
    <div className={styles.cardMain}>
      <span className={styles.dateTile} aria-hidden="true"><small>{labels.month}</small><b>{labels.day}</b></span>
      <div className={styles.cardCopy}><h2>{item.service_name}</h2>
        <p><time dateTime={item.starts_at}>{labels.time}</time> · {labels.duration} min · {labels.zone}</p>
        <p>{item.mode === 'online' ? <Video size={14} aria-hidden="true"/> : <MapPin size={14} aria-hidden="true"/>}{labels.mode}</p>
      </div>
    </div>
    <div className={styles.cardFooter}>
      <span className={styles.status} data-state={bucket}>{bucket === 'upcoming' ? <Check size={14} aria-hidden="true"/> : <CalendarDays size={14} aria-hidden="true"/>}{appointmentStatus(item, now)}</span>
      <span>View appointment<ArrowRight size={16} aria-hidden="true"/></span>
    </div>
  </Link>;
}
