import Link from 'next/link';
import {CalendarDays, Check} from 'lucide-react';
import type {ScheduledWorkout} from '@/shared/gymaf/contracts';
import {monday} from '@/shared/gymaf/validation';
import styles from './care-week.module.css';

/** Fidelity's solid weekly panel, populated only by the patient's stored schedule. */
export function CareWeek({workouts, date}: {workouts: ScheduledWorkout[]; date: string}) {
  const start = monday(date);
  const days = Array.from({length: 7}, (_, index) => {
    const day = new Date(start + 'T12:00:00Z');
    day.setUTCDate(day.getUTCDate() + index);
    return day.toISOString().slice(0, 10);
  });
  const scheduled = workouts.filter(workout => workout.state !== 'canceled' && days.includes(workout.scheduled_date));
  const completed = scheduled.filter(workout => workout.state === 'completed').length;
  return <Link href="/app/schedule" className={styles.card} aria-label="View your saved exercise schedule">
    <div className={styles.heading}>
      <div><h3>Your week,<br />at a glance.</h3><p>{scheduled.length ? `${completed} of ${scheduled.length} scheduled sessions completed` : 'No sessions scheduled this week.'}</p></div>
      <CalendarDays size={30} aria-hidden="true" />
    </div>
    <div className={styles.calendar}>
      {days.map(day => {
        const entries = scheduled.filter(workout => workout.scheduled_date === day);
        const done = entries.length > 0 && entries.every(workout => workout.state === 'completed');
        const label = new Date(day + 'T12:00:00Z').toLocaleDateString('en-GB', {weekday: 'short', timeZone: 'UTC'});
        return <span key={day} data-today={day === date || undefined} data-scheduled={entries.length > 0 || undefined}>
          <small>{label}</small><b>{day.slice(-2)}</b>
          <span className={styles.marker}>{done ? <Check size={11} aria-hidden="true" /> : entries.length > 0 ? '·' : ''}</span>
          <span className="sr-only">{done ? 'Completed' : entries.length ? 'Scheduled' : 'No scheduled session'}</span>
        </span>;
      })}
    </div>
  </Link>;
}
