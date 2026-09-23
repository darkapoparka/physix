import {hostedBackendEnabled} from '@/server/physix/hosted-config';
import {HostedLogin} from '@/features/physix/hosted-login';
import {AccountGate} from '@/features/physix/public-pages';
import {LocalLogin} from '@/features/physix/local-login';
import {localBackendEnabled} from '@/server/physix/local-backend';
import {safeCareReturn} from '@/shared/physix/navigation';
import {demoEnabled} from '@/shared/physix/demo';
export const dynamic='force-dynamic';
export default async function LoginPage({searchParams}:{searchParams:Promise<Record<string,string|string[]|undefined>>}) {
  const returnTo=safeCareReturn((await searchParams).returnTo);
  if(hostedBackendEnabled())return <HostedLogin returnTo={returnTo} ready={process.env.PHYSIX_AUTH_READY==='1'}/>;
  return localBackendEnabled()?<LocalLogin returnTo={returnTo}/>:<AccountGate preview={demoEnabled(process.env)}/>;
}
