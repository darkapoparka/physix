"use client";
import Link from 'next/link';
import Image from 'next/image';
import {usePathname} from 'next/navigation';
import {useState,type ReactNode} from 'react';
import {Home,CalendarDays,Layers,ChartNoAxesColumnIncreasing,ArrowUpRight,UserRound,ChevronRight} from 'lucide-react';
import {Row,Sheet} from './ui';
import {MobileDock} from './mobile-dock';
export function Shell({children,demo=false,preview=false,focused=false,task=false,local=false}:{children:ReactNode;demo?:boolean;preview?:boolean;focused?:boolean;task?:boolean;local?:boolean}) {
 const pathname=usePathname();const [menu,setMenu]=useState(false);
 const base=local?'/app':'/dev/demo';
 const links=(demo||local)?[
 {href:base,label:'Home',icon:Home},
 {href:base+'/book',label:'Book',icon:CalendarDays},
 {href:base+'/plans',label:'My Plan',icon:Layers},
 {href:base+'/progress',label:'Progress',icon:ChartNoAxesColumnIncreasing},
 ]:[{href:'/',label:'Home',icon:Home},{href:'/book',label:'Book',icon:CalendarDays},{href:'/plans',label:'Plans',icon:Layers}];
 const active=(href:string)=>(local&&pathname.startsWith(base+'/sessions/')&&href===base+'/plans')||(local&&pathname.startsWith(base+'/appointments')&&href===base+'/book')||pathname===href||(href!=='/'&&href!==base&&pathname.startsWith(href+'/'));
 return <div className={'px-theme'+(focused?' px-focused':'')+(task?' px-task':'')+(local?' px-saved':'')}>
 <a className="skip-link" href="#main">Skip to content</a>
 {(demo||preview||local)&&<div className="px-preview">{local?'Local test · saved on this PC':demo?'Synthetic patient demo · this tab only':'Local design preview · services & imagery are provisional'}{demo?<Link href="/">Exit demo <ArrowUpRight size={12}/></Link>:null}</div>}
 {!focused&&!task&&<header className="px-topbar"><Link href={(demo||local)?base:'/'} className="px-brand" aria-label="PhysiX home">{preview||demo||local?<Image src="/physix/wordmark.png" alt="PhysiX" width={109} height={35} unoptimized/>:<span>physi<span className="px-brand-x">X</span></span>}</Link><nav className="px-desktop-nav" aria-label="Desktop navigation">{links.map(item=><Link key={item.href} href={item.href} aria-current={active(item.href)?'page':undefined}>{item.label}</Link>)}<button type="button" aria-haspopup="dialog" onClick={()=>setMenu(true)}>Menu</button></nav><Link className="px-account" aria-label={demo||local?'My care':'Your account'} href={local?'/app/profile':demo?'/dev/demo/plans':'/app'}><UserRound size={19}/><span>{demo||local?'My care':'Your account'}</span></Link></header>}
 <main id="main" className="px-main" tabIndex={-1}>{children}</main>
 {!focused&&!task&&<MobileDock links={links} isActive={active} menuOpen={menu} onMenu={()=>setMenu(true)}/> }
 {menu&&<Sheet title="Menu" onClose={()=>setMenu(false)}><div className="row-group">{local?<><Row onClick={()=>setMenu(false)} href="/app/appointments">Appointments</Row><Row onClick={()=>setMenu(false)} href="/app/plans">My Plan</Row><Row onClick={()=>setMenu(false)} href="/app/progress">Progress & history</Row><Row onClick={()=>setMenu(false)} href="/app/check-ins">Check-in</Row><Row onClick={()=>setMenu(false)} href="/app/profile">Account</Row></>:null}{demo?<><Row onClick={()=>setMenu(false)} href="/dev/demo/plans">My plan</Row><Row onClick={()=>setMenu(false)} href="/dev/demo/progress">Activity</Row></>:null}<Row onClick={()=>setMenu(false)} href={demo||local?base+'/book':'/book'}>Book a visit</Row><Row onClick={()=>setMenu(false)} href="/plans">Explore programmes</Row><Row onClick={()=>setMenu(false)} href="/about">About PhysiX</Row><Row onClick={()=>setMenu(false)} href="/first-visit">Your first visit</Row><Row onClick={()=>setMenu(false)} href="/app">Your account</Row></div>{demo&&<p className="px-note">Example records only. No clinic, booking or payment services are connected.</p>}</Sheet>}
 </div>;
}
export function SectionTitle({title,href,label='View all'}:{title:string;href?:string;label?:string}){return <div className="px-section-title"><h2>{title}</h2>{href&&<Link href={href}>{label}<ChevronRight size={16}/></Link>}</div>;}