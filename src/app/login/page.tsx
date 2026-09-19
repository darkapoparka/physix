import {AccountGate} from '@/features/physix/public-pages';
import {LocalLogin} from '@/features/physix/local-login';
import {localBackendEnabled} from '@/server/physix/local-backend';
import {demoEnabled} from '@/shared/physix/demo';
export const dynamic='force-dynamic';
export default function LoginPage(){return localBackendEnabled()?<LocalLogin/>:<AccountGate preview={demoEnabled(process.env)}/>;}
