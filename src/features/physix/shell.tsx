"use client";
import Link from 'next/link';
import {BrandMark} from './brand-mark';
import {usePathname} from 'next/navigation';
import {useState, type ReactNode} from 'react';
import {Bell, Home, CalendarDays, ChartColumn, UserRound, ChevronRight} from 'lucide-react';
import {primaryDestinations, primarySection} from '@/shared/physix/navigation';
import {Row, Sheet} from './ui';
import {MobileDock} from './mobile-dock';
import styles from './shell.module.css';

const icons = {home: Home, book: CalendarDays, care: ChartColumn};
const links = primaryDestinations.map(item => ({...item, icon: icons[item.key]}));
const careLinks = [
  ['/care','Today'], ['/care/programmes','My programmes'], ['/care/schedule','Schedule'],
  ['/care/progress','Progress'], ['/care/appointments','Appointments'], ['/care/check-ins','Check-in'],
] as const;
const clinicLinks = [['/plans','Explore programmes'], ['/about','About PhysiX'], ['/first-visit','Your first visit']] as const;

export function Shell({children, demo=false, preview=false, focused=false, task=false, local=false, home=false, contextual=false}: {
  children: ReactNode; demo?: boolean; preview?: boolean; focused?: boolean; task?: boolean; local?: boolean; home?: boolean; contextual?: boolean;
}) {
  const pathname = usePathname(), [menu, setMenu] = useState(false);
  const section = primarySection(pathname);
  const active = (href: string) => links.some(item => item.href === href && item.key === section);
  const closeMenu = () => setMenu(false);
  return <div className={'px-theme'+(focused?' px-focused':'')+(task?' px-task':'')+(local?' px-saved':'')+(home?' '+styles.homeShell:'')+(contextual?' '+styles.contextualShell:'')}>
    <a className="skip-link" href="#main">Skip to content</a>
    {(demo||preview||local) && <div className="px-preview">{demo ? 'Visual-only demo · not saved' : 'Local preview · sample data & imagery'}</div>}
    {!focused&&!task && <header className="px-topbar">
      <Link href="/" className="px-brand" aria-label="PhysiX home">
        <BrandMark inverse={home} wordmark={home}/>
      </Link>
      <nav className="px-desktop-nav" aria-label="Desktop navigation">
        {links.map(item => <Link key={item.href} href={item.href} aria-current={active(item.href)?'page':undefined}>{item.label}</Link>)}
        <button type="button" aria-haspopup="dialog" aria-expanded={menu} onClick={()=>setMenu(true)}>Menu</button>
      </nav>
      <div className={styles.topActions}>
        {home && <Link className="px-notifications" aria-label="Appointments" href="/care/appointments"><Bell size={19}/></Link>}
        <Link className="px-account" aria-label="Account" href="/care/profile"><UserRound size={19}/><span>Account</span></Link>
      </div>
    </header>}
    <main id="main" className="px-main" tabIndex={-1}>{children}</main>
    {!focused&&!task && <MobileDock links={links} isActive={active} menuOpen={menu} onMenu={()=>setMenu(true)} inverse={home}/>}
    {menu && <Sheet title="Menu" onClose={closeMenu}>
      <section className={styles.menuGroup} aria-labelledby="menu-care-title"><h3 id="menu-care-title">My care</h3>
        <div className="row-group">{careLinks.map(([href,label]) => <Row key={href} href={href} onClick={closeMenu}>{label}</Row>)}</div>
      </section>
      <section className={styles.menuGroup} aria-labelledby="menu-clinic-title"><h3 id="menu-clinic-title">PhysiX</h3>
        <div className="row-group">{clinicLinks.map(([href,label]) => <Row key={href} href={href} onClick={closeMenu}>{label}</Row>)}</div>
      </section>
      <Row href="/care/profile" onClick={closeMenu} icon={<UserRound size={19}/>}>Account</Row>
    </Sheet>}
  </div>;
}
export function SectionTitle({title,href,label='View all'}:{title:string;href?:string;label?:string}) {
  return <div className="px-section-title"><h2>{title}</h2>{href&&<Link href={href}>{label}<ChevronRight size={16}/></Link>}</div>;
}
