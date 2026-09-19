import {AccountGate} from '@/features/physix/public-pages';
import {demoEnabled} from '@/shared/physix/demo';
export const dynamic='force-dynamic';
export default function LoginPage(){return <AccountGate preview={demoEnabled(process.env)}/>;}