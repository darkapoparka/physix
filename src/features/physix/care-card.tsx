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
  layout?: 'media' | 'row';
  badge?: string;
  completion?: {value: number; label: string};
};

/** Fidelity's media → title → metadata card, without its account or fixture dependencies. */
export function CareCard({
  href, title, art, tone = 'mint', detail, label, priority = false,
  play = false, className = '', layout = 'media', badge, completion, sizes = '(min-width: 1000px) 350px, (min-width: 700px) 32vw, 72vw',
}: CareCardProps) {
  return (
    <Link href={href} className={`px-today-card ${styles.card} ${className}`}
      data-tone={tone} data-layout={layout} data-care-card={art} aria-label={label || title}>
      <div className={styles.media}>
        {badge && <span className={styles.badge}>{badge}</span>}
        <Illustration name={art} priority={priority} sizes={sizes} />
        {play ? <span className={styles.play}><Play size={22} fill="currentColor" aria-hidden="true" /></span> : <span className={styles.arrow}><ArrowUpRight size={20} aria-hidden="true" /></span>}
      </div>
      <div className={styles.copy}>
        <h2>{title}</h2>
        {detail && <p>{detail}</p>}
        {completion && <div className={styles.completion}>
          <span>{completion.label}</span>
          <progress max={100} value={completion.value} aria-label={completion.label} />
        </div>}
      </div>
    </Link>
  );
}
