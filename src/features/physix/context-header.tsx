import Link from 'next/link';
import type {ReactNode, Ref} from 'react';
import {ArrowLeft, UserRound} from 'lucide-react';
import styles from './context-header.module.css';

type BackControl = {href: string; label: string; onClick?: never} | {onClick: () => void; label: string; href?: never};
export type ContextHeaderProps = {
  title: string; subtitle?: string; back?: BackControl; action?: ReactNode;
  headingRef?: Ref<HTMLHeadingElement>; busy?: boolean;
};
/** The task owns its heading. The shared Shell owns global destinations. */
export function ContextHeader({title, subtitle, back, action, headingRef, busy = false}: ContextHeaderProps) {
  return <header className={'px-care-heading ' + styles.header} data-context-header>
    <div className={styles.row}>
      {back && (back.href ? <Link className={styles.back} href={back.href} aria-label={back.label}>
        <ArrowLeft size={21} aria-hidden="true"/>
      </Link> : <button type="button" className={styles.back} disabled={busy} onClick={back.onClick} aria-label={back.label}>
        <ArrowLeft size={21} aria-hidden="true"/>
      </button>)}
      <h1 ref={headingRef} tabIndex={-1}>{title}</h1>
      {action && <div className={styles.action}>{action}</div>}
    </div>
    {subtitle && <p>{subtitle}</p>}
  </header>;
}
export function AccountAction() {
  return <Link className={styles.iconAction} href="/care/profile" aria-label="Account"><UserRound size={21} aria-hidden="true"/></Link>;
}
