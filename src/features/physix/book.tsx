"use client";
import {useState} from 'react';
import Link from 'next/link';
import {ArrowRight,Search,MapPin,Video,CalendarDays} from 'lucide-react';
import {Shell} from './shell';
import {ContextHeader} from './context-header';
import {Sheet} from './ui';
import {serviceCandidates,type VisitMode} from './catalogue';
import {matchesSearch} from '@/shared/physix/demo';
import styles from './booking-flow.module.css';
import {ServiceChoice} from './service-choice';
export function BookScreen({preview,demo=false,initialMode='in_clinic',initialQuery='',initialService='',onContinue}:{preview:boolean;demo?:boolean;initialMode?:VisitMode;initialQuery?:string;initialService?:string;onContinue?:(serviceId:string,mode:VisitMode)=>void}) {
 const [mode,setMode]=useState<VisitMode>(initialMode),[query,setQuery]=useState(initialQuery),[selected,setSelected]=useState(initialService),[availability,setAvailability]=useState(false);
 const candidates=serviceCandidates;
 const available=candidates.filter(s=>(s.modes as readonly string[]).includes(mode)&&matchesSearch(s.name+' '+s.search,query));
 const selection=available.find(s=>s.id===selected);
 function changeMode(next:VisitMode){setMode(next);setSelected('');setAvailability(false);}
 return <Shell preview={preview} demo={demo} contextual><ContextHeader title="Book a visit" action={<Link href="/care/appointments"><CalendarDays size={16}/>My visits</Link>}/><div className={styles.browse}><section>
 <div className="px-segment" role="group" aria-label="Appointment type"><button type="button" aria-pressed={mode==='in_clinic'} onClick={()=>changeMode('in_clinic')}><MapPin size={18}/>In clinic</button><button type="button" aria-pressed={mode==='online'} onClick={()=>changeMode('online')}><Video size={18}/>Online</button></div>
 <div className="px-search"><Search size={20}/><label htmlFor="service-search" className="sr-only">Search services</label><input id="service-search" value={query} onChange={e=>{setQuery(e.target.value);setSelected('');}} type="search" placeholder="Search services" autoComplete="off"/></div>
 <div className="px-section-title"><h2>Choose your service</h2><span className="px-count" aria-live="polite">{available.length}</span></div>
 <div className="px-service-list">{available.map(s=><ServiceChoice key={s.id} name={s.name} selected={selected===s.id} onSelect={()=>setSelected(s.id)}/>)}</div>
 {!available.length&&<div className="px-empty"><Search size={28}/><h2>No matches</h2><button className="button" onClick={()=>{setQuery('');changeMode('in_clinic');}}>Clear search</button></div>}
 <div className={styles.browseAction}><button className="button primary full" disabled={!selection} onClick={()=>{if(selection&&onContinue)onContinue(selection.id,mode);else setAvailability(true);}}>{demo?'Choose a time':'View availability'}<ArrowRight size={18}/></button></div></section></div>
 {availability&&selection&&<Sheet title="Availability" onClose={()=>setAvailability(false)}><div className="px-availability"><CalendarDays size={36}/><h3>{selection.name}</h3><p>{mode==='online'?'Online':'In clinic'}</p><h2>Bookings coming soon</h2>{preview&&<Link className="button primary full" href={'/dev/demo/book?service='+selection.id+'&mode='+mode}>Try the booking demo<ArrowRight size={18}/></Link>}<button className="button full" onClick={()=>setAvailability(false)}>Back to services</button></div></Sheet>}
 </Shell>;
}
