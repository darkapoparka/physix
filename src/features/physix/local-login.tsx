"use client";
import {useState} from 'react';
import {useRouter} from 'next/navigation';
import Link from 'next/link';
import {ArrowRight,UserRound} from 'lucide-react';
import {Shell} from './shell';
import {announceIdentity,localApi} from './local-api';
export function LocalLogin(){
 const router=useRouter(),[busy,setBusy]=useState(false),[error,setError]=useState('');
 async function enter(persona:'patient'|'other'|'practitioner'){
  if(busy)return;setBusy(true);setError('');
  try{await localApi('auth/local',{body:{persona}});announceIdentity();router.replace(persona==='practitioner'?'/practitioner':'/app');router.refresh();}
  catch(failure){setError(failure instanceof Error?failure.message:'Sign-in failed.');setBusy(false);}
 }
 return <Shell preview><section className="px-account-gate"><UserRound size={28}/><p className="px-eyebrow">Local test accounts</p><h1>Your care,<br/>all together.</h1><p>Try saved workouts, history and bookings. These synthetic accounts store their records on this PC, not in the clinic.</p><button className="button primary full" disabled={busy} onClick={()=>void enter('patient')}>Open patient app<ArrowRight size={18}/></button><button className="button full" disabled={busy} onClick={()=>void enter('practitioner')}>Open practitioner view</button><button className="button full" disabled={busy} onClick={()=>void enter('other')}>Open second test patient</button>{error&&<p className="px-error" role="alert">{error}</p>}<p className="px-note">Development only. Do not enter real patient information. Real authentication and clinic services are not connected.</p><Link className="px-text-link" href="/dev/demo">Open the old visual-only demo</Link></section></Shell>;
}
