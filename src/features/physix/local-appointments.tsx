"use client";
import Link from 'next/link';
import {useEffect, useRef, useState} from 'react';
import {useRouter, useSearchParams} from 'next/navigation';
import {ArrowRight, CalendarDays, CalendarPlus, Check, X} from 'lucide-react';
import type {LocalAccount} from '@/shared/physix/contracts';
import {appointmentBucket, appointmentCalendar, appointmentLabels, appointmentStatus, appointmentView, bookAgainHref, canCancelAppointment, sortedAppointments, type AppointmentView} from '@/shared/physix/appointments';
import {ContextHeader} from './context-header';
import {Shell} from './shell';
import {SavedPending} from './local-patient';
import {AppointmentCard} from './appointment-card';
import {CancelAppointment} from './cancel-appointment';
import {useSavedResource} from './local-api';
import styles from './appointments.module.css';

export function LocalAppointments({id, initialAccount, confirmation = false}: {id?: string; initialAccount: LocalAccount; confirmation?: boolean}) {
  const resource = useSavedResource<LocalAccount>('me', initialAccount);
  const params = useSearchParams(), router = useRouter();
  const [now, setNow] = useState(() => Date.now());
  const [cancelOpen, setCancelOpen] = useState(false), [cancelledId, setCancelledId] = useState('');
  const [calendarError, setCalendarError] = useState('');
  const titleRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {const timer = setInterval(() => setNow(Date.now()), 30000); return () => clearInterval(timer);}, []);
  const view = appointmentView(params.get('view'));
  if (!resource.data) return <Shell local contextual><ContextHeader title="Appointments" back={{href:'/care', label:'Back to My care'}}/>
    <SavedPending error={resource.error} reload={resource.reload}/></Shell>;
  const appointments = resource.data.appointments;
  const stored = appointments.find(item => item.id === id);
  // Update only after the server acknowledges cancellation; a request alone never changes the status.
  const item = stored && cancelledId === stored.id ? {...stored, state: 'cancelled' as const} : stored;
  const labels = item && appointmentLabels(item), bucket = item && appointmentBucket(item, now);
  const created = confirmation && item?.state === 'confirmed' && bucket === 'upcoming';
  const heading = !id ? 'Appointments' : created ? 'Test visit reserved.' : 'Appointment';
  function chooseView(next: AppointmentView) {
    const url = new URL(window.location.href); url.searchParams.set('view', next);
    window.history.pushState(null, '', url.pathname + url.search);
  }
  function exportCalendar() {
    if (!item) return;
    try {
      const url = URL.createObjectURL(new Blob([appointmentCalendar(item, new Date())], {type:'text/calendar;charset=utf-8'}));
      const anchor = document.createElement('a'); anchor.href = url; anchor.download = 'physix-appointment.ics';
      document.body.appendChild(anchor); anchor.click(); anchor.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000);
      setCalendarError('');
    } catch {setCalendarError('The calendar file could not be created. Please try again.');}
  }
  return <Shell local contextual><div className={styles.page}>
    <ContextHeader title={heading} headingRef={titleRef}
      back={{href:id ? '/care/appointments?view=' + (bucket || 'upcoming') : '/care', label:id ? 'Back to appointments' : 'Back to My care'}}
      action={!id ? <Link href="/book" aria-label="Book an appointment"><CalendarPlus size={16} aria-hidden="true"/>Book</Link> : undefined}/>
    {!id ? <>
      <div className={styles.switcher} role="group" aria-label="Appointment views">
        {(['upcoming','past','cancelled'] as const).map(value => <button type="button" key={value}
          aria-pressed={view === value} onClick={() => chooseView(value)}>
          {value === 'upcoming' ? 'Upcoming' : value === 'past' ? 'Past' : 'Cancelled'}
          <small>{sortedAppointments(appointments, value, now).length}</small>
        </button>)}
      </div>
      <div className={styles.list}>
        {sortedAppointments(appointments, view, now).map(appointment => <AppointmentCard key={appointment.id} item={appointment} now={now}/>)}
      </div>
      {!sortedAppointments(appointments, view, now).length && <div className={styles.empty}>
        <CalendarDays size={30} aria-hidden="true"/><h2>{view === 'upcoming' ? 'No upcoming appointments' : view === 'cancelled' ? 'No cancelled appointments' : 'No past appointments'}</h2>
        <p>{view === 'upcoming' ? 'Choose a service and a time for your next visit.' : 'Your appointment records will appear here.'}</p>
        {view === 'upcoming' && <Link className="button primary" href="/book">Book a visit<ArrowRight size={17}/></Link>}
      </div>}
      <p className={styles.note}>Saved local test reservations. Clinic scheduling and cancellation policies are not connected yet.</p>
    </> : !item || !labels ? <div className={styles.empty}><h2>Appointment unavailable</h2><p>It may no longer be available to this account.</p><Link className="button" href="/care/appointments">Your appointments</Link></div> : <>
      {cancelledId === item.id && <div className={styles.notice} role="status"><Check size={18} aria-hidden="true"/>Appointment cancelled. This time is no longer reserved in the local test database.</div>}
      {created && <section className="px-booking-result" style={{margin:'0 0 20px',maxWidth:'none'}}>
        <p className={styles.notice}><Check size={19} aria-hidden="true"/>Saved successfully. You can view or manage this appointment here after a reload.</p>
        <Link className="button primary" href="/care/appointments">View saved appointments<ArrowRight size={17}/></Link>
      </section>}
      <div className={styles.detail}>
        <article className={styles.summary + ' px-care-appointment'} data-appointment-id={item.id} data-appointment-detail>
          <div className={styles.summaryTop} data-cancelled={item.state === 'cancelled'}>
            <span className={styles.status} data-state={bucket}>{item.state === 'cancelled' ? <X size={15}/> : <CalendarDays size={15}/>} {appointmentStatus(item, now)}</span>
            <h2>{item.service_name}</h2><time dateTime={item.starts_at}>{labels.date}</time><p>{labels.range} · {labels.zone}</p>
          </div>
          <dl className={styles.facts}>
            <div><dt>Visit type</dt><dd>{labels.mode}</dd></div><div><dt>Duration</dt><dd>{labels.duration} minutes</dd></div>
            <div><dt>{item.mode === 'online' ? 'Joining details' : 'Location'}</dt><dd>{item.mode === 'online' ? 'Video joining details are not connected in this preview.' : 'Clinic address awaiting confirmation.'}</dd></div>
            <div><dt>Payment</dt><dd>No payment — local test only</dd></div>
          </dl>
        </article>
        <section aria-label="Appointment actions">
          <div className={styles.controls}>
            {bucket === 'upcoming' ? <button type="button" className="button primary" onClick={exportCalendar}><CalendarPlus size={18}/>Add to calendar</button>
              : <Link className="button primary" href={bookAgainHref(item)}>Book again<ArrowRight size={18}/></Link>}
            {canCancelAppointment(item, now) && <button data-cancel-appointment type="button" className={'button ' + styles.danger} onClick={() => setCancelOpen(true)}>Cancel appointment</button>}
          </div>
          {calendarError && <p className="px-error" role="alert">{calendarError}</p>}
          <p className={styles.note}>{bucket === 'upcoming' ? 'Calendar export is a local reminder, not a live booking or video invitation. Rescheduling is not connected yet.' : 'Past and cancelled reservations remain in your history. Past does not mean attendance was recorded.'}</p>
          <p className={styles.note}>No notification, payment or refund is sent by this local preview.</p>
        </section>
      </div>
      {cancelOpen && <CancelAppointment item={item} onClose={() => setCancelOpen(false)} onCancelled={() => {
        setCancelOpen(false); setCancelledId(item.id); resource.reload(); router.refresh();
        requestAnimationFrame(() => titleRef.current?.focus({preventScroll:true}));
      }}/>}
    </>}
  </div></Shell>;
}
