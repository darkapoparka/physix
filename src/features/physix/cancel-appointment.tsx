"use client";
import {useRef} from 'react';
import {LoaderCircle} from 'lucide-react';
import type {AppointmentSummary} from '@/shared/physix/appointments';
import {appointmentLabels} from '@/shared/physix/appointments';
import {useSavedCommand} from './local-api';
import {Sheet} from './ui';
import styles from './appointments.module.css';

export function CancelAppointment({item, onClose, onCancelled, hosted=false}: {hosted?:boolean;
  item: AppointmentSummary; onClose: () => void; onCancelled: () => void;
}) {
  const mutation = useSavedCommand(), keep = useRef<HTMLButtonElement>(null);
  const labels = appointmentLabels(item);
  async function cancel() {
    const result = await mutation.run('booking.cancel', {id: item.id});
    if (result) onCancelled();
  }
  return <Sheet title="Cancel this appointment?" onClose={onClose} dismissible={!mutation.busy} initialFocusRef={keep}>
    <div className={styles.cancelSummary}><strong>{item.service_name}</strong>
      <p>{labels.date}<br/>{labels.range} · {labels.zone}<br/>{labels.mode}</p>
    </div>
    <p className="px-note">{hosted?'This releases your reserved time.':'This releases the reserved time in the local test database. It does not send a clinic notification or issue a refund.'}</p>
    <div className={styles.cancelActions} aria-busy={mutation.busy}>
      <button ref={keep} type="button" className="button primary" disabled={mutation.busy} onClick={onClose}>Keep appointment</button>
      <button data-confirm-cancel type="button" className={'button ' + styles.danger} disabled={mutation.busy} onClick={() => void cancel()}>
        {mutation.busy && <LoaderCircle className={styles.spinner} size={17} aria-hidden="true"/>}
        {mutation.busy ? 'Cancelling…' : 'Yes, cancel appointment'}
      </button>
    </div>
    {mutation.busy && <p className={styles.note} role="status">Waiting for the saved cancellation…</p>}
    {mutation.error && <p className="px-error" role="alert">Cancellation was not confirmed. Retry the same request. {mutation.error}</p>}
  </Sheet>;
}
