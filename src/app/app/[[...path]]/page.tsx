import {notFound,redirect} from 'next/navigation';
import {localAccount} from '@/server/physix/local-backend';
import {LocalPatient} from '@/features/physix/local-patient';
import {LocalSession} from '@/features/physix/local-session';
import {LocalBooking} from '@/features/physix/local-booking';
import {ProgrammeLibrary} from '@/features/physix/care-library';
import {CareSchedule} from '@/features/physix/care-schedule';
import {CareProgress} from '@/features/physix/care-progress';
export const dynamic='force-dynamic';
export default async function PatientPage({params}:{params:Promise<{path?:string[]}>}) {
  const account=await localAccount();if(!account)redirect('/login');
  const parts=(await params).path||[],path=parts.join('/');
  if(path==='')return <LocalPatient screen="home"/>;
  if(path==='plans')return <ProgrammeLibrary/>;
  if(path==='schedule')return <CareSchedule/>;
  if(path==='progress')return <CareProgress/>;
  if(['check-ins','appointments','profile'].includes(path))return <LocalPatient key={path} screen={path as 'check-ins'|'appointments'|'profile'}/>;
  if(parts.length===2&&parts[0]==='plans') {
    if(account.programmes?.some(p=>p.id===parts[1]))return <ProgrammeLibrary key={parts[1]} id={parts[1]}/>;
    // Preserve old saved session-overview links; programmes now have actual assignment IDs.
    if(account.relationship?.workouts.some(w=>w.id===parts[1]))redirect('/app/workouts/'+parts[1]);
    notFound();
  }
  if(parts.length===2&&parts[0]==='workouts')return <LocalPatient key={parts[1]} screen="detail" id={parts[1]}/>;
  if(parts.length===2&&parts[0]==='sessions'&&/^[0-9a-f-]{36}$/i.test(parts[1]))return <LocalSession key={parts[1]} id={parts[1]}/>;
  if(path==='book')return <LocalBooking/>;
  notFound();
}
