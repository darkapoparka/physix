import {localAccount} from './local-backend';
import {homeCareSummary} from '@/shared/physix/home-care';
import {programmesFor} from '@/shared/physix/programmes';
import {appointmentSummary} from '@/shared/physix/appointments';

/** Request-scoped, authorized projection. Never shared-cache this response. */
export async function homeContext() {
  const account = await localAccount();
  return {
    care: homeCareSummary(account ? programmesFor(account) : null, account?.relationship?.can_train),
    appointment: appointmentSummary(account?.appointments || [], Date.now()),
  };
}
