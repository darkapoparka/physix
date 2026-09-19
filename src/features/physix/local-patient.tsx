"use client";
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {useState} from 'react';
import {ArrowRight,ArrowUpRight,CalendarDays,Check,ChevronLeft,Clock3,Layers,Play} from 'lucide-react';
import type {LocalAccount,Appointment} from '@/shared/physix/contracts';
import type {ScheduledWorkout} from '@/shared/gymaf/contracts';
import {careActivity} from '@/shared/physix/care';
import {programmesFor,nextWorkout} from '@/shared/physix/programmes';
import {monday} from '@/shared/gymaf/validation';
import {CareCard} from './care-card';
import {CareWeek} from './care-week';
import {CareNavigation} from './care-navigation';
import {ProgrammeCard} from './programme-card';
import {Shell,SectionTitle} from './shell';
import {Row,Sheet} from './ui';
import {announceIdentity,localApi,useSavedCommand,useSavedResource} from './local-api';
import styles from './care-hub.module.css';
export function SavedPending({error,reload}:{error:string;reload:()=>void}) {
  return <div className="px-empty" aria-busy={!error}><h2>{error?'Could not load your care.':'Loading your care…'}</h2>{error&&<><p role="alert">{error}</p><button className="button" onClick={reload}>Retry</button><Link className="px-text-link" href="/login">Open local sign-in</Link></>}</div>;
}
function dateLabel(value:string) {return new Date(value.length===10?value+'T12:00:00Z':value).toLocaleDateString('en',{weekday:'short',day:'numeric',month:'short',timeZone:'UTC'});}
export function AppointmentRow({item}:{item:Appointment}) {
  return <Row href="/app/appointments" icon={<CalendarDays size={22}/>} detail={dateLabel(item.starts_at)+' · '+new Date(item.starts_at).toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit',timeZone:'UTC'})+' UTC · '+(item.mode==='online'?'Online':'In clinic')}>{item.service_name}</Row>;
}
function SessionCard({workout,resumable=false}:{workout:ScheduledWorkout;resumable?:boolean}) {
  return <CareCard href={'/app/workouts/'+workout.id} title={workout.prescription.title} art="mobility" tone="mint" play priority
    badge={resumable?'Resume session':workout.state==='completed'?'Repeat a session':'Next session'}
    detail={workout.prescription.exercises.length+' exercises · '+dateLabel(workout.scheduled_date)}
    sizes="(min-width: 1000px) 540px, (min-width: 700px) 50vw, 92vw"/>;
}
export function LocalPatient({screen,id}:{screen:'home'|'detail'|'check-ins'|'appointments'|'profile';id?:string}) {
  const resource=useSavedResource<LocalAccount>('me'),mutation=useSavedCommand(),router=useRouter();
  const [now]=useState(()=>Date.now());
  const [confirm,setConfirm]=useState<Appointment|null>(null),[signoutError,setSignoutError]=useState('');
  if(!resource.data)return <Shell local><SavedPending error={resource.error} reload={resource.reload}/></Shell>;
  const data=resource.data,{account,relationship:care,appointments}=data,programmes=programmesFor(data);
  const workouts=[...(care?.workouts||[])].sort((a,b)=>a.scheduled_date.localeCompare(b.scheduled_date));
  const active=care?.sessions.find(s=>s.state==='in_progress'||s.state==='paused');
  const next=nextWorkout(workouts,care?.sessions||[])||workouts.find(w=>w.state!=='canceled');
  const selected=workouts.find(w=>w.id===id),programme=programmes.find(p=>p.scheduledIds.includes(id||'')),stats=careActivity(care,new Date(now));
  const upcoming=appointments.filter(a=>a.state==='confirmed'&&Date.parse(a.starts_at)>now);
  async function start(workout:ScheduledWorkout) {
    const existing=care?.sessions.find(s=>s.scheduled_workout_id===workout.id&&['in_progress','paused'].includes(s.state));
    if(existing){router.push('/app/sessions/'+existing.id);return;}
    const result=await mutation.run('care.start',{scheduledId:workout.id});if(result)router.push('/app/sessions/'+result.id);
  }
  async function signout(){try{await localApi('auth/logout',{body:{}});announceIdentity();router.replace('/login');router.refresh();}catch(error){setSignoutError(error instanceof Error?error.message:'Sign-out failed.');}}
  const title=screen==='home'?'Today':screen==='detail'?(selected?.prescription.title||'Session unavailable'):screen==='check-ins'?'Check-in':screen==='appointments'?'Appointments':'Your account';
  return <Shell local task={screen==='detail'}><div className="px-care-heading">
    {screen==='detail'&&<Link className="px-text-link" href={programme?'/app/plans/'+programme.id:'/app/plans'}><ChevronLeft size={18}/>{programme?.title||'Programmes'}</Link>}
    <h1>{title}</h1>{screen==='home'&&<p>{dateLabel(stats.to)}</p>}
  </div>
  {screen==='home'&&<CareNavigation active="today"/>}
  {screen==='home'?<>
    <div className="px-patient-grid"><section>
      {next?<><SessionCard workout={next} resumable={!!active}/><button className="button primary full" disabled={mutation.busy||!care?.can_train} onClick={()=>void start(next)}><Play size={18}/>{mutation.busy?'Opening…':active?'Resume session':'Start session'}</button></>:<EmptyCare/>}
      <SectionTitle title="Next appointment" href="/app/appointments" label="All visits"/>
      {upcoming[0]?<AppointmentRow item={upcoming[0]}/>:<Row href="/app/book" icon={<CalendarDays size={21}/>} detail="Choose an in-clinic or online time">Book a visit</Row>}
    </section><section className="px-care-sidebar">
      <CareWeek workouts={workouts} date={stats.to}/><SectionTitle title="Scheduled sessions" href="/app/schedule" label="Full schedule"/>
      <div className="row-group">{workouts.filter(w=>w.state!=='canceled').slice(0,3).map(w=><Row key={w.id} href={'/app/workouts/'+w.id} icon={w.state==='completed'?<Check size={19}/>:<Layers size={19}/>} detail={dateLabel(w.scheduled_date)+' · '+(w.state==='completed'?'Finished':'Scheduled')}>{w.prescription.title}</Row>)}</div>
      <Link className="px-reflection" href="/app/progress"><Clock3 size={24}/><div><h3>{stats.completed} sessions finished</h3><p>View saved activity</p></div><ArrowUpRight size={19}/></Link>
      <Row href="/app/check-ins" detail="Share a weekly entry with your practitioner">Your check-in</Row>
    </section></div>
    <SectionTitle title="Your programmes" href="/app/plans" label="View all"/>
    <div className={styles.rail}>{programmes.slice(0,6).map((p,i)=><ProgrammeCard key={p.id} programme={p} index={i}/>)}</div>
    {!programmes.length&&<p className="px-note">Your assigned programmes will appear here.</p>}
  </>:screen==='detail'?(!selected?<EmptyCare/>:<div className="px-detail-grid"><SessionCard workout={selected}/><section className="px-plan-detail">
    <p className="px-origin-pill">{programme?.title||'Assigned in care'}{programme?' · Version '+programme.version:''}</p><h2>Your session</h2>
    <div className="row-group">{selected.prescription.exercises.map((e,i)=><div className="row" key={e.id}><span className="px-exercise-number">{String(i+1).padStart(2,'0')}</span><span className="row-copy"><span>{e.name}</span><small>{e.sets.length} {e.sets.length===1?'set':'sets'} · {e.sets[0].reps?e.sets[0].reps+' repetitions':e.sets[0].durationSeconds+' seconds'}</small></span></div>)}</div>
    <button className="button primary full" disabled={mutation.busy||!care?.can_train||selected.state==='canceled'} onClick={()=>void start(selected)}><Play size={18}/>{mutation.busy?'Opening…':active?.scheduled_workout_id===selected.id?'Resume session':'Start session'}</button>
    <p className="px-note">Sample exercises for testing. Your practitioner must supply actual instructions and videos.</p>
  </section></div>):screen==='check-ins'?<CheckInForm data={data} onSaved={resource.reload}/>:
  screen==='appointments'?<div className="row-group"><Link className="button primary" href="/app/book">Book a visit<ArrowRight size={18}/></Link>{appointments.length?appointments.map(a=><article className="px-care-appointment" data-appointment-id={a.id} key={a.id}><h2>{a.service_name}</h2><p>{dateLabel(a.starts_at)} · {new Date(a.starts_at).toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit',timeZone:'UTC'})} UTC</p><p>{a.mode==='online'?'Online':'In clinic'} · {a.state==='confirmed'?'Reserved in local test database':'Cancelled'}</p>{a.state==='confirmed'&&<button className="px-text-link" onClick={()=>setConfirm(a)}>Cancel visit</button>}</article>):<p className="px-note">No saved appointments yet.</p>}</div>:
  <section className="px-account-gate"><h2>{account.user.display_name}</h2><p className="px-intro">Local synthetic account. Your saved records remain on this PC after sign-out.</p><Link className="button full" href="/login">Switch test account</Link><button className="button full" onClick={()=>void signout()}>Sign out</button>{signoutError&&<p className="px-error" role="alert">{signoutError}</p>}</section>}
  {mutation.error&&<p role="alert" className="px-error">{mutation.error}</p>}
  {confirm&&<Sheet title="Cancel this visit?" onClose={()=>setConfirm(null)}><p>This cancels only the local test reservation. No clinic notification or refund is sent.</p><button className="button primary" disabled={mutation.busy} onClick={async()=>{const result=await mutation.run('booking.cancel',{id:confirm.id});if(result){setConfirm(null);resource.reload();}}}>{mutation.busy?'Cancelling…':'Cancel visit'}</button>{mutation.error&&<p className="px-error" role="alert">{mutation.error}</p>}</Sheet>}
  </Shell>;
}
function EmptyCare(){return <div className="px-empty"><Layers size={30}/><h2>No plan assigned yet.</h2><p>A practitioner-assigned plan will appear here. This account has no exercises to start.</p><Link className="button" href="/app/book">Book a visit</Link></div>;}
function CheckInForm({data,onSaved}:{data:LocalAccount;onSaved:()=>void}){
 const care=data.relationship,[difficulty,setDifficulty]=useState(''),[body,setBody]=useState(''),[shared,setShared]=useState(false),mutation=useSavedCommand();
 const week=monday(new Date().toISOString().slice(0,10)),saved=care?.check_ins.find(c=>c.week_start===week);
 if(!care)return <EmptyCare/>;
 if(saved)return <div className="px-care-appointment" role="status"><h2>Check-in saved.</h2><p>Week of {dateLabel(week)} · difficulty {saved.difficulty}/10</p><p>{saved.body}</p><p className="px-note">Shared with the local test practitioner. This is not continuous or emergency monitoring.</p><Link className="px-text-link" href="/app/progress">View history<ArrowRight size={18}/></Link></div>;
 return <form className="px-care-form" onSubmit={async e=>{e.preventDefault();const result=await mutation.run('care.check-in',{relationshipId:care.relationship.id,weekStart:week,difficulty:Number(difficulty),body,shared});if(result)onSaved();}}><p className="px-note">Example tracking question for testing. The practitioner must approve real questions and interpretation.</p><label>How difficult was this week’s exercise?<span className="px-note">Self-reported · 1 to 10</span><input type="number" inputMode="numeric" min="1" max="10" required value={difficulty} onChange={e=>setDifficulty(e.target.value)}/></label><label>Your note<textarea maxLength={2000} value={body} onChange={e=>setBody(e.target.value)} placeholder="Use sample text only"/></label><label className="px-care-check"><input type="checkbox" required checked={shared} onChange={e=>setShared(e.target.checked)}/>Share this entry with the local test practitioner</label><button className="button primary full" disabled={mutation.busy||!shared||!care.can_train}>{mutation.busy?'Saving…':'Share check-in'}</button>{mutation.error&&<p className="px-error" role="alert">{mutation.error}</p>}</form>;
}
