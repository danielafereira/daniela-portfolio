import { notFound } from "next/navigation";
import Link from "next/link";
import { projects, getProject, type MediaItem } from "@/lib/projects";
import { VideoPlayer } from "@/components/VideoPlayer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { BackToTopButton } from "@/components/BackToTopButton";
import { CursorDitherTrail } from "@/components/ui/cursor-dither-trail";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  return {
    title: project
      ? `${project.title} — Daniela Fereira`
      : "Project not found",
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const galleryItems = project.images.map((item) => {
    if (typeof item === "string") return { src: `/images/projects/${project.slug}/${item}` };
    if (item.youtube) return item;
    return { ...item, src: `/images/projects/${project.slug}/${item.src}` };
  });

  return (
    <main className="bg-cream min-h-screen">
      <ScrollToTop />

      {/* ── Top bar ────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-7 flex items-center justify-between">
        <Link
          href="/#projects"
          className="text-[11px] font-sans tracking-[0.22em] uppercase text-muted hover:text-ink transition-colors duration-200"
        >
          ← Back
        </Link>
        <Link
          href="/"
          className="font-sans text-[17px] text-ink tracking-tight uppercase"
        >
          <span className="font-extrabold">Daniela</span>
          <span className="font-normal"> Fereira</span>
        </Link>
      </div>

      {/* ── Project info ───────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-12 pb-16">

        {/* Area tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {project.areas.map((area) => (
            <span
              key={area}
              className="font-sans text-[13px] text-muted border border-muted/50 rounded-[13px] px-2 py-1.5"
            >
              {area}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1
          className="font-sans font-black uppercase leading-none text-ink"
          style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)" }}
        >
          {project.title}
        </h1>

        {/* Divider */}
        <div className="border-t border-line mt-10" />

        {/* Description + meta row */}
        <div className="grid md:grid-cols-[1fr_auto] gap-12 pt-8 items-start">
          <div className="flex flex-col gap-5">
            {project.description.split("\n\n").map((para, i) => (
              <p key={i} className="font-sans text-base leading-[1.9] text-muted">
                {para}
              </p>
            ))}
          </div>

          <div className="flex gap-10 font-sans text-sm shrink-0">
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-muted/50 font-extrabold mb-1.5">Year</p>
              <p className="text-ink">{project.year}</p>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-muted/50 font-extrabold mb-1.5">Client</p>
              <p className="text-ink">{project.client}</p>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-muted/50 font-extrabold mb-1.5">Area</p>
              <p className="text-ink">{project.area}</p>
            </div>
          </div>
        </div>

      </div>

      {/* ── Gallery ────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-2 pb-4">
        {galleryItems.map((item, i) => (
          <div key={i} className="flex flex-col gap-2">
            {(item.title || item.paragraphs) && (
              <div className="border-t border-line pt-8 pb-6 flex flex-col gap-6 items-center text-center">
                {item.title && (
                  <p className="text-[10px] tracking-[0.2em] uppercase text-muted/50 font-extrabold font-sans">
                    {item.title}
                  </p>
                )}
                {item.paragraphs && (
                  <div className="flex flex-col gap-4 max-w-2xl">
                    {item.paragraphs.map((p, j) => (
                      <p key={j} className="font-sans text-base leading-[1.9] text-muted">
                        {p}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            )}
            <div
              className="w-full rounded-2xl"
              style={{
                overflow: "clip",
                ...(item.customCursor ? { cursor: `url('${item.customCursor}') 16 16, auto` } : {}),
              }}
            >
              {item.youtube ? (
                <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                  <iframe
                    src={`https://www.youtube.com/embed/${item.youtube}`}
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ border: 0 }}
                  />
                </div>
              ) : item.src!.endsWith(".mp4") || item.src!.endsWith(".webm") ? (
                item.scrollPlay ? (
                  <VideoPlayer
                    src={item.src!}
                    style={item.zoom ? { transform: `scale(${item.zoom})` } : undefined}
                  />
                ) : (
                  <video
                    src={item.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-auto block pointer-events-none"
                    style={item.zoom ? { transform: `scale(${item.zoom})` } : undefined}
                  />
                )
              ) : (
                <img
                  src={item.src}
                  alt={`${project.title} — image ${i + 1}`}
                  className="w-full h-auto block pointer-events-none"
                  loading={i === 0 ? "eager" : "lazy"}
                  style={item.zoom ? { transform: `scale(${item.zoom})` } : undefined}
                />
              )}
            </div>
            {item.paragraphsAfter && (
              <div className="flex flex-col gap-4 max-w-5xl pt-2 mx-auto text-center">
                {item.paragraphsAfter.map((p, j) => (
                  <p key={j} className="font-sans text-base leading-[1.9] text-muted">
                    {p}
                  </p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <BackToTopButton />

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <ProjectFooter current={slug} />

    </main>
  );
}

function ProjectFooter({ current }: { current: string }) {
  const idx = projects.findIndex((p) => p.slug === current);
  const next = projects[(idx + 1) % projects.length];

  return (
    <>
      {/* ── Footer (igual que landing) ── */}
      <footer className="relative bg-ink py-14 px-6 md:px-16">
        <CursorDitherTrail
          colors={["#FFFBAF", "#CA75FF"]}
          cycleDuration={3500}
          dotSize={5}
          fadeDuration={120}
          global
          className="-z-0 pointer-events-none"
        />
        <div className="max-w-7xl mx-auto">
          <div className="text-cream leading-none mb-10 text-center">
            <span className="block font-sans text-[11px] tracking-[0.22em] uppercase text-cream/40 mb-4">
              Coming next
            </span>
            <Link
              href={`/projects/${next.slug}`}
              className="font-sans font-black uppercase text-cream hover:text-cream/60 transition-colors duration-200 leading-tight inline-flex items-center gap-2"
              style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
            >
              {next.title} <span style={{ fontSize: "0.6em" }}>→</span>
            </Link>
          </div>

          <div className="border-t border-white/10 pt-8 text-center">
            <p className="font-sans font-semibold text-[11px] tracking-[0.22em] uppercase text-cream/40 mb-3">
              Slide in
            </p>
            <a
              href="mailto:danielafereira.design@gmail.com"
              className="font-sans font-semibold text-xl md:text-2xl text-cream hover:text-muted transition-colors duration-200"
            >
              danielafereira.design@gmail.com
            </a>
            <nav className="flex justify-center gap-8 font-sans text-[11px] tracking-[0.22em] uppercase text-cream/50 mt-6">
              <a href="https://www.linkedin.com/in/danielafereira/" target="_blank" rel="noopener noreferrer" className="hover:text-cream transition-colors duration-200">LinkedIn</a>
              <a href="https://www.behance.net/daniela-fereira" target="_blank" rel="noopener noreferrer" className="hover:text-cream transition-colors duration-200">Behance</a>
            </nav>
          </div>

          <p className="mt-8 text-[11px] font-sans text-muted tracking-wide text-center">
            © 2026 Daniela Fereira. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
