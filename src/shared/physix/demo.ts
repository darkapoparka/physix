/** Synthetic interaction model only. Never a persistence or clinical adapter. */
export const examples = [
  { id: 'exercise-1', name: 'Exercise 01', sets: 2, reps: 8 },
  { id: 'exercise-2', name: 'Exercise 02', sets: 2, reps: 8 },
  { id: 'exercise-3', name: 'Exercise 03', sets: 2, reps: 8 },
] as const;
export type DemoMode = 'assigned' | 'purchased' | 'pending' | 'empty';
export type Attempt = {id:string; status:'ready'|'active'|'paused'|'finished'; startedAt:number|null; accumulatedMs:number; actuals:Record<string,number>; commands:string[]};
export function newAttempt(id:string):Attempt {return {id,status:'ready',startedAt:null,accumulatedMs:0,actuals:{},commands:[]};}
export function elapsedMs(a:Attempt,now:number):number {return a.accumulatedMs+(a.startedAt===null?0:Math.max(0,now-a.startedAt));}
export function transition(a:Attempt,to:'active'|'paused'|'finished',now:number):Attempt {
  if(a.status==='finished')return a;
  if(to==='active')return a.status==='active'?a:{...a,status:to,startedAt:now};
  if(to==='paused')return a.status==='active'?{...a,status:to,accumulatedMs:elapsedMs(a,now),startedAt:null}:a;
  if(!Object.values(a.actuals).some(n=>n>0))throw new Error('Record a performed set before finishing.');
  return {...a,status:to,accumulatedMs:elapsedMs(a,now),startedAt:null};
}
export function recordDemoSet(a:Attempt,key:string,reps:number,commandId:string):Attempt {
  if(a.status!=='active')throw new Error('Resume the demonstration before recording a set.');
  if(a.commands.includes(commandId))return a;
  if(!/^exercise-[123]:[12]$/.test(key)||!Number.isInteger(reps)||reps<0||reps>999)throw new Error('Enter a whole number from 0 to 999.');
  return {...a,actuals:{...a.actuals,[key]:reps},commands:[...a.commands,commandId]};
}
export function matchesSearch(haystack:string,query:string):boolean {
  // Transport-neutral adaptation of Motion Makers catalogue matching.
  const normal=(s:string)=>s.normalize('NFKC').toLocaleLowerCase().trim();
  return normal(query).split(/\s+/).every(term=>normal(haystack).includes(term));
}
export function demoEnabled(env:{NODE_ENV?:string;PHYSIX_DEMO?:string}):boolean {return env.NODE_ENV==='development'&&env.PHYSIX_DEMO==='1';}
