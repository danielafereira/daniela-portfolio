"use client";

import React, { useRef, useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import Grainient from "./Grainient";

interface VideoScrollHeroProps {
  videoSrc?: string;
  enableAnimations?: boolean;
  className?: string;
  startScale?: number;
  title?: string;
  subtitle?: string;
}

export function VideoScrollHero({
  videoSrc = "",
  enableAnimations = true,
  className = "",
  startScale = 0.4,
  title = "Motion Reel",
  subtitle = "",
}: VideoScrollHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (!enableAnimations || shouldReduceMotion) return;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = containerRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrolled = Math.max(0, -rect.top);
      const maxScroll = containerHeight - windowHeight;
      const progress = Math.min((scrolled / maxScroll) * 1.20, 1);
      setScrollProgress(progress);

      // Pause when section scrolls out of view (bottom edge above viewport)
      if (rect.bottom <= 0) {
        iframeRef.current?.contentWindow?.postMessage(
          '{"event":"command","func":"pauseVideo","args":""}',
          "*"
        );
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [enableAnimations, shouldReduceMotion]);

  const shouldAnimate = enableAnimations && !shouldReduceMotion;
  const scale = startScale + scrollProgress * (1 - startScale);
  const titleOpacity = Math.max(0, 1 - scrollProgress * 2.5);

  const isYouTube = videoSrc.includes("youtube") || videoSrc.includes("youtu.be");
  const embedSrc = (() => {
    if (!isYouTube) return videoSrc;
    let id = "";
    if (videoSrc.includes("youtu.be/")) id = videoSrc.split("youtu.be/")[1].split("?")[0];
    else if (videoSrc.includes("watch?v=")) id = videoSrc.split("watch?v=")[1].split("&")[0];
    else if (videoSrc.includes("/embed/")) id = videoSrc.split("/embed/")[1].split("?")[0];
    return `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1&enablejsapi=1`;
  })();

  return (
    <div className={`relative ${className}`}>
      <div ref={containerRef} className="relative h-[160vh] md:h-[250vh] bg-[#0d0d0d]">
        <div className="sticky top-0 w-full h-screen overflow-hidden relative">

          {/* Grainient background */}
          <div className="absolute inset-0 z-0">
            <Grainient
              color1="#FFFBAF"
              color2="#1A1A1A"
              color3="#CA75FF"
              timeSpeed={0.25}
              colorBalance={0.0}
              warpStrength={0}
              warpFrequency={8.1}
              warpSpeed={2.0}
              warpAmplitude={55}
              blendAngle={-36}
              blendSoftness={0.21}
              rotationAmount={810}
              noiseScale={2.25}
              grainAmount={0.1}
              grainScale={2.0}
              grainAnimated={false}
              contrast={1.5}
              gamma={0.45}
              saturation={0.75}
              centerX={0.24}
              centerY={-0.04}
              zoom={1.8}
            />
          </div>

          {/* Title — fades out on scroll */}
          <h2
            className="font-editorial font-normal text-cream text-center pointer-events-none whitespace-nowrap absolute left-1/2 z-10"
            style={{
              top: "calc(50% - 22vh)",
              transform: "translateX(-50%) translateY(-50%)",
              fontSize: "clamp(2.5rem, 7.5vw, 5.5rem)",
              letterSpacing: "-0.04em",
              opacity: titleOpacity,
            }}
          >
            {title.toUpperCase()}
          </h2>

          {/* Video — scales up on scroll, centered */}
          <div
            className="absolute left-1/2 top-1/2 will-change-transform z-10"
            style={{
              transform: shouldAnimate
                ? `translate(-50%, -50%) scale(${scale})`
                : "translate(-50%, -50%)",
            }}
          >
            {isYouTube ? (
              <iframe
                ref={iframeRef}
                src={embedSrc}
                className="w-[85vw] max-w-5xl aspect-video rounded-2xl shadow-2xl block"
                style={{ border: 0 }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-[85vw] max-w-5xl aspect-video object-cover rounded-2xl shadow-2xl block"
              >
                <source src={videoSrc} type="video/mp4" />
              </video>
            )}
          </div>

          {/* Scroll hint */}
          <p
            className="absolute bottom-10 left-1/2 -translate-x-1/2 font-sans text-[10px] tracking-[0.3em] uppercase text-cream/40 z-10 pointer-events-none"
            style={{ opacity: titleOpacity }}
          >
            Scroll to expand
          </p>

          {/* Subtitle — fades out on scroll */}
          {subtitle && (
            <p
              className="font-sans font-extrabold text-cream text-center uppercase pointer-events-none whitespace-pre-line absolute left-1/2 z-10"
              style={{
                top: "calc(50% + 20vh)",
                transform: "translateX(-50%) translateY(-50%)",
                fontSize: "clamp(0.85rem, 2.3vw, 1.4rem)",
                letterSpacing: "-0.04em",
                opacity: titleOpacity,
              }}
            >
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
