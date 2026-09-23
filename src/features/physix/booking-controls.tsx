import type {ReactNode} from 'react';
import styles from './booking-flow.module.css';

export function BookingFooter({summary, children}: {summary: string; children: ReactNode}) {
  return <div className={styles.footer} data-booking-footer>
    <p aria-live="polite">{summary}</p>{children}
  </div>;
}
