"use client";

import { useRef, useEffect, useState, useMemo, useId } from "react";

interface TextSegment {
  text: string;
  className?: string;
}

interface CurvedLoopProps {
  marqueeText?: string;
  /** Alternative to marqueeText: per-segment text with individual classNames */
  segments?: TextSegment[];
  speed?: number;
  /** SVG-unit font size. Scales proportionally with container width. Default: 80 */
  fontSize?: number;
  className?: string;
  containerClassName?: string;
  curveAmount?: number;
  direction?: "left" | "right";
  interactive?: boolean;
  /** Optional image URL to use as inline separator between text repetitions */
  separatorSrc?: string;
  /** Size (width & height) of the separator image in SVG units. Default: 70 */
  separatorSize?: number;
}

export default function CurvedLoop({
  marqueeText = "",
  segments,
  speed = 2,
  fontSize = 80,
  className = "",
  containerClassName = "",
  curveAmount = 60,
  direction = "left",
  interactive = true,
  separatorSrc,
  separatorSize = 70,
}: CurvedLoopProps) {
  // Normalise to segments array; last segment gets trailing space
  const resolvedSegments = useMemo<TextSegment[]>(() => {
    if (segments && segments.length > 0) {
      const last = segments[segments.length - 1];
      return [
        ...segments.slice(0, -1),
        { ...last, text: last.text.trimEnd() + " " },
      ];
    }
    return [{ text: marqueeText.trimEnd() + " " }];
  }, [segments, marqueeText]);

  const text = useMemo(
    () => resolvedSegments.map((s) => s.text).join(""),
    [resolvedSegments]
  );

  const measureRef = useRef<SVGTextElement>(null);
  const textPathRef = useRef<SVGTextPathElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const imageRefs = useRef<SVGImageElement[]>([]);

  const [spacing, setSpacing] = useState(0);
  const [offset, setOffset] = useState(0);
  const uid = useId();
  const pathId = `curve-${uid}`;

  const svgH = fontSize * 1.5 + Math.abs(curveAmount);
  const baseY = fontSize * 1.1;
  const pathD = `M-100,${baseY} Q720,${baseY + curveAmount} 1540,${baseY}`;

  const dragRef = useRef(false);
  const lastXRef = useRef(0);
  const dirRef = useRef(direction);
  const velRef = useRef(0);
  const frameRef = useRef<number>(0);

  const repeatCount = spacing ? Math.ceil(1800 / spacing) + 2 : 2;
  const totalText = spacing ? Array(repeatCount).fill(text).join("") : text;
  const ready = spacing > 0;

  useEffect(() => {
    const measure = () => {
      if (!measureRef.current) return;
      const len = measureRef.current.getComputedTextLength();
      if (len > 0) setSpacing(len);
      else requestAnimationFrame(measure);
    };
    document.fonts.ready.then(measure);
  }, [text, fontSize, className]);

  useEffect(() => {
    if (!spacing || !textPathRef.current) return;
    const initial = -spacing;
    textPathRef.current.setAttribute("startOffset", initial + "px");
    setOffset(initial);
  }, [spacing]);

  useEffect(() => {
    if (!spacing || !ready) return;

    const path = pathRef.current;
    const half = separatorSize / 2;

    const placeImages = (currentOffset: number) => {
      if (!separatorSrc || !path) return;
      const totalLen = path.getTotalLength();

      imageRefs.current.forEach((img, i) => {
        if (!img) return;
        // Separator i sits right after text repetition i along the same path
        const pos = currentOffset + spacing * (i + 1) - half;
        const clamped = Math.max(0, Math.min(pos, totalLen));
        const pt = path.getPointAtLength(clamped);
        const pt2 = path.getPointAtLength(Math.min(clamped + 1, totalLen));
        const angle = Math.atan2(pt2.y - pt.y, pt2.x - pt.x) * (180 / Math.PI);
        img.setAttribute(
          "transform",
          `translate(${pt.x},${pt.y}) rotate(${angle}) translate(${-half},${-half})`
        );
        // Hide when outside the visible path range
        img.setAttribute("opacity", pos >= -half && pos <= totalLen + half ? "1" : "0");
      });
    };

    const step = () => {
      if (!dragRef.current && textPathRef.current) {
        const delta = dirRef.current === "right" ? speed : -speed;
        const curr = parseFloat(textPathRef.current.getAttribute("startOffset") || "0");
        let next = curr + delta;
        if (next <= -spacing) next += spacing;
        if (next > 0) next -= spacing;
        textPathRef.current.setAttribute("startOffset", next + "px");
        setOffset(next);
        placeImages(next);
      }
      frameRef.current = requestAnimationFrame(step);
    };

    frameRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameRef.current);
  }, [spacing, speed, ready, separatorSrc, separatorSize]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (!interactive) return;
    dragRef.current = true;
    lastXRef.current = e.clientX;
    velRef.current = 0;
    (e.target as Element).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!interactive || !dragRef.current || !textPathRef.current) return;
    const dx = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    velRef.current = dx;
    const curr = parseFloat(textPathRef.current.getAttribute("startOffset") || "0");
    let next = curr + dx;
    if (next <= -spacing) next += spacing;
    if (next > 0) next -= spacing;
    textPathRef.current.setAttribute("startOffset", next + "px");
    setOffset(next);
  };

  const endDrag = () => {
    if (!interactive) return;
    dragRef.current = false;
    dirRef.current = velRef.current > 0 ? "right" : "left";
  };

  const cursorStyle = interactive ? "grab" : "auto";

  return (
    <div
      className={`w-full overflow-hidden ${containerClassName}`}
      style={{ visibility: ready ? "visible" : "hidden", cursor: cursorStyle }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
    >
      <svg
        width="100%"
        viewBox={`0 0 1440 ${svgH}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ display: "block", overflow: "visible" }}
      >
        {/* Invisible measure element */}
        <text
          ref={measureRef}
          fontSize={fontSize}
          className={className}
          xmlSpace="preserve"
          style={{ visibility: "hidden", opacity: 0, pointerEvents: "none" }}
        >
          {text}
        </text>

        <defs>
          <path ref={pathRef} id={pathId} d={pathD} fill="none" />
        </defs>

        {ready && (
          <>
            <text fontSize={fontSize} xmlSpace="preserve" className={className}>
              <textPath
                ref={textPathRef}
                href={`#${pathId}`}
                startOffset={offset + "px"}
                xmlSpace="preserve"
              >
                {Array.from({ length: repeatCount }).map((_, rep) =>
                  resolvedSegments.map((seg, si) => (
                    <tspan key={`${rep}-${si}`} className={seg.className ?? className}>
                      {seg.text}
                    </tspan>
                  ))
                )}
              </textPath>
            </text>

            {separatorSrc &&
              Array.from({ length: repeatCount }).map((_, i) => (
                <image
                  key={i}
                  ref={(el) => { if (el) imageRefs.current[i] = el; }}
                  href={separatorSrc}
                  width={separatorSize}
                  height={separatorSize}
                  opacity={0}
                  style={{ pointerEvents: "none" }}
                />
              ))}
          </>
        )}
      </svg>
    </div>
  );
}
