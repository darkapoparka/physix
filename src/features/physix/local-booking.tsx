"use client";
import {useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {ArrowRight,CalendarDays,Check,ChevronLeft,MapPin,Search,Video} from 'lucide-react';
import type {AvailableSlot,LocalAccount,ServiceOffer} from '@/shared/physix/contracts';
import {Shell} from './shell';
import {serviceCandidates,type VisitMode} from './catalogue';
import {announceIdentity,localApi,useSavedCommand,useSavedResource} from './local-api';
import {matchesSearch} from '@/shared/physix/demo';
export function LocalBooking({publicEntry=false,initialMode='in_clinic',initialQuery='',initialService=''}:{publicEntry?:boolean;initialMode?:VisitMode;initialQuery?:string;initialService?:string}){
 const [mode,setMode]=useState<VisitMode>(initialMode),[query,setQuery]=useState(initialQuery);
 const [offerId,setOfferId]=useState(''),[step,setStep]=useState(0);
 const [day,setDay]=useState(()=>new Date(Date.now()+86400000).toISOString().slice(0,10));
 const [slot,setSlot]=useState<AvailableSlot|null>(null),[confirmation,setConfirmation]=useState('');
 const [loginError,setLoginError]=useState(''),[signingIn,setSigningIn]=useState(false);
 const offers=useSavedResource<ServiceOffer[]>('offers'),account=useSavedResource<LocalAccount>('me'),mutation=useSavedCommand();
 const candidates=(offers.data||[]).filter(s=>s.modes.includes(mode)&&matchesSearch(s.name,query));
 const selection=candidates.find(s=>s.id===offerId)||(!offerId?candidates.find(s=>s.name===serviceCandidates.find(c=>c.id===initialService)?.name):undefined);
 const slots=useSavedResource<AvailableSlot[]>(selection&&step===1?'slots?'+new URLSearchParams({offerId:selection.id,mode,day}):null);
 const [days]=useState(()=>Array.from({length:7},(_,i)=>new Date(Date.now()+(i+1)*86400000).toISOString().slice(0,10)));
 const format=(date:string,options:Intl.DateTimeFormatOptions)=>new Date(date.length===10?date+'T12:00:00Z':date).toLocaleString('en-GB',{...options,timeZone:'UTC'});
 async function enter(){if(signingIn)return;setSigningIn(true);setLoginError('');try{await localApi('auth/local',{body:{persona:'patient'}});announceIdentity();account.reload();}catch(error){setLoginError(error instanceof Error?error.message:'Could not open local account.');}finally{setSigningIn(false);}}
 async function reserve(){if(!selection||!slot)return;const result=await mutation.run('booking.reserve',{offerId:selection.id,mode,startsAt:slot.startsAt});if(result){setConfirmation(result.id);account.reload();}else slots.reload();}
 if(confirmation)return <Shell local={!publicEntry} preview={publicEntry} task><section className="px-booking-result">
  <div className="px-summary-icon"><Check size={28}/></div><h1>Test visit reserved.</h1><p>{selection?.name}</p>
  <p>{slot&&format(slot.startsAt,{weekday:'long',day:'numeric',month:'long',year:'numeric'})}</p>
  <p>{slot&&format(slot.startsAt,{hour:'2-digit',minute:'2-digit'})} – {slot&&format(slot.endsAt,{hour:'2-digit',minute:'2-digit'})} UTC · {mode==='online'?'Online':'In clinic'}</p>
  <p className="px-note">Saved in the local test database. It remains after reload. This is not an appointment with the real clinic; no payment or message was sent.</p>
  <Link className="button primary full" href="/app/appointments">View saved appointments<ArrowRight size={18}/></Link><Link className="button full" href="/app">Open patient app</Link>
 </section></Shell>;
 return <Shell local={!publicEntry} preview={publicEntry} task={step>0}>
  {step>0&&<button className="px-text-link" onClick={()=>setStep(n=>n-1)}><ChevronLeft size={18}/>Back</button>}
  <div className="px-care-heading"><h1>{step===0?'Book a visit':step===1?'Choose a time':'Review your visit'}</h1><p>{step===1?format(day,{month:'long',year:'numeric'})+' · UTC':'Local test availability · UTC'}</p></div>
  <div className="px-book-layout"><section aria-busy={step===0?offers.loading:step===1?slots.loading:mutation.busy}>
   {step===0?<>
    <div className="px-segment" role="group" aria-label="Appointment type">{(['in_clinic','online'] as const).map(m=><button key={m} aria-pressed={mode===m} onClick={()=>{setMode(m);setOfferId('');setSlot(null);}}>{m==='online'?<Video size={18}/>:<MapPin size={18}/>} {m==='online'?'Online':'In clinic'}</button>)}</div>
    <div className="px-search"><Search size={20}/><label className="sr-only" htmlFor="service-search">Search services</label><input id="service-search" type="search" value={query} placeholder="Search services" onChange={e=>{setQuery(e.target.value);setOfferId('');setSlot(null);}}/></div>
    <div className="px-section-title"><h2>Choose your service</h2></div>
    <div className="px-service-list">{candidates.map(s=><button type="button" className="px-service-choice" key={s.id} aria-pressed={selection?.id===s.id} onClick={()=>{setOfferId(s.id);setSlot(null);}}>
     <span className="px-service-photo"><Image src={serviceCandidates.find(c=>c.name===s.name)?.image||'/physix/movement.jpg'} alt="" fill sizes="88px"/></span>
     <span><strong>{s.name}</strong><small>{s.duration_minutes} min · sample service</small></span><span className="px-select-circle">{selection?.id===s.id?<Check size={17}/>:<ArrowRight size={17}/>}</span>
    </button>)}</div>
    {!candidates.length&&!offers.loading&&!offers.error&&<div className="px-empty"><h2>No matching services</h2><button className="button" onClick={()=>{setQuery('');setMode('in_clinic');}}>Clear filters</button></div>}
    {offers.error&&<p role="alert" className="px-error">{offers.error}</p>}
   </>:step===1?<>
    <div className="px-local-dates" aria-label="Choose appointment day">
     {days.map(d=><button key={d} aria-label={format(d,{weekday:'long',day:'numeric',month:'long',year:'numeric'})} aria-pressed={d===day} onClick={()=>{setDay(d);setSlot(null);}}>
      <small>{format(d,{weekday:'short'})}</small><strong>{Number(d.slice(-2))}</strong>
     </button>)}
    </div>
    <div className="px-section-title"><h2>Available times</h2><span className="px-note">UTC</span></div>
    {slots.loading?<p role="status">Loading available times…</p>:<div className="px-booking-times">
     {slots.data?.map(s=><button key={s.startsAt} aria-pressed={s.startsAt===slot?.startsAt} onClick={()=>setSlot(s)}>
      {format(s.startsAt,{hour:'2-digit',minute:'2-digit'})}
      {s.startsAt===slot?.startsAt&&<Check size={15}/>}
     </button>)}
    </div>}
    {slots.error&&<p role="alert" className="px-error">{slots.error}</p>}
    {!slots.loading&&!slots.error&&!slots.data?.length&&<p>No times available. Choose another day.</p>}
    <button className="button primary full" disabled={!slot||slots.loading} onClick={()=>setStep(2)}>
     Continue<ArrowRight size={18}/>
    </button>
   </>:<>
    <div className="px-review-card">
     <div><small>Service</small><strong>{selection?.name}</strong></div>
     <div><small>Visit type</small><strong>{mode==='online'?'Online':'In clinic'}</strong></div>
     <div><small>When</small>
      <strong>{slot&&format(slot.startsAt,{weekday:'long',day:'numeric',month:'long',year:'numeric'})}</strong>
      <p>{slot&&format(slot.startsAt,{hour:'2-digit',minute:'2-digit'})} – {slot&&format(slot.endsAt,{hour:'2-digit',minute:'2-digit'})} UTC</p>
      <button className="px-text-link" onClick={()=>setStep(1)}>Change time</button>
     </div>
     <div><small>Patient</small><strong>{account.data?.account.user.display_name||'Local test account required'}</strong></div>
     <div><small>Payment</small><strong>None — local test only</strong></div>
    </div>
    {!account.data?<>
     <p className="px-note">Use a synthetic patient to test saving a reservation. No real personal details are needed.</p>
     <button className="button primary full" disabled={signingIn||account.loading} onClick={()=>void enter()}>
      {signingIn?'Opening…':'Use local test patient'}
     </button>
     {loginError&&<p role="alert" className="px-error">{loginError}</p>}
    </>:<button className="button primary full" disabled={mutation.busy||!slot} onClick={()=>void reserve()}>
     {mutation.busy?'Reserving…':'Reserve test visit'}<Check size={18}/>
    </button>}
    {mutation.error&&<><p role="alert" className="px-error">{mutation.error}</p>
     <button className="button full" onClick={()=>{setStep(1);setSlot(null);}}>Choose another time</button>
    </>}
   </>}
  </section><aside className="px-book-summary">
   <div className="px-summary-icon"><CalendarDays size={25}/></div>
   <h2>{selection?.name||'Your next visit'}</h2>
   <p>{selection?(mode==='online'?'Online consultation':'In-clinic visit'):'Choose a service to continue.'}</p>
   {step===0&&<button className="button primary full" disabled={!selection} onClick={()=>setStep(1)}>
    View availability<ArrowRight size={18}/>
   </button>}
   <p className="px-note">Sample services and availability. A time is reserved in the local database only after the server confirms it.</p>
  </aside></div>
 </Shell>;
}
