import Image from 'next/image';

export const illustrationNames = ['assessment', 'back', 'neck', 'sports', 'mobility', 'online'] as const;
export type IllustrationName = (typeof illustrationNames)[number];

/** Decorative generated art, never exercise instruction or a staff portrait. */
export function Illustration({name, className, priority = false, sizes = '(min-width: 1000px) 330px, (min-width: 700px) 30vw, 46vw'}: {
  name: IllustrationName;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return <Image src={'/physix/illustrations/' + name + '.webp'} alt="" aria-hidden="true"
    width={800} height={800} className={className} sizes={sizes} priority={priority} />;
}
