import Image from 'next/image';
import Link from 'next/link';
import {ArrowUpRight,CalendarDays,Video,Search,ArrowRight,Layers,ChevronRight} from 'lucide-react';
import {Shell,SectionTitle} from './shell';
import {serviceCandidates} from './catalogue';
export function PublicHome({preview}:{preview:boolean}) {
 return <Shell preview={preview}><div className="px-home-grid">
 <section className="px-welcome"><p className="px-eyebrow">Physiotherapy & movement</p><h1>Move better.<br/>Every day.</h1><p className="px-intro">Your visits, your exercises.<br className="px-mobile-only"/> One place to keep moving.</p>
 <form className="px-search" action="/book" role="search"><Search size={20}/><label className="sr-only" htmlFor="home-search">Search services</label><input id="home-search" name="q" type="search" placeholder="Find a service" autoComplete="off"/><button type="submit" aria-label="Search services"><ArrowRight size={20}/></button></form>
 <div className="px-entry-grid"><Link href="/book" className="px-entry"><CalendarDays size={22}/><span>Book a visit</span><ArrowUpRight size={19}/></Link><Link href="/book?mode=online" className="px-entry px-entry-light"><Video size={22}/><span>Online consult</span><ArrowUpRight size={19}/></Link></div>
 </section>
 <section className="px-hero-card">{preview?<Image className="px-hero-photo" src="/physix/movement.jpg" alt="Generated illustration of a movement assessment; not the PhysiX clinic" width={1408} height={1056} priority/>:<div className="px-unpublished-media"><Layers size={48}/></div>}<div className="px-hero-copy"><div><p className="px-eyebrow">A little more movement</p><h2>Care, built around you.</h2></div><Link href="/book" className="px-circle" aria-label="Explore appointments"><ArrowUpRight size={24}/></Link></div></section>
 <section className="px-service-section"><SectionTitle title="How we can help" href="/book"/>{preview?<div className="px-mini-services">{serviceCandidates.map(s=><Link key={s.id} href={'/book?service='+s.id} className="px-mini-service"><span className="px-mini-photo"><Image src={s.image} alt="" fill sizes="(min-width: 1000px) 350px, (min-width: 700px) 30vw, (max-width: 359px) 79px, 30vw"/></span><div><h3>{s.name}</h3><ChevronRight size={18}/></div></Link>)}</div>:<p className="px-note">The clinic is preparing its service catalogue.</p>}</section>
 <section className="px-plan-invite"><div className="px-invite-icon"><Layers size={28}/></div><div><p className="px-eyebrow">Beyond the appointment</p><h2>Your plan.<br/>At your pace.</h2><p>Find your assigned and purchased programmes in your account.</p><Link href={preview?'/dev/demo':'/login'} className="px-text-link">{preview?'Explore the patient demo':'Open your account'}<ArrowRight size={18}/></Link></div></section>
 <div className="px-practical"><Link href="/first-visit">Your first visit<ArrowUpRight size={18}/></Link><Link href="/about">Meet PhysiX<ArrowUpRight size={18}/></Link></div>
 </div></Shell>;
}