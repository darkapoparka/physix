import Link from 'next/link';
import styles from './care-hub.module.css';
export function CareNavigation({active}: {active: 'today' | 'plans' | 'schedule'}) {
  const links = [{key:'today',href:'/app',label:'Today'}, {key:'plans',href:'/app/plans',label:'Programmes'}, {key:'schedule',href:'/app/schedule',label:'Schedule'}];
  return <nav className={styles.navigation} aria-label="Your care views">
    {links.map(item => <Link href={item.href} key={item.key} aria-current={active === item.key ? 'page' : undefined}>{item.label}</Link>)}
  </nav>;
}
