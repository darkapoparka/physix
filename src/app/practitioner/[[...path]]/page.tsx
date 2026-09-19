import {notFound,redirect} from 'next/navigation';
import {localAccount} from '@/server/physix/local-backend';
import {LocalPractitioner} from '@/features/physix/local-practitioner';
export const dynamic='force-dynamic';
export default async function PractitionerPage({params}:{params:Promise<{path?:string[]}>}){
 const account=await localAccount();if(!account)redirect('/login');
 const workspace=account.account.workspaces[0];if(!workspace)notFound();
 const parts=(await params).path||[],view=parts[0]||'calendar';
 if(parts.length>2||!['calendar','patients','plans'].includes(view))notFound();
 if(parts[1]&&(view!=='patients'||!/^[0-9a-f-]{36}$/i.test(parts[1])))notFound();
 return <LocalPractitioner key={parts.join('/')} workspaceId={workspace.id} view={view as 'calendar'|'patients'|'plans'} relationshipId={parts[1]}/>;
}
