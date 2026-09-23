"use client";
import {useEffect, useRef, useState} from 'react';
import {useRouter, useSearchParams} from 'next/navigation';
import Link from 'next/link';
import {ArrowRight,CalendarDays,Check,MapPin,Search,Video,X} from 'lucide-react';
import type {AvailableSlot,LocalAccount,ServiceOffer} from '@/shared/physix/contracts';
import {Shell} from './shell';
import {ContextHeader} from './context-header';
import {BookingFooter} from './booking-controls';
import {Sheet} from './ui';
import styles from './booking-flow.module.css';
import {serviceCandidates,type VisitMode} from './catalogue';
import {ServiceChoice} from './service-choice';
import {announceIdentity,localApi,useSavedCommand,useSavedResource} from './local-api';
import {matchesSearch} from '@/shared/physix/demo';
export function LocalBooking({publicEntry = false}: {publicEntry?: boolean}) {
 const params = useSearchParams(), router = useRouter();
 const [exitOpen, setExitOpen] = useState(false), [savedId, setSavedId] = useState('');
 const mode: VisitMode = params.get('mode') === 'online' ? 'online' : 'in_clinic';
 const [query, setQuery] = useState(params.get('q') || '');
 const heading = useRef<HTMLHeadingElement>(null);
 const [day,setDay]=useState(()=>new Date(Date.now()+86400000).toISOString().slice(0,10));
 const [chosenSlot, setChosenSlot] = useState<{offerId: string; mode: VisitMode; slot: AvailableSlot} | null>(null);
 const [loginError,setLoginError]=useState(''),[signingIn,setSigningIn]=useState(false);
 const offers=useSavedResource<ServiceOffer[]>('offers'),account=useSavedResource<LocalAccount>('me'),mutation=useSavedCommand();
 const candidates = (offers.data || []).filter(s => s.modes.includes(mode) && matchesSearch(s.name + ' ' + (serviceCandidates.find(c => c.name === s.name)?.search || ''), query));
 const slug = params.get('service');
 const selection = offers.data?.find(s => s.modes.includes(mode) && (s.id === slug || s.name === serviceCandidates.find(c => c.id === slug)?.name));
 const slot = chosenSlot && chosenSlot.offerId === selection?.id && chosenSlot.mode === mode && chosenSlot.slot.startsAt.slice(0, 10) === day ? chosenSlot.slot : null;
 function setSlot(value: AvailableSlot | null) { setChosenSlot(value && selection ? {offerId: selection.id, mode, slot: value} : null); }
 const step = selection && params.get('step') !== 'service' ? (params.get('step') === 'review' && slot ? 2 : 1) : 0;
 // Only public offer/mode/stage enter the URL. Contact data and selected times stay out.
 function go(next: number, changes: Record<string, string | null> = {}) {
   if (mutation.busy) return;
   const url = new URL(window.location.href);
   url.searchParams.set('step', next === 0 ? 'service' : next === 1 ? 'time' : 'review');
   for (const [key, value] of Object.entries(changes)) {
     if (value === null) url.searchParams.delete(key); else url.searchParams.set(key, value);
   }
   window.history.pushState(null, '', url.pathname + '?' + url.searchParams.toString());
 }
 function chooseService(offer: ServiceOffer) {
   setSlot(null);
   go(1, {service: serviceCandidates.find(c => c.name === offer.name)?.id || offer.id, q: null});
 }
 useEffect(() => {
   const frame = requestAnimationFrame(() => { window.scrollTo({top: 0, behavior: 'instant'}); heading.current?.focus({preventScroll: true}); });
   return () => cancelAnimationFrame(frame);
 }, [step, selection?.id]);
 const slots=useSavedResource<AvailableSlot[]>(selection&&step===1?'slots?'+new URLSearchParams({offerId:selection.id,mode,day}):null);
 const [days]=useState(()=>Array.from({length:7},(_,i)=>new Date(Date.now()+(i+1)*86400000).toISOString().slice(0,10)));
 const format=(date:string,options:Intl.DateTimeFormatOptions)=>new Date(date.length===10?date+'T12:00:00Z':date).toLocaleString('en-GB',{...options,timeZone:'UTC'});
 async function enter(){if(signingIn)return;setSigningIn(true);setLoginError('');try{await localApi('auth/local',{body:{persona:'patient'}});announceIdentity();account.reload();}catch(error){setLoginError(error instanceof Error?error.message:'Could not open local account.');}finally{setSigningIn(false);}}
 async function reserve(){if(!selection||!slot)return;const result=await mutation.run('booking.reserve',{offerId:selection.id,mode,startsAt:slot.startsAt});if(result){setSavedId(result.id);router.replace('/care/appointments/'+result.id+'?created=1');}else slots.reload();}
 return <Shell local={!publicEntry} preview={publicEntry} contextual task={step>0}>
  <ContextHeader title={step===0?'Book a visit':step===1?'Choose a time':'Review your visit'} headingRef={heading} busy={mutation.busy}
    back={step>0?{onClick:()=>go(step-1),label:'Back'}:undefined}
    action={step===0?<Link href="/care/appointments"><CalendarDays size={16}/>My visits</Link>:<button type="button" disabled={mutation.busy||!!savedId} aria-label="Close booking" onClick={()=>setExitOpen(true)}><X size={18}/></button>}/>
  {savedId && <p role="status" className="px-note">Saved. <Link href={'/care/appointments/'+savedId}>Open your appointment</Link></p>}
  <div className={"px-book-layout px-booking-flow " + styles.flow} data-focused={step>0}><section aria-busy={step===0?offers.loading:step===1?slots.loading:mutation.busy}>
   {step===0?<>
    <div className="px-segment" role="group" aria-label="Appointment type">{(['in_clinic','online'] as const).map(m=><button key={m} aria-pressed={mode===m} onClick={()=>{setSlot(null);go(0,{mode:m,service:null});}}>{m==='online'?<Video size={18}/>:<MapPin size={18}/>} {m==='online'?'Online':'In clinic'}</button>)}</div>
    <div className="px-search"><Search size={20}/><label className="sr-only" htmlFor="service-search">Search services</label><input id="service-search" type="search" value={query} placeholder="Search services" onChange={e=>setQuery(e.target.value)}/></div>
    <div className="px-section-title"><h2>Choose your service</h2></div>
    <div className="px-service-list">{candidates.map(s=><ServiceChoice key={s.id} name={s.name} selected={selection?.id===s.id} detail={s.duration_minutes+' min'} onSelect={()=>chooseService(s)}/>)}</div>
    {!candidates.length&&!offers.loading&&!offers.error&&<div className="px-empty"><h2>No matching services</h2><button className="button" onClick={()=>{setQuery('');go(0,{mode:'in_clinic',service:null,q:null});}}>Clear filters</button></div>}
    {offers.loading && <p role="status" className="px-note">Loading services…</p>}
    {offers.error&&<div role="alert" className="px-error">{offers.error}<button className="button" onClick={offers.reload}>Try again</button></div>}
   </>:step===1?<>
    <div className={styles.selection}><CalendarDays size={22}/><div><strong>{selection?.name}</strong><p>{mode==='online'?'Online':'In clinic'} · {selection?.duration_minutes} min</p></div><button type="button" onClick={()=>go(0)}>Change</button></div>
    <div className="px-local-dates" aria-label="Choose appointment day">
     {days.map(d=><button key={d} aria-label={format(d,{weekday:'long',day:'numeric',month:'long',year:'numeric'})} aria-pressed={d===day} onClick={()=>{setDay(d);setSlot(null);}}>
      <small>{format(d,{weekday:'short'})}</small><strong>{Number(d.slice(-2))}</strong>
     </button>)}
    </div>
    <div className="px-section-title"><h2>Available times</h2><span className="px-note">UTC</span></div><p className="px-note" style={{marginBottom:14}}>{format(day,{weekday:'long',day:'numeric',month:'long',year:'numeric'})}</p>
    {slots.loading?<p role="status">Loading available times…</p>:<div className="px-booking-times">
     {slots.data?.map(s=><button key={s.startsAt} aria-pressed={s.startsAt===slot?.startsAt} onClick={()=>setSlot(s)}>
      {format(s.startsAt,{hour:'2-digit',minute:'2-digit'})}
      {s.startsAt===slot?.startsAt&&<Check size={15}/>}
     </button>)}
    </div>}
    {slots.error&&<div role="alert" className="px-error">{slots.error}<button className="button" onClick={slots.reload}>Retry available times</button></div>}
    {!slots.loading&&!slots.error&&!slots.data?.length&&<p>No times available. Choose another day.</p>}
    <BookingFooter summary={slot?format(slot.startsAt,{weekday:'short',day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'})+' UTC':'Choose an available time to continue'}>
      <button data-booking-next className="button primary full" disabled={!slot||slots.loading} onClick={()=>go(2)}>Continue<ArrowRight size={18}/></button>
    </BookingFooter>
   </>:<>
    <div className={styles.review}>
     <div className={styles.reviewService}>
      <div><small>Service</small><strong>{selection?.name}</strong><p>{mode==='online'?'Online':'In clinic'} · {selection?.duration_minutes} min</p></div>
      <button type="button" disabled={mutation.busy} onClick={()=>go(0)}>Change</button>
     </div>
     <div className={styles.reviewWhen}>
      <small>When</small>
      <strong>{slot&&format(slot.startsAt,{weekday:'long',day:'numeric',month:'long',year:'numeric'})}</strong>
      <p>{slot&&format(slot.startsAt,{hour:'2-digit',minute:'2-digit'})} – {slot&&format(slot.endsAt,{hour:'2-digit',minute:'2-digit'})} UTC</p>
      <button type="button" disabled={mutation.busy} onClick={()=>go(1)}>Change time</button>
     </div>
     <div className={styles.reviewMeta}>
      <div><small>Patient</small><strong>{account.data?.account.user.display_name||'Local test account required'}</strong></div>
      <div><small>Payment</small><strong>None — local test only</strong></div>
     </div>
    </div>
    {!account.data?<>
     <p className="px-note">Use a synthetic patient to test saving a reservation. No real personal details are needed.</p>
     <BookingFooter summary="No real personal details or payment needed">
       <button data-booking-next className="button primary full" disabled={signingIn||account.loading} onClick={()=>void enter()}>{signingIn?'Opening…':'Use local test patient'}</button>
     </BookingFooter>
     {loginError&&<p role="alert" className="px-error">{loginError}</p>}
    </>:<BookingFooter summary={slot?format(slot.startsAt,{weekday:'short',day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'})+' UTC · No payment':'Review your selection'}>
     <button data-booking-next className="button primary full" disabled={mutation.busy||!slot||!!savedId} onClick={()=>void reserve()}>{savedId?'Opening appointment…':mutation.busy?'Reserving…':'Reserve test visit'}<Check size={18}/></button>
    </BookingFooter>}
    {mutation.error&&<><p role="alert" className="px-error">{mutation.error}</p>
     <button className="button full" onClick={()=>{setSlot(null);go(1);}}>Choose another time</button>
    </>}
   </>}
  </section><aside className="px-book-summary">
   <div className="px-summary-icon"><CalendarDays size={25}/></div>
   <h2>{selection?.name||'Your next visit'}</h2>
   <p>{selection?(mode==='online'?'Online consultation':'In-clinic visit'):'Choose a service to continue.'}</p>
   {selection && <p className="px-note">{selection.duration_minutes} minutes · UTC</p>}
   <p className="px-note">Sample services and availability. A time is reserved in the local database only after the server confirms it.</p>
  </aside></div>
  {exitOpen && <Sheet title="Leave booking?" onClose={()=>setExitOpen(false)} dismissible={!mutation.busy}><p className="px-note">The selected time has not been reserved. Leaving clears this booking selection.</p><button className="button primary full" onClick={()=>setExitOpen(false)}>Keep booking</button><Link className="button full" href="/book" onClick={()=>{setExitOpen(false);setChosenSlot(null);setQuery('');}}>Leave booking</Link></Sheet>}
 </Shell>;
}
