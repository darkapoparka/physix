"use client";
import Link from 'next/link';
import {useState} from 'react';
import type {RelationshipDetail,SessionDetail,WorkspaceDetail} from '@/shared/gymaf/contracts';
import type {LocalAccount} from '@/shared/physix/contracts';
import {Shell,SectionTitle} from './shell';
import {Row} from './ui';
import {SavedPending} from './local-patient';
import {useSavedCommand,useSavedResource} from './local-api';
export function LocalPractitioner({workspaceId,view='calendar',relationshipId}:{workspaceId:string;view?:'calendar'|'patients'|'plans';relationshipId?:string}){
 const resource=useSavedResource<WorkspaceDetail>('workspace/'+workspaceId),account=useSavedResource<LocalAccount>('me');
 const mutation=useSavedCommand(),[patient,setPatient]=useState(''),[version,setVersion]=useState(''),[notice,setNotice]=useState('');
 const [date,setDate]=useState(()=>new Date().toISOString().slice(0,10));
 if(!resource.data)return <Shell local task><SavedPending error={resource.error} reload={resource.reload}/></Shell>;
 const data=resource.data;
 return <Shell local task><div className="px-care-heading"><p className="px-eyebrow">Practitioner · local test</p><h1>{relationshipId?'Patient care':view==='calendar'?'Clinic calendar':view==='patients'?'Your patients':'Plan assignments'}</h1></div><nav className="px-staff-nav" aria-label="Practitioner sections"><Link href="/practitioner">Calendar</Link><Link href="/practitioner/patients">Patients</Link><Link href="/practitioner/plans">Assign a plan</Link><Link href="/login">Switch test account</Link></nav>
 {relationshipId?<PatientReview id={relationshipId}/>:view==='calendar'?<div className="row-group">{account.data?.appointments.length?account.data.appointments.map(a=><article className="px-care-appointment" key={a.id}><h2>{a.service_name}</h2><p>{new Date(a.starts_at).toLocaleString('en-GB',{timeZone:'UTC',dateStyle:'full',timeStyle:'short'})} UTC</p><p>{data.clients.find(c=>c.client_user_id===a.patient_id)?.client_name||'Test account'} · {a.mode==='online'?'Online':'In clinic'} · {a.state}</p></article>):<div className="px-empty"><h2>No appointments yet.</h2><p>Appointments saved by a test patient appear here.</p></div>}<p className="px-note">This local calendar uses sample availability. Real clinic hours, rescheduling and notification delivery are not configured.</p></div>:
 view==='patients'?<div className="row-group">{data.clients.map(c=><Row key={c.id} href={'/practitioner/patients/'+c.id} detail={c.state==='active'?'Active care relationship':c.state}>{c.client_name}</Row>)}</div>:
 <form className="px-care-form" onSubmit={async e=>{e.preventDefault();const result=await mutation.run('care.assign',{versionId:version,relationshipId:patient,startDate:date});if(result){setNotice('Plan assigned and saved. The patient can now open these sessions.');resource.reload();}}}><p className="px-note">Assign an existing immutable sample version. This is not clinical content authoring or approval.</p><label>Patient<select required value={patient} onChange={e=>{setPatient(e.target.value);setNotice('');}}><option value="">Choose a patient</option>{data.clients.map(c=><option key={c.id} value={c.id}>{c.client_name}</option>)}</select></label><label>Published version<select required value={version} onChange={e=>{setVersion(e.target.value);setNotice('');}}><option value="">Choose a version</option>{data.versions.map(v=><option key={v.id} value={v.id}>{v.title} · version {v.version}</option>)}</select></label><label>Start date<input required type="date" value={date} onChange={e=>{setDate(e.target.value);setNotice('');}}/></label><button className="button primary full" disabled={mutation.busy||!patient||!version||!!notice}>{mutation.busy?'Assigning…':'Assign plan'}</button>{notice&&<p role="status">{notice}</p>}{mutation.error&&<p className="px-error" role="alert">{mutation.error}</p>}</form>}
 </Shell>;
}
function PatientReview({id}:{id:string}){
 const resource=useSavedResource<RelationshipDetail>('relationships/'+id),[attempt,setAttempt]=useState('');
 if(!resource.data)return <SavedPending error={resource.error} reload={resource.reload}/>;
 const data=resource.data;
 return <><h2>{data.client.display_name}</h2><SectionTitle title="Assigned sessions"/><div className="row-group">{data.workouts.map(w=><article className="row" key={w.id}><div className="row-copy"><span>{w.prescription.title}</span><small>{w.scheduled_date} · {w.state}</small></div></article>)}{!data.workouts.length&&<p>No assigned sessions.</p>}</div><SectionTitle title="Saved session history"/><div className="row-group">{data.sessions.map(s=><Row key={s.id} onClick={()=>setAttempt(s.id)} detail={s.state+' · '+Math.floor(s.elapsed_seconds/60)+' min'}>{s.prescription.title}</Row>)}{!data.sessions.length&&<p>No recorded sessions.</p>}</div>{attempt&&<ReadOnlyAttempt id={attempt}/>}<SectionTitle title="Shared check-ins"/><div className="row-group">{data.check_ins.map(c=><article className="px-care-appointment" key={c.id}><h2>{c.week_start}</h2><p>Self-reported difficulty · {c.difficulty}/10</p><p>{c.body}</p></article>)}{!data.check_ins.length&&<p>No check-ins shared.</p>}</div></>;
}
function ReadOnlyAttempt({id}:{id:string}){
 const resource=useSavedResource<SessionDetail>('sessions/'+id);
 if(!resource.data)return <SavedPending error={resource.error} reload={resource.reload}/>;
 return <section className="px-care-appointment"><h2>Recorded actuals</h2><p className="px-note">Read-only practitioner view</p>{resource.data.sets.map(s=><p key={s.id}>{resource.data?.session.prescription.exercises.find(e=>e.id===s.exercise_id)?.name} · Set {s.set_index+1} · {s.skipped?'Skipped':[s.actual_reps!==null?s.actual_reps+' reps':'',s.duration_seconds!==null?s.duration_seconds+' sec':'',s.load_kg!==null?s.load_kg+' kg':''].filter(Boolean).join(' · ')}</p>)}</section>;
}
