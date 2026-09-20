import type {ReactNode} from 'react';
import {Check} from 'lucide-react';
import styles from './booking-flow.module.css';

export function BookingProgress({step}: {step: number}) {
  return <ol className={styles.progress} aria-label="Booking progress">
    {['Service','Time','Review'].map((label, index) => <li key={label} aria-current={step === index ? 'step' : undefined} data-complete={index < step}>
      <span aria-hidden="true">{index < step ? <Check size={13}/> : index + 1}</span>{label}
    </li>)}
  </ol>;
}
export function BookingFooter({summary, children}: {summary: string; children: ReactNode}) {
  return <div className={styles.footer} data-booking-footer>
    <p aria-live="polite">{summary}</p>{children}
  </div>;
}
