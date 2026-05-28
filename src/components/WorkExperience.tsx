"use client";
import { useState } from "react";

const experiences = [
  {
    role: "Senior UX Designer",
    company: "Miravia",
    period: "Oct 2025 — Apr 2026",
    location: "Spain (In office)",
    description:
      "Led the visual design of seasonal and monetization campaigns across app and web, from Black Friday, through Christmas, gifting, Valentine's, and more. Producing banners, components, and full campaign assets. Developed an animation template system for monetization banners, including a multi-style editable file and usage guide, reducing production time by 7x. Built Miravia's Pinterest channel strategy end-to-end, developing an AI-assisted content system to drive organic traffic and a sense of discovery. Provided cross-team support for marketing activations including Metro Sol's Black Friday campaign and editorial features in Glamour magazine.",
  },
  {
    role: "Video Editor and Motion Designer",
    company: "Mozaic",
    period: "Feb 2024 — May 2025",
    location: "Madrid & Nashville (Remote)",
    description:
      "Served as video editor, motion designer, and creative director for social media and advertising campaigns. Designed and animated web assets to convert attention into clicks, and directed real-creator content for social reels, managing the full pipeline from casting and storyboarding to on-set production and post-editing. Collaborated with illustrators to develop an animated character series for email campaigns. Contributed actively to the brand's graphic design across web, social media, and merchandise.",
  },
  {
    role: "Graphic and Motion Designer",
    company: "Freelancer",
    period: "Jul 2017 — Oct 2025",
    location: "Venezuela & Spain (Remote)",
    description:
      "Led branding, visual concept development, and motion design for a diverse roster of clients, adapting and creating across industries while maintaining a consistent standard of craft. Produced editorial pieces, campaign visuals, illustration-driven content, and motion assets that translate each client's personality into cohesive visual storytelling. Known for creative expressiveness and the ability to turn abstract ideas into polished, audience-ready content.",
  },
  {
    role: "Lead Designer",
    company: "PFC (Profit for Contractors)",
    period: "May 2022 — Jul 2023",
    location: "Ontario, Canada (Remote)",
    description:
      "Designed and scaled the visual marketing system for a Virtual Assistant Program serving multiple contractors. Built 1,000+ Canva templates and 75+ brand kits, used by 20+ virtual assistants to create client-facing content, while owning quality control and continuous improvement of all assets. Also produced landing pages, newsletters, Facebook Ads, and video content for Reels and TikTok. Led internal design workshops to train the VA team on visual systems and brand consistency.",
  },
  {
    role: "Junior Graphic Designer",
    company: "Teamtown",
    period: "Jul 2021 — Mar 2022",
    location: "Vancouver (Remote)",
    description:
      "Executed high-volume design production for multiple clients within a design-on-demand agency. Created advertising materials, social media content, flyers, motion graphics, and YouTube video edits across multiple industries, building strong adaptability and fast turnaround skills.",
  },
  {
    role: "Graphic Designer",
    company: "Influence 21 Group",
    period: "Sept 2020 — Jun 2021",
    location: "Venezuela (Hybrid)",
    description:
      "Produced digital assets for diverse clients simultaneously, including social media content, web banners, newsletters, and paid ads. Developed motion graphics and video editing in support of digital marketing campaigns, with a focus on visual consistency and audience engagement.",
  },
];

export default function WorkExperience() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div>
      {experiences.map((exp, i) => (
        <div key={i} className="border-t border-line">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-start justify-between py-5 text-left gap-4 cursor-pointer"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between gap-4">
                <p className="font-sans font-semibold text-xl text-ink leading-snug">{exp.role}</p>
                <p className="font-sans text-xs text-muted shrink-0">{exp.location}</p>
              </div>
              <p className="font-sans text-xs text-muted mt-1 tracking-wide">
                {exp.company} · {exp.period}
              </p>
            </div>
            <span
              className={`font-serif text-2xl text-muted leading-none mt-0.5 shrink-0 transition-transform duration-300 ${
                open === i ? "rotate-45" : ""
              }`}
            >
              +
            </span>
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              open === i ? "max-h-48 pb-6" : "max-h-0"
            }`}
          >
            <p className="font-sans text-sm text-muted leading-relaxed">{exp.description}</p>
          </div>
        </div>
      ))}
      <div className="border-t border-line" />
    </div>
  );
}
