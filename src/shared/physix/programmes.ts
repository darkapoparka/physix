import type {ScheduledWorkout, WorkoutSession} from '../gymaf/contracts';
import type {LocalAccount, ProgrammeRecord} from './contracts';

export type Programme = ProgrammeRecord & {
  workouts: ScheduledWorkout[]; sessions: WorkoutSession[];
  completed: number; total: number; progress: number | null;
  status: 'active' | 'finished' | 'cancelled'; next: ScheduledWorkout | null;
  startsOn: string; endsOn: string;
};
export function nextWorkout(workouts: ScheduledWorkout[], sessions: WorkoutSession[]): ScheduledWorkout | null {
  const ordered = [...workouts].filter(w => w.state !== 'canceled').sort((a,b) => a.scheduled_date.localeCompare(b.scheduled_date) || a.id.localeCompare(b.id));
  const active = sessions.find(s => s.state === 'in_progress' || s.state === 'paused');
  return ordered.find(w => w.id === active?.scheduled_workout_id) || ordered.find(w => w.state === 'assigned') || null;
}
/** Assignments, not individual workouts or title matching, define the programme boundary. */
export function programmesFor(data: LocalAccount): Programme[] {
  const care = data.relationship;
  if (!care) return [];
  return (data.programmes || []).filter(p => p.relationshipId === care.relationship.id).map(p => {
    const ids = new Set(p.scheduledIds);
    const workouts = care.workouts.filter(w => ids.has(w.id)).sort((a,b) => a.scheduled_date.localeCompare(b.scheduled_date) || a.id.localeCompare(b.id));
    const sessions = care.sessions.filter(s => ids.has(s.scheduled_workout_id));
    const eligible = workouts.filter(w => w.state !== 'canceled');
    const completedIds = new Set(sessions.filter(s => s.state === 'completed').map(s => s.scheduled_workout_id));
    const completed = eligible.filter(w => completedIds.has(w.id)).length;
    const total = eligible.length;
    return {...p, workouts, sessions, completed, total, progress: total ? Math.round(completed / total * 100) : null,
      status: !total ? 'cancelled' as const : completed === total ? 'finished' as const : 'active' as const,
      next: nextWorkout(workouts, sessions), startsOn: workouts[0]?.scheduled_date || '', endsOn: workouts.at(-1)?.scheduled_date || ''};
  });
}
export function dayKey(date: Date): string {return date.toISOString().slice(0,10);}
export function shiftDay(day: string, offset: number): string {
  const date = new Date(day + 'T12:00:00Z'); date.setUTCDate(date.getUTCDate() + offset); return dayKey(date);
}
export function weekDays(day: string): string[] {
  const date = new Date(day + 'T12:00:00Z');
  const monday = shiftDay(day, -((date.getUTCDay() + 6) % 7));
  return Array.from({length: 7}, (_, i) => shiftDay(monday, i));
}
export function activityPeriod(data: LocalAccount, days: number, now: Date, programmeId?: string) {
  const to = dayKey(now), from = shiftDay(to, 1 - days);
  const programme = programmeId ? programmesFor(data).find(p => p.id === programmeId) : null;
  const workouts = programmeId ? programme?.workouts || [] : data.relationship?.workouts || [];
  const sessions = programmeId ? programme?.sessions || [] : data.relationship?.sessions || [];
  const valid = sessions.filter(s => s.state === 'completed' && s.completed_at && Date.parse(s.completed_at) <= now.getTime());
  const entries = valid.filter(s => s.completed_at!.slice(0,10) >= from && s.completed_at!.slice(0,10) <= to);
  const eligible = workouts.filter(w => w.state !== 'canceled' && w.scheduled_date >= from && w.scheduled_date <= to);
  const completedIds = new Set(valid.map(s => s.scheduled_workout_id));
  const completedScheduled = eligible.filter(w => completedIds.has(w.id)).length;
  const series = Array.from({length: days}, (_, i) => {
    const date = shiftDay(from, i), recorded = entries.filter(s => s.completed_at!.slice(0,10) === date);
    return {date, count: recorded.length, minutes: Math.floor(recorded.reduce((sum,s) => sum + s.elapsed_seconds, 0) / 60)};
  });
  return {from,to,entries,series,completed:entries.length,minutes:Math.floor(entries.reduce((sum,s)=>sum+s.elapsed_seconds,0)/60),
    eligible:eligible.length,completedScheduled,activeDays:series.filter(d=>d.count>0).length,
    adherence:eligible.length && data.relationship?.relationship.state === 'active' ? Math.round(completedScheduled/eligible.length*100) : null};
}
