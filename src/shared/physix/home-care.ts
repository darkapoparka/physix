import type {Programme} from './programmes';

export type HomeCareSummary = {
  state: 'guest' | 'empty' | 'assigned'; title: string; description: string;
  href: string; action: string; completed?: number; total?: number;
};
/** A minimal projection of already-authorized programmes, never an entire account payload. */
export function homeCareSummary(programmes: readonly Programme[] | null, canTrain = false): HomeCareSummary {
  if (!programmes) return {state:'guest', title:'Your progress. Our priority.', description:'Programmes, sessions and progress in one place.', href:'/care/programmes', action:'Open My care'};
  if (!programmes.length) return {state:'empty', title:'Your plan starts here.', description:'Assigned programmes will appear in My care.', href:'/care/programmes', action:'View My care'};
  const resumable = (p:Programme) => p.sessions.find(s => s.scheduled_workout_id === p.next?.id && ['in_progress','paused'].includes(s.state));
  const programme = programmes.find(p => p.next && resumable(p)) || programmes.find(p => p.next) || programmes[0];
  const next = canTrain ? programme.next : null;
  const attempt = next ? resumable(programme) : undefined;
  return {
    state:'assigned', title:programme.title,
    description:programme.completed + ' of ' + programme.total + ' sessions finished',
    completed:programme.completed, total:programme.total,
    href:attempt ? '/care/sessions/' + attempt.id : next ? '/care/workouts/' + next.id : '/care/programmes/' + programme.id,
    action:attempt ? 'Resume session' : next ? 'Open next session' : 'View programme',
  };
}
