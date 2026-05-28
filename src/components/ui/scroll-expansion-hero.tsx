'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ScrollExpandMediaProps {
  mediaType?: 'video' | 'image';
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  title?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  children?: ReactNode;
}

const ScrollExpandMedia = ({
  mediaType = 'video',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  scrollToExpand,
  textBlend,
  children,
}: ScrollExpandMediaProps) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInViewRef = useRef(false);

  /* Reset when mediaType changes */
  useEffect(() => {
    setScrollProgress(0);
    setShowContent(false);
    setMediaFullyExpanded(false);
  }, [mediaType]);

  /* Track mobile breakpoint */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  /* IntersectionObserver — sync ref so wheel handler reads it immediately */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Only active when section occupies most of the viewport
        isInViewRef.current = entry.intersectionRatio >= 0.7;
      },
      { threshold: [0, 0.5, 0.7, 1.0] }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /* Scroll / touch capture — only when section is in view */
  useEffect(() => {
    const handleWheel = (e: Event) => {
      const we = e as globalThis.WheelEvent;
      if (!isInViewRef.current) return;

      if (mediaFullyExpanded && we.deltaY < 0) {
        setMediaFullyExpanded(false);
        we.preventDefault();
      } else if (!mediaFullyExpanded) {
        we.preventDefault();
        const delta = we.deltaY * 0.0009;
        const next = Math.min(Math.max(scrollProgress + delta, 0), 1);
        setScrollProgress(next);
        if (next >= 1) { setMediaFullyExpanded(true); setShowContent(true); }
        else if (next < 0.75) setShowContent(false);
      }
    };

    const handleTouchStart = (e: Event) => {
      setTouchStartY((e as globalThis.TouchEvent).touches[0].clientY);
    };

    const handleTouchMove = (e: Event) => {
      const te = e as globalThis.TouchEvent;
      if (!isInViewRef.current || !touchStartY) return;
      const deltaY = touchStartY - te.touches[0].clientY;

      if (mediaFullyExpanded && deltaY < -20) {
        setMediaFullyExpanded(false);
        te.preventDefault();
      } else if (!mediaFullyExpanded) {
        te.preventDefault();
        const factor = deltaY < 0 ? 0.008 : 0.005;
        const next = Math.min(Math.max(scrollProgress + deltaY * factor, 0), 1);
        setScrollProgress(next);
        if (next >= 1) { setMediaFullyExpanded(true); setShowContent(true); }
        else if (next < 0.75) setShowContent(false);
        setTouchStartY(te.touches[0].clientY);
      }
    };

    const handleTouchEnd = () => setTouchStartY(0);

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [scrollProgress, mediaFullyExpanded, touchStartY]);

  const mediaW = 300 + scrollProgress * (isMobile ? 650 : 1250);
  const mediaH = 400 + scrollProgress * (isMobile ? 200 : 400);
  const textShift = scrollProgress * (isMobile ? 180 : 150);

  const firstWord = title ? title.split(' ')[0] : '';
  const rest = title ? title.split(' ').slice(1).join(' ') : '';

  /* Build YouTube embed URL — no autoplay, controls visible, clickable */
  const embedSrc = (() => {
    if (!mediaSrc.includes('youtube') && !mediaSrc.includes('youtu.be')) return mediaSrc;
    let id = '';
    if (mediaSrc.includes('youtu.be/')) id = mediaSrc.split('youtu.be/')[1].split('?')[0];
    else if (mediaSrc.includes('watch?v=')) id = mediaSrc.split('watch?v=')[1].split('&')[0];
    else if (mediaSrc.includes('/embed/')) {
      id = mediaSrc.split('/embed/')[1].split('?')[0];
    }
    return `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`;
  })();

  return (
    <div ref={sectionRef} className="overflow-x-hidden">
      <section className="relative flex flex-col items-center justify-start min-h-[100dvh]">
        <div className="relative w-full flex flex-col items-center min-h-[100dvh]">

          {/* Background image — fades as video expands */}
          <motion.div
            className="absolute inset-0 z-0 h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 - scrollProgress }}
            transition={{ duration: 0.1 }}
          >
            <Image
              src={bgImageSrc}
              alt="Background"
              width={1920}
              height={1080}
              className="w-screen h-screen object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-black/50" />
          </motion.div>

          <div className="container mx-auto flex flex-col items-center justify-start relative z-10">
            <div className="flex flex-col items-center justify-center w-full h-[100dvh] relative">

              {/* Expanding media container */}
              <div
                className="absolute z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl"
                style={{
                  width: `${mediaW}px`,
                  height: `${mediaH}px`,
                  maxWidth: '95vw',
                  maxHeight: '85vh',
                  boxShadow: '0 0 60px rgba(0,0,0,0.4)',
                }}
              >
                {mediaType === 'video' ? (
                  <div className="relative w-full h-full">
                    <iframe
                      width="100%"
                      height="100%"
                      src={embedSrc}
                      className="w-full h-full rounded-xl"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                    <motion.div
                      className="absolute inset-0 bg-black/20 rounded-xl pointer-events-none"
                      animate={{ opacity: Math.max(0, 0.4 - scrollProgress * 0.5) }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                ) : (
                  <div className="relative w-full h-full">
                    <Image
                      src={mediaSrc}
                      alt={title || 'Media'}
                      width={1280}
                      height={720}
                      className="w-full h-full object-cover rounded-xl"
                    />
                    <motion.div
                      className="absolute inset-0 bg-black/50 rounded-xl"
                      animate={{ opacity: 0.7 - scrollProgress * 0.3 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                )}

                {/* Scroll hint text */}
                {scrollToExpand && (
                  <div className="flex justify-center mt-4">
                    <p
                      className="text-white/60 text-xs font-sans tracking-[0.2em] uppercase"
                      style={{ transform: `translateX(${textShift}vw)` }}
                    >
                      {scrollToExpand}
                    </p>
                  </div>
                )}
              </div>

              {/* Title words that split apart */}
              <div
                className={`flex items-center justify-center text-center gap-4 w-full relative z-10 flex-col ${
                  textBlend ? 'mix-blend-difference' : ''
                }`}
              >
                <h2
                  className="font-serif font-bold text-white leading-none"
                  style={{
                    fontSize: 'clamp(2.5rem, 8vw, 6rem)',
                    transform: `translateX(-${textShift}vw)`,
                  }}
                >
                  {firstWord}
                </h2>
                <h2
                  className="font-serif font-bold text-white leading-none"
                  style={{
                    fontSize: 'clamp(2.5rem, 8vw, 6rem)',
                    transform: `translateX(${textShift}vw)`,
                  }}
                >
                  {rest}
                </h2>
              </div>
            </div>

            {/* Optional content below (fades in after full expansion) */}
            {children && (
              <motion.section
                className="flex flex-col w-full px-8 py-10 md:px-16 lg:py-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: showContent ? 1 : 0 }}
                transition={{ duration: 0.7 }}
              >
                {children}
              </motion.section>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollExpandMedia;
