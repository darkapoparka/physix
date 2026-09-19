import type {RelationshipDetail} from '../gymaf/contracts';
export function careActivity(data:RelationshipDetail|null,now=new Date()){
 const to=now.toISOString().slice(0,10),start=new Date(to+'T00:00:00Z');start.setUTCDate(start.getUTCDate()-6);
 const from=start.toISOString().slice(0,10);
 const sessions=data?.sessions||[],workouts=data?.workouts||[];
 const completed=sessions.filter(s=>s.state==='completed'&&s.completed_at&&s.completed_at.slice(0,10)>=from&&s.completed_at.slice(0,10)<=to);
 const eligible=workouts.filter(w=>w.state!=='canceled'&&w.scheduled_date>=from&&w.scheduled_date<=to);
 const completedIds=new Set(sessions.filter(s=>s.state==='completed'&&s.completed_at&&Date.parse(s.completed_at)<=now.getTime()).map(s=>s.scheduled_workout_id));
 const completedScheduled=eligible.filter(w=>completedIds.has(w.id)).length;
 return {from,to,completed:completed.length,minutes:Math.floor(completed.reduce((n,s)=>n+s.elapsed_seconds,0)/60),eligible:eligible.length,completedScheduled,adherence:eligible.length&&data?.relationship.state==='active'?Math.round(completedScheduled/eligible.length*100):null};
}
