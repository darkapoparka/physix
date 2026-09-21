"use client";
import Link from 'next/link';
import {useEffect,useState} from 'react';
import {useRouter} from 'next/navigation';
import {ArrowRight, ArrowUpRight, Layers} from 'lucide-react';
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
  const hasProgress = typeof care.total === 'number' && care.total > 0 && care.completed !== undefined;
  return (
    <section className={styles.care} aria-labelledby="home-care-title" data-home-care={care.state}>
      <div className={styles.careBody}>
        <span className={styles.careEyebrow}><Layers size={17} aria-hidden="true"/>My care</span>
        <h2 id="home-care-title">{care.title}</h2>
        <p>{care.description}</p>
        {hasProgress && <div className={styles.careProgress}>
          <progress max={care.total} value={care.completed} aria-label={care.description}/>
        </div>}
      </div>
      <div className={styles.careActions}>
        <Link className={styles.careAction} href={care.href}>
          <span>{care.action}</span><ArrowUpRight size={18} aria-hidden="true"/>
        </Link>
        {care.state !== 'assigned' && <Link className={styles.careExplore} href="/plans">
          <span>Explore programmes</span><ArrowRight size={16} aria-hidden="true"/>
        </Link>}
      </div>
    </section>
  );
}
