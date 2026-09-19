"use client";
import Link from 'next/link';
import {useState} from 'react';
import {Check, Clock3} from 'lucide-react';
import type {LocalAccount} from '@/shared/physix/contracts';
import {activityPeriod, programmesFor} from '@/shared/physix/programmes';
import {Shell, SectionTitle} from './shell';
import {Row} from './ui';
import {SavedPending} from './local-patient';
import {useSavedResource} from './local-api';
import styles from './care-hub.module.css';
export function CareProgress() {
  const resource=useSavedResource<LocalAccount>('me');
  const [now]=useState(()=>new Date()), [days,setDays]=useState(7), [programmeId,setProgrammeId]=useState(''), [day,setDay]=useState('');
  if(!resource.data)return <Shell local><SavedPending error={resource.error} reload={resource.reload}/></Shell>;
  const data=resource.data, programmes=programmesFor(data), stats=activityPeriod(data,days,now,programmeId||undefined);
  const allowed=programmeId ? programmes.find(p=>p.id===programmeId)?.sessions || [] : data.relationship?.sessions || [];
  const history=allowed.filter(s=>{const date=(s.completed_at||s.started_at).slice(0,10);return date>=stats.from&&date<=stats.to&&(!day||date===day);});
  const maximum=Math.max(1,...stats.series.map(d=>d.count));
  function choosePeriod(period:number){setDays(period);setDay('');}
  return <Shell local><div className="px-care-heading"><h1>Your progress</h1><p>Saved activity, not a recovery score.</p></div>
    <div className={styles.rangeControl}>
      <div className={styles.filters} role="group" aria-label="Activity period">{[7,28].map(n=><button key={n} aria-pressed={n===days} onClick={()=>choosePeriod(n)}>{n} days</button>)}</div>
      <label><span className="sr-only">Programme activity</span><select aria-label="Programme activity" value={programmeId} onChange={e=>{setProgrammeId(e.target.value);setDay('');}}><option value="">All programmes</option>{programmes.map(p=><option key={p.id} value={p.id}>{p.title}</option>)}</select></label>
    </div>
    <div className="px-care-stats"><div><strong>{stats.completed}</strong><span>Sessions finished</span></div><div><strong>{stats.minutes}</strong><span>Session minutes</span></div><div><strong>{stats.adherence===null?'—':stats.adherence+'%'}</strong><span>{stats.eligible?stats.completedScheduled+' of '+stats.eligible+' due sessions':'No sessions scheduled'}</span></div></div>
    <section className={styles.activity} aria-label="Recorded activity">
      <h2>{stats.activeDays} active {stats.activeDays===1?'day':'days'}</h2><p>{stats.from} – {stats.to} · UTC · Select a day to see its history.</p>
      <div className={days===7?styles.bars:styles.calendar}>{stats.series.map(item=><button key={item.date} aria-label={item.date + ': ' + item.count + ' sessions finished'} aria-pressed={day===item.date} data-recorded={item.count>0} onClick={()=>setDay(day===item.date?'':item.date)}>
        {days===7?<><span className={styles.bar} style={{height:Math.max(3,item.count/maximum*94)}}/><small>{new Date(item.date+'T12:00:00Z').toLocaleDateString('en-GB',{weekday:'short',timeZone:'UTC'})}</small></>:Number(item.date.slice(-2))}
      </button>)}</div>
    </section>
    <SectionTitle title={day?'History · '+day:'Session history'} href="/app/plans" label="Programmes"/>
    {day && <button className="px-text-link" onClick={()=>setDay('')}>Show all days</button>}
    <div className="row-group">{history.length?history.map(s=><Row key={s.id} href={'/app/sessions/'+s.id} icon={s.state==='completed'?<Check size={20}/>:<Clock3 size={20}/>} detail={(s.completed_at||s.started_at).slice(0,10)+' · '+s.state.replaceAll('_',' ')+' · '+Math.floor(s.elapsed_seconds/60)+' min'}>{s.prescription.title}</Row>):<div className="px-empty"><h2>No recorded sessions in this period.</h2><Link className="button" href="/app/plans">Open your programmes</Link></div>}</div>
    <p className={styles.footnote}>Repeat attempts count as activity once each, not as extra scheduled sessions. Cancelled sessions are excluded from the completion denominator.</p>
    <SectionTitle title="Check-ins" href="/app/check-ins" label="Add entry"/>
    <div className="row-group">{data.relationship?.check_ins.length ? data.relationship.check_ins.map(c=><article className="row" key={c.id}><div className="row-copy"><span>Week of {c.week_start}</span><small>Self-reported difficulty · {c.difficulty}/10</small><p>{c.body}</p><small>{c.review?.body||'Not reviewed yet.'}</small></div></article>):<p className="px-note">No check-ins shared. Missing entries are not zero.</p>}</div>
  </Shell>;
}
