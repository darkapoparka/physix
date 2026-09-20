import {localBackendEnabled} from '@/server/physix/local-backend';
import {LocalBooking} from '@/features/physix/local-booking';
import {notFound,redirect} from 'next/navigation';
import {PublicHome} from '@/features/physix/home';
import {BookScreen} from '@/features/physix/book';
import {PlanCatalogue,ClinicInformation} from '@/features/physix/public-pages';
import {demoEnabled} from '@/shared/physix/demo';
export const dynamic='force-dynamic';
export default async function Page({params,searchParams}:{params:Promise<{route?:string[]}>;searchParams:Promise<Record<string,string|string[]|undefined>>}) {
 const path=(await params).route?.join('/')||'';const query=await searchParams;const preview=demoEnabled(process.env);
 const text=(name:string)=>typeof query[name]==='string'?query[name] as string:'';
 if(path==='')return <PublicHome preview={preview} browse={text('browse')==='areas'?'areas':'services'}/>;
 if(path==='book'&&localBackendEnabled())return <LocalBooking publicEntry/>;
 if(path==='book')return <BookScreen preview={preview} initialMode={text('mode')==='online'?'online':'in_clinic'} initialQuery={text('q').slice(0,160)} initialService={text('service')}/>;
 if(path==='plans')return <PlanCatalogue preview={preview}/>;
 if(path==='online')redirect('/book?mode=online');
 if(path==='services')redirect('/book');
 if(path==='about'||path==='first-visit')return <ClinicInformation page={path} preview={preview}/>;
 notFound();
}