"use client";
import {useState} from 'react';
import {MediaTile} from './editorial-media';
import Link from 'next/link';
import {ArrowRight,Layers,LockKeyhole,CalendarDays,Video} from 'lucide-react';
import {Shell} from './shell';
import {Sheet,Row} from './ui';
import {ContextHeader} from './context-header';
import gateStyles from './account-gate.module.css';
export function PlanCatalogue({preview}:{preview:boolean}) {
 const [details,setDetails]=useState(false);
 return <Shell preview={preview}><div className="px-page-title"><p className="px-eyebrow">Keep moving, wherever you are</p><h1>Exercise programmes</h1><p>Discover a programme. Keep it with you.</p></div>{preview?<div className="px-catalogue-grid"><MediaTile onSelect={()=>setDetails(true)} image="movement" title="Movement, made personal." badge="Programme preview" detail="Explore the programme experience"/><div className="px-explainer"><Layers size={32}/><h2>Already have a plan?</h2><p>Purchased programmes and plans assigned by your practitioner live together in your account.</p><Link className="button primary" href="/care/programmes">Open My Plan<ArrowRight size={18}/></Link></div></div>:<div className="px-empty"><Layers size={34}/><h2>Programmes are being prepared.</h2><p>Only reviewed, published programmes will be available to purchase.</p><Link className="button" href="/book">Explore appointments</Link></div>}{details&&<Sheet title="Programme preview" onClose={()=>setDetails(false)}><h2>Movement, made personal.</h2><p className="px-note">This is an example product, not a clinical programme or an offer for sale.</p><div className="row-group"><Row href="/care/programmes" onClick={()=>setDetails(false)}>Open My Plan</Row><Row href="/book" onClick={()=>setDetails(false)}>Book a visit</Row></div><p className="px-note">Ready-made content may unlock after verified payment. A personal plan remains pending until the practitioner assigns it.</p><button className="button primary full" disabled>Purchases not available</button></Sheet>}</Shell>;
}
export function AccountGate({preview}:{preview:boolean}) {
 return <Shell preview={preview} contextual><ContextHeader title="My care"/><section className={gateStyles.panel} aria-labelledby="sign-in-title"><LockKeyhole size={26} aria-hidden="true"/><h2 id="sign-in-title">Sign in to My care</h2><p>Your appointments and exercise plans.</p><button type="button" disabled aria-describedby="sign-in-status">Sign in</button><p id="sign-in-status">Sign-in is not available yet.</p>{preview&&<Link href="/dev/demo">Explore the demo<ArrowRight size={18}/></Link>}<Link href="/book">Browse services</Link></section></Shell>;
}
export function ClinicInformation({page,preview}:{page:'about'|'first-visit';preview:boolean}) {
 return <Shell preview={preview}><div className="px-readable"><p className="px-eyebrow">PhysiX</p><h1>{page==='about'?'A space for your next step.':'Your first visit'}</h1><p className="px-intro">{page==='about'?'Physiotherapy, appointments and your exercise plan — brought together.':'Choose how you would like to meet.'}</p><div className="px-info-grid"><div><CalendarDays size={25}/><h2>In the clinic</h2><p>The clinic’s address, opening hours and first-visit instructions are awaiting confirmation.</p></div><div><Video size={25}/><h2>Online</h2><p>Online service availability and joining instructions will be published when confirmed.</p></div></div><p className="px-note">Practitioner identity, qualifications and clinic details have not been supplied for publication. We have not substituted a fictional profile.</p><Link className="button primary" href="/book">Explore services<ArrowRight size={18}/></Link></div></Shell>;
}
