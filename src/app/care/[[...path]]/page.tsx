import {notFound,redirect} from 'next/navigation';
import {localAccount} from '@/server/physix/local-backend';
import {LocalPatient} from '@/features/physix/local-patient';
import {LocalSession} from '@/features/physix/local-session';
import {careLoginHref, isCarePath, bookingQuery} from '@/shared/physix/navigation';
import {ProgrammeLibrary} from '@/features/physix/care-library';
import {CareSchedule} from '@/features/physix/care-schedule';
import {CareProgress} from '@/features/physix/care-progress';
import {LocalAppointments} from '@/features/physix/local-appointments';
export const dynamic='force-dynamic';
export default async function PatientPage({params,searchParams}:{params:Promise<{path?:string[]}>;searchParams:Promise<Record<string,string|string[]|undefined>>}) {
  const parts=(await params).path||[],path=parts.join('/');
  if(path==='book')redirect('/book'+bookingQuery(await searchParams));
  const destination='/care'+(path?'/'+path:'');
  if(!isCarePath(destination))notFound();
  const account=await localAccount();if(!account)redirect(careLoginHref(destination));
  if(path==='')return <LocalPatient initialAccount={account} screen="home"/>;
  if(path==='programmes')return <ProgrammeLibrary initialAccount={account}/>;
  if(path==='schedule')return <CareSchedule initialAccount={account}/>;
  if(path==='progress')return <CareProgress initialAccount={account}/>;
  if(path==='appointments')return <LocalAppointments initialAccount={account}/>;
  if(parts.length===2&&parts[0]==='appointments'){
    if(!account.appointments.some(item=>item.id===parts[1]))notFound();
    return <LocalAppointments key={parts[1]} initialAccount={account} id={parts[1]} confirmation={(await searchParams).created==='1'}/>;
  }
  if(['check-ins','profile'].includes(path))return <LocalPatient initialAccount={account} key={path} screen={path as 'check-ins'|'profile'}/>;
  if(parts.length===2&&parts[0]==='programmes') {
    if(account.programmes?.some(p=>p.id===parts[1]))return <ProgrammeLibrary initialAccount={account} key={parts[1]} id={parts[1]}/>;
    // Preserve old saved session-overview links; programmes now have actual assignment IDs.
    if(account.relationship?.workouts.some(w=>w.id===parts[1]))redirect('/care/workouts/'+parts[1]);
    notFound();
  }
  if(parts.length===2&&parts[0]==='workouts')return <LocalPatient initialAccount={account} key={parts[1]} screen="detail" id={parts[1]}/>;
  if(parts.length===2&&parts[0]==='sessions'&&/^[0-9a-f-]{36}$/i.test(parts[1]))return <LocalSession key={parts[1]} id={parts[1]}/>;
  notFound();
}
