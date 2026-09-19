"use client";
import { useEffect, useRef, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, CalendarDays, Check, Clock3, MapPin, Video } from 'lucide-react';
import { Shell } from './shell';
import { BookScreen } from './book';
import { useDemo } from './demo-context';
import { serviceCandidates, type VisitMode } from './catalogue';
import { completeBookingPreview, previewDate, previewDays, previewPatient, previewSlot, previewSlots, previewTime, type BookingReceipt } from '@/shared/physix/booking-preview';
import styles from './booking-demo.module.css';
export type BookingStep = 'service' | 'time' | 'details' | 'review' | 'complete';
const steps: BookingStep[] = ['service', 'time', 'details', 'review'];
const titles: Record<BookingStep, string> = {
  service: 'Book a visit', time: 'Choose a time', details: 'Your details',
  review: 'Review your visit', complete: 'Preview complete.',
};
export function BookingDemo({ step, initialService = '', initialMode = 'in_clinic' }: {
  step: BookingStep; initialService?: string; initialMode?: VisitMode;
}) {
  const { booking, setBooking, receipt, setReceipt } = useDemo();
  const router = useRouter();
  const [day, setDay] = useState<string>(() => previewSlot(booking.slotId)?.day || previewDays[0]);
  const [error, setError] = useState('');
  const heading = useRef<HTMLHeadingElement>(null);
  const commandId = useRef<string | null>(null);
  const submitted = useRef<BookingReceipt | null>(null);
  const service = serviceCandidates.find(candidate => candidate.id === booking.serviceId);
  const slot = previewSlot(booking.slotId);
  const stepIndex = steps.indexOf(step);
  useEffect(() => { heading.current?.focus({ preventScroll: true }); }, [step]);
  function chooseService(serviceId: string, mode: VisitMode) {
    setBooking(previous => previous.serviceId === serviceId && previous.mode === mode
      ? previous : { serviceId, mode, slotId: null, acknowledged: false });
    setReceipt(null);
    router.push('/dev/demo/book/time');
  }
  function chooseDay(next: string) {
    setDay(next);
    if (slot?.day !== next) setBooking(previous => ({ ...previous, slotId: null, acknowledged: false }));
  }
  function details(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (booking.acknowledged) router.push('/dev/demo/book/review');
  }
  function complete() {
    try {
      commandId.current ||= crypto.randomUUID();
      const next = completeBookingPreview(booking, service, commandId.current, submitted.current);
      submitted.current = next;
      setReceipt(next);
      router.push('/dev/demo/book/complete');
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Could not finish the preview.');
    }
  }
  if (step === 'service') return <BookScreen preview demo initialService={initialService || booking.serviceId}
    initialMode={initialService ? initialMode : booking.mode} onContinue={chooseService} />;
  if (!service || (step !== 'time' && !slot) || (step === 'complete' && !receipt)) {
    return <Shell demo preview task><section className="px-empty"><CalendarDays size={32} />
      <h1>Start with a service.</h1><p>This demo keeps selections in memory, not in an account. Reloading clears them.</p>
      <Link className="button primary" href="/dev/demo/book">Choose a service<ArrowRight size={18} /></Link>
    </section></Shell>;
  }
  const back = step === 'time' ? '/dev/demo/book' : step === 'details' ? '/dev/demo/book/time' : '/dev/demo/book/details';
  return <Shell demo preview task><div className={styles.flow}>
    {step !== 'complete' && <>
      <Link href={back} className={styles.back}><ArrowLeft size={18} />Back</Link>
      <ol className={styles.steps} aria-label="Booking progress">{steps.map((item, index) => <li key={item}
        aria-current={item === step ? 'step' : undefined} data-complete={index < stepIndex}>
        <span>{index < stepIndex ? <Check size={13} /> : index + 1}</span>{item === 'service' ? 'Service' : item === 'time' ? 'Time' : item === 'details' ? 'Details' : 'Review'}
      </li>)}</ol>
    </>}
    <div className={styles.layout}>
      <section className={styles.content}>
        <p className="px-eyebrow">{step === 'complete' ? 'Demonstration only' : 'Your next visit'}</p>
        <h1 ref={heading} tabIndex={-1}>{titles[step]}</h1>
        {step === 'time' && <>
          <p className={styles.subtitle}>A day and time that works for you.</p>
          <div className={styles.month}><h2>September 2026</h2><span>Example week · UTC</span></div>
          <div className={styles.days} role="group" aria-label="Example appointment dates">{previewDays.map(date => <button
            type="button" key={date} aria-pressed={day === date} aria-label={previewDate(date + 'T12:00:00Z')}
            onClick={() => chooseDay(date)}><small>{new Intl.DateTimeFormat('en-GB', { weekday: 'short', timeZone: 'UTC' }).format(new Date(date + 'T12:00:00Z'))}</small>
            <strong>{Number(date.slice(-2))}</strong><span aria-hidden="true">•</span></button>)}</div>
          <div className={styles.timeHeading}><h2>Available times</h2><span>Sample availability</span></div>
          <div className={styles.times} role="group" aria-label="Example time slots">{previewSlots.filter(item => item.day === day).map(item => <button
            type="button" key={item.id} disabled={!item.available} aria-pressed={booking.slotId === item.id}
            aria-label={previewTime(item.startsAt) + ' UTC' + (item.available ? '' : ', unavailable')}
            onClick={() => setBooking(previous => ({ ...previous, slotId: item.id, acknowledged: false }))}>
            {previewTime(item.startsAt)}{booking.slotId === item.id && <Check size={15} />}</button>)}</div>
          <p className={styles.notice}><Clock3 size={16} />45-minute example visit. UTC is a demo timezone, not the clinic’s timezone.</p>
          <button className="button primary full" disabled={!slot?.available} onClick={() => router.push('/dev/demo/book/details')}>Continue<ArrowRight size={18} /></button>
        </>}
        {step === 'details' && <form className={styles.form} onSubmit={details}>
          <p className={styles.subtitle}>A preview of the contact step. No personal information is collected.</p>
          <label htmlFor="preview-name">Full name<input id="preview-name" value={previewPatient.name} readOnly autoComplete="off" /></label>
          <label htmlFor="preview-email">Email address<input id="preview-email" type="email" value={previewPatient.email} readOnly autoComplete="off" /></label>
          <p className={styles.notice}>These are fixed synthetic details. Real booking will use verified contact information and clinic-approved policies.</p>
          <label className={styles.acknowledgement}><input id="preview-ack" type="checkbox" required checked={booking.acknowledged}
            onChange={event => setBooking(previous => ({ ...previous, acknowledged: event.target.checked }))} />
            <span>I understand this is a preview, not an appointment request.</span></label>
          <button className="button primary full" type="submit">Review visit<ArrowRight size={18} /></button>
        </form>}
        {step === 'review' && <>
          <p className={styles.subtitle}>Everything in one place.</p>
          <dl className={styles.review}>
            <div><dt>Patient</dt><dd>{previewPatient.name}<small>{previewPatient.email}</small></dd></div>
            <div><dt>Service</dt><dd>{service.name}<Link href="/dev/demo/book">Change service</Link></dd></div>
            <div><dt>Appointment type</dt><dd>{booking.mode === 'online' ? 'Online consultation' : 'In-clinic visit'}</dd></div>
            <div><dt>When</dt><dd>{slot && previewDate(slot.startsAt)}<small>{slot && previewTime(slot.startsAt)}–{slot && previewTime(slot.endsAt)} UTC</small><Link href="/dev/demo/book/time">Change time</Link></dd></div>
            <div><dt>Payment</dt><dd>Not configured<small>No payment will be taken.</small></dd></div>
          </dl>
          <p className={styles.notice}>Finishing only updates this demonstration. Nothing is sent to the clinic or saved as a real appointment.</p>
          {error && <p className="px-error" role="alert">{error}</p>}
          <button className="button primary full" onClick={complete}>Finish preview<ArrowRight size={18} /></button>
        </>}
        {step === 'complete' && <div className={styles.complete}>
          <div className={styles.completeIcon}><CalendarDays size={32} /></div>
          <h2>No appointment was reserved.</h2><p>You have tried the booking flow. Your example selection is visible on the patient demo home until this tab is reloaded.</p>
          <Link className="button primary full" href="/dev/demo">Go to patient home<ArrowRight size={18} /></Link>
          <Link className="button full" href="/dev/demo/book">Try another appointment</Link>
        </div>}
      </section>
      <aside className={styles.summary} aria-label="Selected visit">
        <span className={styles.summaryIcon}>{booking.mode === 'online' ? <Video size={26} /> : <MapPin size={26} />}</span>
        <p className="px-eyebrow">Your example visit</p><h2>{service.name}</h2>
        <p>{booking.mode === 'online' ? 'Online consultation' : 'In-clinic visit'}</p>
        {slot ? <div className={styles.selectedTime}><CalendarDays size={19} /><div><strong>{previewDate(slot.startsAt, true)}</strong><span>{previewTime(slot.startsAt)}–{previewTime(slot.endsAt)} UTC</span></div></div> : <p className={styles.notice}>Choose an example time to continue.</p>}
        <p className={styles.notice}>Preview only · no live availability, payment or reservation.</p>
      </aside>
    </div>
  </div></Shell>;
}
