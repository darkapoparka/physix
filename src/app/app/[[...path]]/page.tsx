import {LocalBooking} from '@/features/physix/local-booking';
import {notFound,redirect} from 'next/navigation';
import {localAccount} from '@/server/physix/local-backend';
import {LocalPatient} from '@/features/physix/local-patient';
import {LocalSession} from '@/features/physix/local-session';
export const dynamic='force-dynamic';
export default async function PatientPage({params}:{params:Promise<{path?:string[]}>}){
 const account=await localAccount();if(!account)redirect('/login');
 const parts=(await params).path||[],path=parts.join('/');
 if(path==='')return <LocalPatient screen="home"/>;
 if(['plans','progress','check-ins','appointments','profile'].includes(path))return <LocalPatient key={path} screen={path as 'plans'|'progress'|'check-ins'|'appointments'|'profile'}/>;
 if(parts.length===2&&parts[0]==='plans')return <LocalPatient key={parts[1]} screen="detail" id={parts[1]}/>;
 if(parts.length===2&&parts[0]==='sessions'&&/^[0-9a-f-]{36}$/i.test(parts[1]))return <LocalSession key={parts[1]} id={parts[1]}/>;
 if(path==='book')return <LocalBooking/>;
 notFound();
}
