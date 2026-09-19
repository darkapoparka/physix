"use client";
import { CalendarDays } from 'lucide-react';
import { useDemo } from './demo-context';
import { serviceCandidates } from './catalogue';
import { previewDate, previewTime } from '@/shared/physix/booking-preview';
export function DemoAppointment() {
  const { receipt } = useDemo();
  if (!receipt) return <div className="px-appointment">
    <span className="px-date-tile"><small>SEP</small><strong>21</strong></span>
    <div><h3>In-clinic visit</h3><p>Monday · 10:00 UTC</p><small>Example appointment</small></div>
    <CalendarDays size={21} />
  </div>;
  const service = serviceCandidates.find(candidate => candidate.id === receipt.serviceId);
  const instant = new Date(receipt.slot.startsAt);
  const month = new Intl.DateTimeFormat('en-GB', { month: 'short', timeZone: 'UTC' }).format(instant).toUpperCase();
  return <div className="px-appointment" data-preview-appointment>
    <span className="px-date-tile"><small>{month}</small><strong>{instant.getUTCDate()}</strong></span>
    <div><h3>{service?.name}</h3><p>{previewDate(receipt.slot.startsAt, true)} · {previewTime(receipt.slot.startsAt)} UTC</p>
      <small>Preview only · not reserved</small></div><CalendarDays size={21} />
  </div>;
}
