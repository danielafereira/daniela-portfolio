import Link from "next/link";
import Nav from "@/components/Nav";
import WorkExperience from "@/components/WorkExperience";
import ToolsSection from "@/components/ToolsSection";
import { VideoScrollHero } from "@/components/ui/video-scroll-hero";
import { CursorDitherTrail } from "@/components/ui/cursor-dither-trail";
import TiltedCard from "@/components/ui/TiltedCard";
import CurvedLoop from "@/components/ui/CurvedLoop";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import StickyScrollGallery from "@/components/ui/StickyScrollGallery";
import { HashScroll } from "@/components/HashScroll";
import { projects } from "@/lib/projects";
import { caseStudies } from "@/lib/caseStudies";

const playgroundImages = [
  { src: "/images/playground/Playground_1.png", title: "", info: "" },
  { src: "/images/playground/Playground_2.png", title: "", info: "" },
  { src: "/images/playground/Playground_3.png", title: "", info: "" },
  { src: "/images/playground/Playground_4.png", title: "", info: "" },
  { src: "/images/playground/Playground_5.png", title: "", info: "" },
  { src: "/images/playground/Playground_6.png", title: "", info: "" },
  { src: "/images/playground/Playground_7.png", title: "", info: "" },
  { src: "/images/playground/Playground_8.png", title: "", info: "" },
  { src: "/images/playground/Playground_9.png", title: "", info: "" },
  { src: "/images/playground/Playground_10.png", title: "", info: "" },
  { src: "/images/playground/Playground_11.png", title: "", info: "" },
  { src: "/images/playground/Playground_13.png", title: "", info: "" },
];

/* ─── PAGE ──────────────────────────────────────────────────────────────── */

