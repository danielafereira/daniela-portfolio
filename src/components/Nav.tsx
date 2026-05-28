"use client";
import { useEffect, useState } from "react";

const links = [
  { label: "About",      href: "#about"      },
  { label: "Reel",       href: "#reel"       },
  { label: "Projects",   href: "#projects"   },
  { label: "Cases",      href: "#cases"      },
  { label: "Playground", href: "#playground" },
  { label: "Contact",    href: "#contact"    },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || menuOpen
          ? "bg-cream/90 backdrop-blur-md border-b border-line"
          : "bg-transparent"
      }`}
    >
      <nav className="px-4 sm:px-8 md:px-12 h-16 flex items-center justify-between">
        <a
          href="#hero"
          className="font-sans text-[17px] text-ink tracking-tight uppercase"
          onClick={() => setMenuOpen(false)}
        >
          <span className="font-extrabold">Daniela</span>
          <span className="font-normal"> Fereira</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[11px] font-sans uppercase text-ink hover:text-muted transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Hamburger — mobile only */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-1"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-px bg-ink transition-all duration-300 origin-center ${menuOpen ? "translate-y-[6px] rotate-45" : ""}`} />
          <span className={`block w-6 h-px bg-ink transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-px bg-ink transition-all duration-300 origin-center ${menuOpen ? "-translate-y-[6px] -rotate-45" : ""}`} />
        </button>
      </nav>

      {/* Mobile dropdown */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${menuOpen ? "max-h-80" : "max-h-0"}`}>
        <div className="flex flex-col px-6 pb-6 pt-2 gap-5">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[13px] font-sans uppercase tracking-[0.18em] text-ink hover:text-muted transition-colors duration-200"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
