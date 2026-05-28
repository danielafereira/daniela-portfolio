"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface PlaygroundImage {
  src: string;
  title?: string;
  info?: string;
}

interface StickyScrollGalleryProps {
  images: PlaygroundImage[];
  className?: string;
}

function GalleryImage({
  image,
  tall,
  onClick,
}: {
  image: PlaygroundImage;
  tall?: boolean;
  onClick: () => void;
}) {
  return (
    <figure
      className="w-full cursor-pointer group relative overflow-hidden rounded-[15px] self-start"
      onClick={onClick}
    >
      <img
        src={image.src}
        alt={image.title ?? ""}
        className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 rounded-[15px] bg-ink/0 group-hover:bg-ink/20 transition-colors duration-300" />
    </figure>
  );
}

export default function StickyScrollGallery({
  images,
  className = "",
}: StickyScrollGalleryProps) {
  const [selected, setSelected] = useState<PlaygroundImage | null>(null);

  const leftImages   = images.filter((_, i) => i % 3 === 0);
  const middleImages = images.filter((_, i) => i % 3 === 1);
  const rightImages  = images.filter((_, i) => i % 3 === 2);

  return (
    <>
      <div className={`w-full ${className}`}>
        <div className="grid grid-cols-12 gap-3">
          {/* Left — scrolls normally */}
          <div className="grid gap-3 col-span-4 items-start content-start">
            {leftImages.map((img, i) => (
              <GalleryImage key={i} image={img} onClick={() => setSelected(img)} />
            ))}
          </div>

          {/* Middle — sticky */}
          <div className="sticky top-20 h-fit col-span-4 gap-3 grid items-start content-start">
            {middleImages.map((img, i) => (
              <GalleryImage key={i} image={img} tall onClick={() => setSelected(img)} />
            ))}
          </div>

          {/* Right — scrolls normally */}
          <div className="grid gap-3 col-span-4 items-start content-start">
            {rightImages.map((img, i) => (
              <GalleryImage key={i} image={img} onClick={() => setSelected(img)} />
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            key="lightbox"
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setSelected(null)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-ink/85 backdrop-blur-sm" />

            {/* Panel */}
            <motion.div
              className="relative z-10 flex justify-center items-center max-w-2xl w-full"
              initial={{ scale: 0.94, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 16 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selected.src}
                alt={selected.title ?? ""}
                className="max-h-[85vh] max-w-full w-auto object-contain rounded-[15px] shadow-2xl"
              />
            </motion.div>

            {/* X button */}
            <button
              className="absolute top-6 right-6 z-20 text-cream/60 hover:text-cream transition-colors duration-200 text-3xl leading-none font-light"
              onClick={() => setSelected(null)}
              aria-label="Close"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
