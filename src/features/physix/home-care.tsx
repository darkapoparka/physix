"use client";
import Link from 'next/link';
import {useEffect,useState} from 'react';
import {useRouter} from 'next/navigation';
import {ArrowRight} from 'lucide-react';
import {homeCareSummary,type HomeCareSummary} from '@/shared/physix/home-care';
import styles from './home.module.css';
import {HomeArtwork} from './home-artwork';

export function HomeCare({summary, preview = false}:{summary:HomeCareSummary;preview?:boolean}) {
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
  const percentage = care.total && care.completed !== undefined ? Math.round(care.completed / care.total * 100) : null;
  return <section className={styles.care} aria-labelledby="home-care-title" data-home-care={care.state}>
    {preview && <HomeArtwork name="care-cover" className={styles.carePhoto}/>}
    <div className={styles.careBody}>
      <span className={styles.careEyebrow}>My care</span>
      <h2 id="home-care-title">{care.title}</h2><p>{care.description}</p>
      {percentage !== null && <div className={styles.careProgress}>
        <progress max={care.total} value={care.completed} aria-label={care.description}/><span>{percentage}%</span>
      </div>}
      <Link className={styles.careAction} href={care.href} aria-label={care.state === 'assigned' ? care.action : 'Open my programmes'}>
        {care.action}<ArrowRight size={18} aria-hidden="true"/>
      </Link>
    </div>
    <p className={styles.careMotto} aria-hidden="true">Small<br/>steps.<br/>Big<br/>progress.<span/></p>
  </section>;
}
