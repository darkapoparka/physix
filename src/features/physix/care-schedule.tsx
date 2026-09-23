"use client";
import Link from 'next/link';
import {useState} from 'react';
import {CalendarDays, Layers, ChevronLeft, ChevronRight, ArrowUpRight} from 'lucide-react';
import type {LocalAccount} from '@/shared/physix/contracts';
import {dayKey, shiftDay, weekDays, programmesFor} from '@/shared/physix/programmes';
import {Shell} from './shell';
import {CareHeader} from './care-header';
import {SavedPending} from './local-patient';
import {useSavedResource} from './local-api';
import styles from './care-hub.module.css';
const label = (day: string, options: Intl.DateTimeFormatOptions) => new Date(day + 'T12:00:00Z').toLocaleDateString('en-GB', {...options,timeZone:'UTC'});
export function CareSchedule({initialAccount}: {initialAccount?: LocalAccount} = {}) {
  const resource = useSavedResource<LocalAccount>('me', initialAccount);
  const [today] = useState(()=>dayKey(new Date())), [selected, setSelected] = useState(today);
  const [week, setWeek] = useState(today);
  if (!resource.data) return <Shell contextual><SavedPending error={resource.error} reload={resource.reload}/></Shell>;
  const data = resource.data, days = weekDays(week), programmes = programmesFor(data);
  const workouts = data.relationship?.workouts || [], appointments = data.appointments;
  const sessionsOnDay = workouts.filter(w=>w.scheduled_date === selected);
  const visitsOnDay = appointments.filter(a=>a.starts_at.slice(0,10) === selected);
  function move(offset:number) {const day=shiftDay(days[0],offset);setWeek(day);setSelected(day);}
  return <Shell local={resource.data?.environment==='local-test'} contextual><CareHeader active="schedule"/>
    <p className={styles.viewContext}>Exercises and appointments · UTC</p>
    <div className={styles.scheduleLayout}>
      <section><div className={styles.weekHeader}><h2>{label(days[0],{day:'numeric',month:'short'})} – {label(days[6],{day:'numeric',month:'short',year:'numeric'})}</h2>
        <div><button aria-label="Previous week" onClick={()=>move(-7)}><ChevronLeft size={19}/></button><button aria-label="Next week" onClick={()=>move(7)}><ChevronRight size={19}/></button></div></div>
        <div className={styles.week} role="group" aria-label="Choose a day">{days.map(day => {
          const count = workouts.filter(w=>w.scheduled_date===day&&w.state!=='canceled').length + appointments.filter(a=>a.starts_at.slice(0,10)===day&&a.state==='confirmed').length;
          return <button key={day} aria-pressed={selected===day} aria-label={label(day,{weekday:'long',day:'numeric',month:'long'}) + ', ' + count + ' scheduled items'} onClick={()=>setSelected(day)}>
            <small>{label(day,{weekday:'short'})}</small><b>{Number(day.slice(-2))}</b><i data-empty={count===0}/></button>;
        })}</div>
        <div className={styles.filters} style={{marginTop:14}}><button onClick={()=>{setWeek(today);setSelected(today);}}>Today</button><Link className="px-text-link" href="/care/appointments">All appointments<ArrowUpRight size={15}/></Link></div>
        <Link className={styles.explore} href="/book"><CalendarDays size={24}/><span><strong>Book a visit</strong><small>Find an in-clinic or online time</small></span><ArrowUpRight size={18}/></Link>
      </section>
      <section><h2 className={styles.dayHeading}>{label(selected,{weekday:'long',day:'numeric',month:'long'})}</h2>
        <div className="row-group">
          {visitsOnDay.map(a=><Link href={'/care/appointments/'+a.id} key={a.id} className={styles.entry} data-kind="appointment"><CalendarDays size={23}/><div><small>Appointment · {a.starts_at.slice(11,16)} UTC</small><h3>{a.service_name}</h3><p>{a.mode==='online'?'Online':'In clinic'} · {a.state==='confirmed'?'Reserved':'Cancelled'}</p></div><ChevronRight size={18}/></Link>)}
          {sessionsOnDay.map(w=><Link href={'/care/workouts/'+w.id} key={w.id} className={styles.entry} data-kind="exercise"><Layers size={22}/><div><small>Exercise session{programmes.find(p=>p.scheduledIds.includes(w.id)) ? ' · '+programmes.find(p=>p.scheduledIds.includes(w.id))!.title : ''}</small><h3>{w.prescription.title}</h3><p>{w.prescription.exercises.length} exercises · {w.state==='completed'?'Finished':w.state==='canceled'?'Cancelled':'Scheduled'}</p></div><ChevronRight size={18}/></Link>)}
          {!visitsOnDay.length && !sessionsOnDay.length && <div className="px-empty"><CalendarDays size={29}/><h2>Nothing scheduled.</h2><p>Choose another day or open your programmes.</p><Link href="/care/programmes" className="button">Your programmes</Link></div>}
        </div>
        <p className={styles.footnote}>Exercises and appointments are different records. This calendar does not change your prescribed schedule.</p>
      </section>
    </div>
  </Shell>;
}
