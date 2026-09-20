import Image from 'next/image';
import Link from 'next/link';
import type {ReactNode} from 'react';
import {ArrowUpRight} from 'lucide-react';
import styles from './editorial-media.module.css';

export type EditorialImage = 'manual' | 'movement' | 'sports';
/** Provisional generated photography. Call only inside an explicit preview/local-care surface. */
export function EditorialPhoto({image, priority=false, sizes='(min-width: 1000px) 540px, 92vw', className=''}: {
  image: EditorialImage; priority?: boolean; sizes?: string; className?: string;
}) {
  return <Image src={'/physix/editorial/'+image+'.webp'} alt="" aria-hidden="true"
    width={1200} height={900} data-editorial-photo={image} sizes={sizes} loading={priority?'eager':'lazy'}
    fetchPriority={priority?'high':undefined} className={className}/>;
}

type TileProps = {
  title:string; image:EditorialImage; detail?:string; label?:string; badge?:string;
  children?:ReactNode; priority?:boolean; marker?:string;
} & ({href:string;onSelect?:never}|{href?:never;onSelect:()=>void});

/** Library tile: photo frame and page-level caption, distinct from a lead feature. */
export function MediaTile({href,onSelect,title,image,detail,label,badge,children,priority=false,marker}:TileProps) {
  const content=<>
    <div className={styles.tileImage}><EditorialPhoto image={image} priority={priority}
      sizes="(min-width: 1000px) 340px, (min-width: 700px) 44vw, 62vw"/>
      {badge&&<span className={styles.badge}>{badge}</span>}
      <span className={styles.arrow}><ArrowUpRight size={18} aria-hidden="true"/></span>
    </div>
    <div className={styles.tileCopy}><h3>{title}</h3>{detail&&<p>{detail}</p>}{children}</div>
  </>;
  return href?<Link href={href} className={styles.tile} aria-label={label||title} data-media-tile={marker||image}>{content}</Link>
    :<button type="button" onClick={onSelect} className={styles.tile} aria-label={label||title} data-media-tile={marker||image}>{content}</button>;
}
