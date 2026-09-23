"use client";
import {useEffect,useState} from 'react';
import {useRouter} from 'next/navigation';
import {Shell} from './shell';
import {ContextHeader} from './context-header';
import {announceIdentity,localApi} from './local-api';
import styles from './account-gate.module.css';
export function HostedLoginForm({returnTo='/care',onSignedIn}:{returnTo?:string;onSignedIn?:()=>void}) {
 const router=useRouter();const [email,setEmail]=useState(''),[code,setCode]=useState(''),[sent,setSent]=useState(false),[busy,setBusy]=useState(false),[error,setError]=useState('');
 function done(){announceIdentity();if(onSignedIn)onSignedIn();else {router.replace(returnTo);router.refresh();}}
 useEffect(()=>{let active=true;void localApi('auth/refresh',{body:{}}).then(()=>{if(active){announceIdentity();if(onSignedIn)onSignedIn();else {router.replace(returnTo);router.refresh();}}}).catch(()=>undefined);return()=>{active=false;};},[onSignedIn,returnTo,router]);
 async function submit(){if(busy)return;setBusy(true);setError('');try {await localApi(sent?'auth/verify-code':'auth/request-link',{body:sent?{email,code}:{email,returnTo}});if(sent)done();else setSent(true);}catch(e){setError(e instanceof Error?e.message:'Please try again.');}finally{setBusy(false);}}
 return <form className="px-care-form" onSubmit={e=>{e.preventDefault();void submit();}}><label>Email<input type="email" autoComplete="email" required maxLength={254} value={email} disabled={busy||sent} onChange={e=>setEmail(e.target.value)}/></label>{sent&&<><p>Check your email for a sign-in link or enter its code here.</p><label>Email code<input inputMode="numeric" autoComplete="one-time-code" required pattern="[0-9]{6,10}" maxLength={10} value={code} onChange={e=>setCode(e.target.value)}/></label></>}<button className="button primary full" disabled={busy}>{busy?'Please wait…':sent?'Sign in':'Send sign-in email'}</button>{sent&&<button type="button" className="button full" disabled={busy} onClick={()=>{setSent(false);setCode('');}}>Change email</button>}{error&&<p role="alert" className="px-error">{error}</p>}</form>;
}
export function HostedLogin({returnTo,ready}:{returnTo:string;ready:boolean}) {return <Shell contextual><ContextHeader title="My care"/><section className={styles.panel}><h2>Sign in to My care</h2><p>Your appointments and exercise plans.</p>{ready?<HostedLoginForm returnTo={returnTo}/>:<p>Email sign-in is being configured.</p>}</section></Shell>;}
