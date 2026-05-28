"use client";

export function BackToTopButton() {
  return (
    <div className="flex justify-center pt-2 pb-8">
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="font-sans text-[11px] tracking-[0.22em] uppercase text-muted border border-muted/40 rounded-full px-5 py-2.5 hover:text-ink hover:border-ink transition-colors duration-200 cursor-pointer"
      >
        ↑ Back to top
      </button>
    </div>
  );
}
