'use client';
import * as React from 'react';
import Box from '@mui/material/Box';

/**
 * A short, silent clip in a card's banner slot.
 *
 * Three things it is careful about:
 *  - `preload="none"` with a poster, so the file is only fetched for people
 *    who actually scroll to it rather than on every page load.
 *  - It plays only while on screen and pauses when it leaves, so a page of
 *    these does not run several decoders at once on a phone.
 *  - If the visitor has asked for reduced motion, it never autoplays. It
 *    shows the poster with controls so they can start it themselves.
 */
export default function CardVideo({
  src,
  poster,
  alt,
}: {
  src: string;
  poster: string;
  alt: string;
}) {
  const ref = React.useRef<HTMLVideoElement>(null);
  const [reducedMotion, setReducedMotion] = React.useState(false);

  React.useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReducedMotion(query.matches);
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);

  React.useEffect(() => {
    const video = ref.current;
    if (!video || reducedMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // A rejected play promise is normal (a tab in the background, a
          // battery-saver policy) and is not worth surfacing.
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <Box
      sx={{
        position: 'relative',
        aspectRatio: '16 / 9',
        bgcolor: 'action.hover',
        overflow: 'hidden',
      }}
    >
      <Box
        component="video"
        ref={ref}
        src={src}
        poster={poster}
        aria-label={alt}
        muted
        loop
        playsInline
        preload="none"
        controls={reducedMotion}
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
      />
    </Box>
  );
}