export default function Home() {
  return (
    <>
      <HashScroll />
      <Nav />

      <main>
        {/* ══ HERO ══════════════════════════════════════════════════════════ */}
        <section id="hero" className="md:min-h-screen bg-cream flex flex-col pt-16">

          {/* Photo banner — full composition from Figma */}
          <div className="mx-4 sm:mx-8 md:mx-12 rounded-2xl overflow-hidden shrink-0 relative h-[80vw] sm:h-[65vw] md:h-auto">
            {/* Background layer — the bar/room photo */}
            <img
              src="/images/hero-bg.png.png"
              alt=""
              className="w-full h-full object-cover md:h-auto md:object-fill block"
            />
            {/* Glow canvas — sits between bg and Daniela */}
            <CursorDitherTrail trailColor="#FFFBAF" dotSize={4} fadeDuration={300} />
            {/* Foreground layer — Daniela cutout on transparent background */}
            <img
              src="/images/hero-fg.png.png"
              alt="Daniela Fereira"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            />
          </div>

          {/* Typography block */}
          <div className="flex-1 flex flex-col items-center justify-start md:justify-center px-6 md:px-12 pt-10 pb-4 md:py-8 text-center">

            <p className="font-sans text-ink text-base mb-3">
              Prepare your fingers to scroll on
            </p>

            <h1 className="text-ink leading-none" style={{ letterSpacing: "-0.04em" }}>
              <span
                className="block font-editorial uppercase"
                style={{ fontSize: "clamp(2.5rem, 6.5vw, 6rem)", lineHeight: 1.05 }}
              >
                Daniela's amazing
              </span>
              <span
                className="block font-sans font-black uppercase"
                style={{ fontSize: "clamp(3.5rem, 8.7vw, 8rem)", lineHeight: 1.0 }}
              >
                Portfolio
              </span>
            </h1>

            <p className="font-sans text-ink text-base mt-4 md:mt-8 mb-1">
              I'm great at
            </p>

            <div
              className="font-heading font-extrabold text-ink uppercase leading-snug"
              style={{ fontSize: "clamp(0.9rem, 1.5vw, 1.2rem)" }}
            >
              <p>Graphic Design, Motion Graphics,</p>
              <p>Creative Direction, Etc. Etc.</p>
            </div>

          </div>
        </section>

        {/* ══ ABOUT ═════════════════════════════════════════════════════════ */}
        <section id="about" className="relative py-14 md:py-28 px-6 md:px-16">
          <CursorDitherTrail trailColor="#CA75FF" dotSize={4} fadeDuration={300} global className="-z-10" />
          <div className="relative max-w-7xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 lg:gap-28 items-start">

            {/* About Me + Tools */}
            <div>
              <h2 className="font-sans font-extrabold text-5xl md:text-6xl mb-5 md:mb-8 leading-tight text-ink">
                About Me
              </h2>
              <p className="font-sans text-base leading-[1.8] text-muted max-w-md">
                My work sits somewhere between playfulness and precision. I help
                brands and teams turn ideas into visual systems, motion, and
                experiences that feel cohesive and alive — blending animation,
                texture, and concept-driven storytelling.
              </p>
              <p className="font-sans text-base leading-[1.8] text-muted max-w-md mt-5">
                I'm drawn to projects that demand both rigour and imagination:
                where visual language must carry meaning, evoke feeling, and
                communicate with precision.
              </p>
              <ToolsSection />
            </div>

            {/* Experience */}
            <div>
              <h2 className="font-sans font-extrabold text-5xl md:text-6xl mb-5 md:mb-8 leading-tight text-ink">
                Experience
              </h2>
              <WorkExperience />
            </div>
          </div>
        </section>

        {/* ══ REEL ══════════════════════════════════════════════════════════ */}
        <section id="reel">
          <VideoScrollHero
            videoSrc="https://youtu.be/xwCn1-7jQro"
            title="Motion Reel"
            subtitle={"Every brand has a universe inside it.\nI'm the one who makes it move."}
          />
        </section>

        {/* ══ PROJECTS ══════════════════════════════════════════════════════ */}
        <section id="projects" className="py-14 md:py-28 px-6 md:px-16">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-sans font-extrabold text-5xl md:text-6xl mb-8 md:mb-12 leading-tight text-ink">
              Selected Projects
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  className="block aspect-[3/4]"
                >
                  <TiltedCard
                    imageSrc={`/images/projects/${project.slug}/${project.cover}`}
                    altText={project.title}
                    captionText={project.title}
                    containerHeight="100%"
                    imageWidth="100%"
                    imageHeight="100%"
                    scaleOnHover={1.05}
                    rotateAmplitude={11}
                    showTooltip={false}
                    displayOverlayContent={true}
                    overlayContent={
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ clipPath: "inset(0 round 15px)" }}>
                        {/* Gradient + text appear together on hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col justify-end">
                          <h3 className="font-sans font-extrabold text-2xl uppercase text-white mb-3 leading-tight">
                            {project.title}
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {project.areas.map((area) => (
                              <span
                                key={area}
                                className="font-sans text-[13px] text-cream/80 border border-cream/40 rounded-[13px] px-2 py-1.5"
                              >
                                {area}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    }
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ══ CASE STUDIES ══════════════════════════════════════════════════ */}
        <section id="cases" className="py-14 md:py-28 px-6 md:px-16">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-sans font-extrabold text-5xl md:text-6xl mb-8 md:mb-16 leading-tight text-ink">
              Case Studies
            </h2>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {caseStudies.map((c) => (
                <article key={c.num} className="border-t border-line pt-8">
                  {c.cover ? (
                    <Link href={`/cases/${c.slug}`}>
                      <img
                        src={`/images/cases/${c.slug}/${c.cover}`}
                        alt={c.title}
                        className="w-full h-[14.4rem] md:h-[18rem] object-cover object-top rounded-[15px] mb-5 cursor-pointer"
                      />
                    </Link>
                  ) : (
                    <div className="w-full h-[9rem] bg-line rounded-[15px] mb-5" />
                  )}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {c.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-sans text-[13px] text-muted border border-muted/50 rounded-[13px] px-2 py-1.5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-sans font-extrabold text-2xl leading-snug text-ink mb-4">
                    {c.title}
                  </h3>
                  <p className="font-sans text-sm text-muted leading-[1.8] mb-7">
                    {c.overview}
                  </p>
                  <Link
                    href={`/cases/${c.slug}`}
                    className="font-sans font-semibold text-sm text-ink hover:text-muted transition-colors duration-200"
                  >
                    Read case study →
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ══ PLAYGROUND ════════════════════════════════════════════════════ */}
        <section id="playground" className="py-14 md:py-28 px-6 md:px-16">
          <div className="max-w-7xl mx-auto">
            <CurvedLoop
              segments={[
                { text: "playground ", className: "fill-ink font-sans font-extrabold" },
                { text: ":) ", className: "fill-ink font-sans font-semibold" },
              ]}
              speed={2}
              curveAmount={60}
              fontSize={100}
              className="fill-ink font-sans font-extrabold"
              containerClassName="mb-12"
            />

            <StickyScrollGallery images={playgroundImages} />
          </div>
        </section>

        {/* ══ FOOTER / CONTACT ══════════════════════════════════════════════ */}
        <footer id="contact" className="relative bg-ink py-14 md:py-28 px-6 md:px-16">
          <CursorDitherTrail
            colors={["#FFFBAF", "#CA75FF"]}
            cycleDuration={3500}
            dotSize={5}
            fadeDuration={120}
            global
            className="-z-0 pointer-events-none"
          />
          <div className="max-w-7xl mx-auto">
            <h2 className="text-cream leading-none mb-10 md:mb-20 text-center">
              <span
                className="block font-editorial font-normal uppercase"
                style={{ fontSize: "clamp(2.25rem, 6.5vw, 5.9375rem)" }}
              >
                Bring Me
              </span>
              <span
                className="block font-sans font-black uppercase"
                style={{ fontSize: "clamp(3rem, 8.7vw, 6.875rem)" }}
              >
                Your Ideas
              </span>
            </h2>

            <div className="border-t border-white/10 pt-8 md:pt-12 text-center">
              <p className="font-sans font-semibold text-[11px] tracking-[0.22em] uppercase text-cream/40 mb-4">
                Slide in
              </p>
              <a
                href="mailto:danielafereira.design@gmail.com"
                className="font-sans font-semibold text-sm md:text-2xl text-cream hover:text-muted transition-colors duration-200"
              >
                danielafereira.design@gmail.com
              </a>

              <nav className="flex justify-center gap-8 font-sans text-[11px] tracking-[0.22em] uppercase text-cream/50 mt-8">
                <a href="https://www.linkedin.com/in/danielafereira/" target="_blank" rel="noopener noreferrer" className="hover:text-cream transition-colors duration-200">LinkedIn</a>
                <a href="https://www.behance.net/daniela-fereira" target="_blank" rel="noopener noreferrer" className="hover:text-cream transition-colors duration-200">Behance</a>
              </nav>
            </div>

            <p className="mt-8 md:mt-16 text-[11px] font-sans text-muted tracking-wide text-center">
              © 2026 Daniela Fereira. All rights reserved.
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
