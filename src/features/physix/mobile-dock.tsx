"use client";
import Link from 'next/link';
import {useEffect, useState} from 'react';
import {Menu, type LucideIcon} from 'lucide-react';
import styles from './mobile-dock.module.css';

type Destination = {href: string; label: string; icon: LucideIcon};
export function MobileDock({links, isActive, menuOpen, onMenu, inverse=false}: {
  links: Destination[]; isActive: (href: string) => boolean; menuOpen: boolean; onMenu: () => void; inverse?: boolean;
}) {
  const [editing, setEditing] = useState(false);
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>; let keyboard = false, frame = 0;
    const key = (event: KeyboardEvent) => { if (event.key === 'Tab') keyboard = true; };
    const pointer = () => { keyboard = false; };
    const sync = () => {
      const element = document.activeElement;
      setEditing(element instanceof HTMLElement && (element.isContentEditable || element.tagName === 'TEXTAREA' ||
        (element instanceof HTMLInputElement && ['text','email','number','password','search','tel','url'].includes(element.type))));
      cancelAnimationFrame(frame);
      if (keyboard && element instanceof HTMLElement && !element.closest('.px-dock, dialog')) frame = requestAnimationFrame(() => {
        const dock = document.querySelector<HTMLElement>('.px-dock:not([hidden])');
        if (!dock || getComputedStyle(dock).display === 'none') return;
        const target = element.getBoundingClientRect(), overlay = dock.getBoundingClientRect();
        if (target.bottom > overlay.top - 12 && target.top < innerHeight) element.scrollIntoView({block:'center',inline:'nearest',behavior:'instant'});
      });
    };
    const blur = () => { timer = setTimeout(sync, 0); };
    document.addEventListener('keydown', key); document.addEventListener('pointerdown', pointer);
    document.addEventListener('focusin', sync); document.addEventListener('focusout', blur); sync();
    return () => { clearTimeout(timer); cancelAnimationFrame(frame); document.removeEventListener('keydown', key); document.removeEventListener('pointerdown', pointer); document.removeEventListener('focusin', sync); document.removeEventListener('focusout', blur); };
  }, []);
  return <nav className={'px-dock ' + styles.dock} data-inverse={inverse || undefined} aria-label="Mobile navigation" hidden={editing}>
    {links.map(({href,label,icon:Icon}) => <Link key={href} href={href} className={styles.item} aria-label={label} aria-current={isActive(href)?'page':undefined}>
      <Icon size={21} aria-hidden="true"/><span className={styles.label} aria-hidden="true">{label}</span>
    </Link>)}
    <button type="button" className={styles.item} aria-label="Menu" aria-haspopup="dialog" aria-expanded={menuOpen} onClick={onMenu}>
      <Menu size={21} aria-hidden="true"/><span className={styles.label} aria-hidden="true">Menu</span>
    </button>
  </nav>;
}
