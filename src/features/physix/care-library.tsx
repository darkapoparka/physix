"use client";
import Link from 'next/link';
import {useState} from 'react';
import {useRouter} from 'next/navigation';
import {Search, Layers, ArrowRight, ChevronLeft, Play, Check, Clock3} from 'lucide-react';
import type {LocalAccount} from '@/shared/physix/contracts';
import type {ScheduledWorkout} from '@/shared/gymaf/contracts';
import {programmesFor} from '@/shared/physix/programmes';
import {Shell, SectionTitle} from './shell';
import {SavedPending} from './local-patient';
import {CareNavigation} from './care-navigation';
import {ProgrammeCard} from './programme-card';
import {Row} from './ui';
import {useSavedResource, useSavedCommand} from './local-api';
import styles from './care-hub.module.css';

export function ProgrammeLibrary({id}: {id?: string}) {
  const resource = useSavedResource<LocalAccount>('me');
  const mutation = useSavedCommand(), router = useRouter();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'finished'>('all');
  if (!resource.data) return <Shell local><SavedPending error={resource.error} reload={resource.reload}/></Shell>;
  const data = resource.data, programmes = programmesFor(data), selected = programmes.find(p => p.id === id);
  const visible = programmes.filter(p => (filter === 'all' || p.status === filter) && p.title.toLowerCase().includes(query.toLowerCase().trim()));
  async function start(workout: ScheduledWorkout) {
    const attempt = data.relationship?.sessions.find(s => s.scheduled_workout_id === workout.id && (s.state === 'paused' || s.state === 'in_progress'));
    if (attempt) {router.push('/app/sessions/' + attempt.id); return;}
    const result = await mutation.run('care.start', {scheduledId: workout.id});
    if (result) router.push('/app/sessions/' + result.id);
  }
  return <Shell local>
    <div className="px-care-heading">
      {id && <Link className="px-text-link" href="/app/plans"><ChevronLeft size={17}/>Programmes</Link>}
      <h1>{id ? selected?.title || 'Programme unavailable' : 'Your programmes'}</h1>
      {!id && <p>Your plans, sessions and saved progress.</p>}
    </div>
    <CareNavigation active="plans"/>
    {id ? selected ? <div className={styles.detail}>
      <div><ProgrammeCard programme={selected}/>
        <dl className={styles.facts}>
          <div><dt>Assigned by</dt><dd>{data.relationship?.relationship.coach_name || 'Your practitioner'}</dd></div>
          <div><dt>Plan version</dt><dd>{selected.version}</dd></div>
          <div><dt>Schedule</dt><dd>{selected.startsOn} – {selected.endsOn}</dd></div>
          <div><dt>Access</dt><dd>{data.relationship?.can_train ? 'Available in care' : 'Read-only'}</dd></div>
        </dl>
      </div>
      <section>
        <div className={styles.nextPanel}>
          <Layers size={23} aria-hidden="true"/>
          <h2>{selected.next ? 'Your next session' : 'Saved programme'}</h2>
          <p>{selected.next?.prescription.title || (selected.total ? 'All scheduled sessions have been recorded.' : 'No active sessions in this assignment.')}</p>
          {selected.next && <button className="button primary full" disabled={mutation.busy || !data.relationship?.can_train} onClick={() => void start(selected.next!)}>
            <Play size={17}/>{mutation.busy ? 'Opening…' : selected.sessions.some(s => s.scheduled_workout_id === selected.next?.id && ['paused','in_progress'].includes(s.state)) ? 'Resume session' : 'Start session'}
          </button>}
        </div>
        <SectionTitle title="Sessions" href="/app/schedule" label="Schedule"/>
        <div className="row-group">{selected.workouts.map((w, index) => <Row key={w.id} href={'/app/workouts/' + w.id}
          icon={w.state === 'completed' ? <Check size={20}/> : <span className="px-exercise-number">{String(index+1).padStart(2,'0')}</span>}
          detail={w.scheduled_date + ' · ' + (w.state === 'completed' ? 'Finished' : w.state === 'canceled' ? 'Cancelled' : 'Scheduled') + ' · ' + w.prescription.exercises.length + ' exercises'}>{w.prescription.title}</Row>)}</div>
        <SectionTitle title="Saved attempts"/>
        <div className="row-group">{selected.sessions.length ? selected.sessions.map(s => <Row key={s.id} href={'/app/sessions/' + s.id} icon={<Clock3 size={19}/>}
          detail={s.started_at.slice(0,10) + ' · ' + s.state.replaceAll('_',' ') + ' · ' + Math.floor(s.elapsed_seconds/60) + ' min'}>{s.prescription.title}</Row>) : <p className="px-note">Your attempts will appear here after you start a session.</p>}</div>
        <p className={styles.footnote}>Recorded activity is not a recovery score. Sample plan content in this local test.</p>
      </section>
    </div> : <div className="px-empty"><h2>This programme is not available.</h2><Link className="button" href="/app/plans">Your programmes</Link></div> : <>
      <div className={styles.toolbar}>
        <label className={'px-search ' + styles.search}><Search size={18}/><span className="sr-only">Search your programmes</span>
          <input type="search" placeholder="Search your programmes" value={query} onChange={e=>setQuery(e.target.value)}/>
        </label>
        <div className={styles.filters} role="group" aria-label="Filter programmes">{(['all','active','finished'] as const).map(value => <button type="button" key={value} aria-pressed={value === filter} onClick={()=>setFilter(value)}>
          {value === 'all' ? 'All' : value === 'active' ? 'In progress' : 'Sessions finished'}
        </button>)}</div>
      </div>
      <p className={styles.count} role="status">{visible.length} {visible.length === 1 ? 'programme' : 'programmes'}</p>
      {visible.length ? <div className={styles.programmeGrid}>{visible.map((p,i) => <ProgrammeCard key={p.id} programme={p} index={i}/>)}</div> : <div className="px-empty">
        <Layers size={32}/><h2>{programmes.length ? 'No matching programmes.' : 'No plan assigned yet.'}</h2>
        <p>{programmes.length ? 'Try another search or view all programmes.' : 'Plans assigned by your practitioner will appear here.'}</p>
        {programmes.length ? <button className="button" onClick={()=>{setFilter('all');setQuery('');}}>Clear filters</button> : <Link className="button" href="/app/book">Book a visit<ArrowRight size={17}/></Link>}
      </div>}
      <Link href="/plans" className={styles.explore}><Layers size={23}/><span><strong>Explore programmes</strong><small>Browse the public programme catalogue</small></span><ArrowRight size={18}/></Link>
    </>}
    {mutation.error && <p className="px-error" role="alert">{mutation.error}</p>}
  </Shell>;
}
