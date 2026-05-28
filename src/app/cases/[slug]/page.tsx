import { notFound } from "next/navigation";
import Link from "next/link";
import { caseStudies, getCaseStudy } from "@/lib/caseStudies";
import { ScrollToTop } from "@/components/ScrollToTop";
import { BackToTopButton } from "@/components/BackToTopButton";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  return {
    title: cs ? `${cs.title} — Daniela Fereira` : "Case study not found",
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  return (
    <main className="bg-cream min-h-screen">
      <ScrollToTop />

      {/* ── Top bar ─────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-7 flex items-center justify-between">
        <Link
          href="/#cases"
          className="text-[11px] font-sans tracking-[0.22em] uppercase text-muted hover:text-ink transition-colors duration-200"
        >
          ← Back
        </Link>
        <Link href="/" className="font-sans text-[17px] text-ink tracking-tight uppercase">
          <span className="font-extrabold">Daniela</span>
          <span className="font-normal"> Fereira</span>
        </Link>
      </div>

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-6 md:pt-12 pb-8 md:pb-16">

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {cs.tags.map((tag) => (
            <span
              key={tag}
              className="font-sans text-[13px] text-muted border border-muted/50 rounded-[13px] px-2 py-1.5"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1
          className="font-sans font-black uppercase leading-none text-ink"
          style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)" }}
        >
          {cs.title}
        </h1>

        {/* Divider + meta */}
        <div className="border-t border-line mt-10" />
        <div className="flex gap-10 font-sans text-sm pt-8">
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-muted/50 font-extrabold mb-1.5">Client</p>
            <p className="text-ink">{cs.client}</p>
          </div>
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-muted/50 font-extrabold mb-1.5">Role</p>
            <p className="text-ink">{cs.role}</p>
          </div>
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-muted/50 font-extrabold mb-1.5">Period</p>
            <p className="text-ink">{cs.period}</p>
          </div>
        </div>
      </div>

      {/* ── Hero image ──────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-8 md:pb-16">
        {cs.images?.[0] ? (
          <img
            src={`/images/cases/${cs.slug}/${cs.images[0]}`}
            alt={cs.title}
            className="w-full aspect-[16/7] object-cover rounded-2xl"
          />
        ) : (
          <div className="w-full aspect-[16/7] bg-line rounded-2xl" />
        )}
      </div>

      {/* ── Content ─────────────────────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 flex flex-col gap-8 md:gap-16">
        <Section label="Overview" body={cs.overview} />
        <Section label="The Challenge" body={cs.challenge} />
        <Section label="My Approach" body={cs.approach} />
      </div>

      {/* Approach images — wider than text */}
      {cs.images && cs.images.length > 1 && (
        <div className="max-w-6xl mx-auto px-6 md:px-12 mt-8 md:mt-16">
          <div
            className="grid gap-4"
            style={{ gridTemplateColumns: `repeat(${cs.images.length - 1}, 1fr)` }}
          >
            {cs.images.slice(1).map((img, i) => (
              <div key={i} className="relative group overflow-hidden rounded-2xl">
                <img
                  src={`/images/cases/${cs.slug}/${img}`}
                  alt={`${cs.title} ${i + 1}`}
                  className="w-full h-auto"
                />
                {cs.imageTitles?.[i] && (
                  <div className="absolute bottom-0 left-0 right-0 px-4 py-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                    <p className="text-[10px] tracking-[0.2em] uppercase text-white/80 font-extrabold font-sans">
                      {cs.imageTitles[i]}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Results ─────────────────────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 mt-8 md:mt-16 pb-4 md:pb-8">
        <p className="text-[10px] tracking-[0.2em] uppercase text-muted/50 font-extrabold font-sans mb-6">
          Results
        </p>
        <p className="font-sans text-base leading-[1.9] text-muted mb-8">{cs.results}</p>

        {cs.table && (
          <div className="overflow-x-auto">
            <table className="w-full font-sans text-sm border-collapse">
              <thead>
                <tr className="border-b border-line">
                  {cs.table.headers.map((h) => (
                    <th
                      key={h}
                      className="text-left text-[10px] tracking-[0.2em] uppercase text-muted/50 font-extrabold pb-3 pr-6"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cs.table.rows.map((row, i) => (
                  <tr key={i} className="border-b border-line/60">
                    {row.map((cell, j) => (
                      <td
                        key={j}
                        className={`py-3 pr-6 ${j === 0 ? "text-ink font-semibold" : "text-muted"}`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Closing image */}
      {cs.closingImage && (
        <div className="max-w-6xl mx-auto px-6 md:px-12 pb-4 md:pb-8">
          <img
            src={`/images/cases/${cs.slug}/${cs.closingImage}`}
            alt={cs.title}
            className="w-full aspect-[16/9] object-cover rounded-2xl"
          />
        </div>
      )}

      <BackToTopButton />

      {/* ── Next case study ─────────────────────────────────────────────── */}
      <NextCase current={slug} />

    </main>
  );
}

function Section({ label, body }: { label: string; body: string }) {
  return (
    <div>
      <p className="text-[10px] tracking-[0.2em] uppercase text-muted/50 font-extrabold font-sans mb-6">
        {label}
      </p>
      <p className="font-sans text-base leading-[1.9] text-muted">{body}</p>
    </div>
  );
}

function NextCase({ current }: { current: string }) {
  const idx = caseStudies.findIndex((c) => c.slug === current);
  const prev = caseStudies[(idx - 1 + caseStudies.length) % caseStudies.length];

  return (
    <section className="bg-ink py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex justify-center">
        <div className="flex flex-col items-start gap-1">
          <span className="text-[11px] font-sans tracking-[0.22em] uppercase text-cream/40">
            Coming next:
          </span>
          <Link
            href={`/cases/${prev.slug}`}
            className="font-sans font-black uppercase text-cream hover:text-cream/60 transition-colors duration-200 leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3.125rem)" }}
          >
            {prev.title} →
          </Link>
        </div>
      </div>
    </section>
  );
}
