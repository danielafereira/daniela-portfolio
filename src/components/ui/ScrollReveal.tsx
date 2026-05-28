"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function ScrollReveal({
  children,
  initialHeight = 680,
}: {
  children: React.ReactNode;
  initialHeight?: number;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [fullHeight, setFullHeight] = useState(initialHeight * 4);

  useEffect(() => {
    if (contentRef.current) {
      setFullHeight(contentRef.current.scrollHeight);
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"],
  });

  const height = useTransform(scrollYProgress, [0, 0.2, 1], [initialHeight, initialHeight, fullHeight]);

  return (
    <div ref={sectionRef}>
      <motion.div ref={contentRef} style={{ height, overflow: "hidden" }}>
        {children}
      </motion.div>
    </div>
  );
}
