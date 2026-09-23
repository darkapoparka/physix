import Image from 'next/image';
import styles from './brand-mark.module.css';

/** Generated raster identity; the enclosing home link supplies its accessible name. */
export function BrandMark() {
  return <span className={styles.brand} data-brand-mark>
    <Image src="/physix/brand/physix-logo-generated.png" alt="" aria-hidden="true" width={2073} height={758} sizes="160px" priority />
  </span>;
}
