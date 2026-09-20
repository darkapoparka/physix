"use client";
import Link from 'next/link';
import {useEffect,useState} from 'react';
import {useRouter} from 'next/navigation';
import {ArrowRight,ArrowUpRight,Layers} from 'lucide-react';
import {homeCareSummary,type HomeCareSummary} from '@/shared/physix/home-care';
import styles from './home.module.css';

export function HomeCare({summary}:{summary:HomeCareSummary}) {
  const router=useRouter();
  const [invalidated,setInvalidated]=useState<HomeCareSummary|null>(null);
  useEffect(()=>{
    const clear=()=>{setInvalidated(summary);router.refresh();};
    const restored=(event:PageTransitionEvent)=>{if(event.persisted)clear();};
    const channel=typeof BroadcastChannel==='undefined'?null:new BroadcastChannel('physix-local-identity');
    if(channel)channel.onmessage=clear;
    window.addEventListener('pageshow',restored);
    return()=>{channel?.close();window.removeEventListener('pageshow',restored);};
  },[router,summary]);
  const care=invalidated===summary?homeCareSummary(null):summary;
  return <section className={styles.care} aria-labelledby="home-care-title" data-home-care={care.state}>
    <div className={styles.careTop}><span><Layers size={18} aria-hidden="true"/>My care</span><ArrowUpRight size={19} aria-hidden="true"/></div>
    <div><h2 id="home-care-title">{care.title}</h2><p>{care.description}</p></div>
    {!!care.total&&<progress max={care.total} value={care.completed} aria-label={care.description}/>}
    <Link className={styles.careAction} href={care.href} aria-label={care.state==='assigned'?care.action:'Open my programmes'}>{care.action}<ArrowRight size={18} aria-hidden="true"/></Link>
  </section>;
}
