import Image from 'next/image';

const artwork = {
  hero: [378, 364],
  'service-physiotherapy': [239, 213],
  'service-sports': [241, 212],
  'service-mobility': [236, 212],
  'visit-centre': [136, 173],
  'visit-online': [138, 174],
  'care-cover': [191, 211],
} as const;
export type HomeArtworkName = keyof typeof artwork;

/** Only image regions from the selected generated reference, not flattened interface pixels.
 * Native-size WebP files are already compressed. Do not request invented 3840px derivatives.
 * These are decorative previews, not photographs of the clinic or clinical instructions.
 */
export function HomeArtwork({name, className, priority = false}: {
  name: HomeArtworkName; className?: string; priority?: boolean;
}) {
  const [width, height] = artwork[name];
  return <Image src={'/physix/target-home/' + name + '.webp'} alt="" aria-hidden="true"
    width={width} height={height} unoptimized className={className} data-home-art={name}
    loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : undefined}/>;
}
