import styles from './brand-mark.module.css';

/** Scalable identity mark. Home uses the compact wordmark from the selected direction. */
export function BrandMark({inverse = false, wordmark = false}: {inverse?: boolean; wordmark?: boolean}) {
  if (wordmark) return <span className={styles.wordmark} data-brand-mark data-inverse={inverse || undefined}>
    <span className={styles.logotype}>physi<span>X</span></span>
    <span className={styles.tagline}>Move better</span>
  </span>;
  return <span className={styles.brand} data-brand-mark data-inverse={inverse || undefined}>
    <svg className={styles.emblem} viewBox="0 0 58 68" aria-hidden="true" focusable="false">
      <path d="M30 65C8 63 3 46 3 20C25 24 37 39 30 65Z" fill="#8BD2AF" />
      <path d="M30 65C31 47 20 31 3 20C4 47 11 60 30 65Z" fill="#68BC98" />
      <path d="M28 39C25 20 32 5 55 1C56 22 47 35 28 39Z" fill="#CBE091" />
      <path d="M28 39C38 29 44 15 55 1C56 22 47 35 28 39Z" fill="#B9D47D" />
      <path d="M33 65C30 48 39 40 54 37C55 54 46 65 33 65Z" fill="#BFD984" />
    </svg>
    <span className={styles.words}><span className={styles.name}>PhysiX</span>
      <span className={styles.descriptor}>Physiotherapy</span></span>
  </span>;
}
