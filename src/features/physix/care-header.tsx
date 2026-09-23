import {ContextHeader, AccountAction} from './context-header';
import {CareNavigation} from './care-navigation';

/** Stable framing across the four care destinations; context belongs below the tabs. */
export function CareHeader({active}: {active: 'today' | 'plans' | 'schedule' | 'progress'}) {
  return <><ContextHeader title="My care" action={<AccountAction/>}/><CareNavigation active={active}/></>;
}
