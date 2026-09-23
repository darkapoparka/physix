import Link from 'next/link';
import {ArrowUpRight} from 'lucide-react';
import {appointmentLabels, type AppointmentSummary} from '@/shared/physix/appointments';
import styles from './appointments.module.css';

/** Shared appointment emphasis for Home and Today; data is supplied by the authorized owner. */
export function NextAppointmentCard({appointment, titleId}: {appointment: AppointmentSummary; titleId?: string}) {
  const labels = appointmentLabels(appointment);
  return <Link href={'/care/appointments/' + appointment.id} className={styles.homeAppointment}
    data-appointment-id={appointment.id}
    aria-label={'View appointment: ' + appointment.service_name + ', ' + labels.date + ', ' + labels.time + ' ' + labels.zone + ', ' + labels.mode + ', ' + labels.duration + ' minutes'}>
    <div className={styles.homeAppointmentCopy}>
      <h2 id={titleId} className={styles.homeAppointmentTitle}>Next appointment</h2>
      <span className={styles.homeAppointmentService}>{appointment.service_name}</span>
      <span className={styles.homeAppointmentMeta}><span>{labels.mode}</span><span>{labels.duration} min</span></span>
    </div>
    <span className={styles.homeAppointmentDate} aria-hidden="true"><small>{labels.month}</small><b>{labels.day}</b></span>
    <span className={styles.homeAppointmentAction}>View visit <ArrowUpRight size={17} aria-hidden="true"/></span>
    <time className={styles.homeAppointmentTime} dateTime={appointment.starts_at}>{labels.time} {labels.zone}</time>
  </Link>;
}
