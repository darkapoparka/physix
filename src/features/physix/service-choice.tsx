import Image from 'next/image';
import {Check,ChevronRight} from 'lucide-react';
import {homeServices} from './home-content';
import styles from './service-choice.module.css';

export function ServiceChoice({name,selected,onSelect,detail}:{name:string;selected:boolean;onSelect:()=>void;detail?:string}) {
 const presentation=homeServices.find(service=>service.name===name);
 return <button type="button" className={styles.choice} aria-pressed={selected} aria-label={'Book '+name} onClick={onSelect}>
  <span className={styles.photo}><Image src={presentation?.photo||'/physix/movement.jpg'} alt="" fill sizes="48px"/></span>
  <span className={styles.label}><strong>{presentation?.label||name}</strong>{detail&&<small>{detail}</small>}</span>
  {selected?<Check size={16} aria-hidden="true"/>:<ChevronRight size={16} aria-hidden="true"/>}
 </button>;
}
