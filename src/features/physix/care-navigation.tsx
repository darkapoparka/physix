import Link from 'next/link';
import styles from './care-hub.module.css';
export function CareNavigation({active}: {active: 'today' | 'plans' | 'schedule' | 'progress'}) {
  const links = [
    {key:'today',href:'/care',label:'Today'},
    {key:'plans',href:'/care/programmes',label:'My plans'},
    {key:'schedule',href:'/care/schedule',label:'Schedule'},
    {key:'progress',href:'/care/progress',label:'Progress'},
  ];
  return <nav className={styles.navigation} aria-label="Your care views">
    {links.map(item => <Link href={item.href} key={item.key} aria-current={active===item.key?'page':undefined}>{item.label}</Link>)}
  </nav>;
}
