import Link from 'next/link';
import {ArrowUpRight, Play} from 'lucide-react';
import {Illustration, type IllustrationName} from './illustration';
import styles from './care-card.module.css';

export type CareTone = 'mint' | 'sage' | 'sand' | 'forest';
type CareCardProps = {
  href: string;
  title: string;
  art: IllustrationName;
  tone?: CareTone;
  detail?: string;
  label?: string;
  priority?: boolean;
  play?: boolean;
  className?: string;
  sizes?: string;
};

/** Fidelity's media → title → metadata card, without its account or fixture dependencies. */
export function CareCard({
  href, title, art, tone = 'mint', detail, label, priority = false,
  play = false, className = '', sizes = '(min-width: 1000px) 350px, (min-width: 700px) 32vw, 72vw',
}: CareCardProps) {
  return (
    <Link href={href} className={`px-today-card ${styles.card} ${className}`}
      data-tone={tone} data-care-card={art} aria-label={label || title}>
      <div className={styles.media}>
        <Illustration name={art} priority={priority} sizes={sizes} />
        {play ? <span className={styles.play}><Play size={22} fill="currentColor" aria-hidden="true" /></span> : <span className={styles.arrow}><ArrowUpRight size={20} aria-hidden="true" /></span>}
      </div>
      <div className={styles.copy}>
        <h2>{title}</h2>
        {detail && <p>{detail}</p>}
      </div>
    </Link>
  );
}
