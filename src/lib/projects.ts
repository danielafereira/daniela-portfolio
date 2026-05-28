export type MediaItem = {
  src?: string;
  youtube?: string;
  title?: string;
  paragraphs?: string[];
  paragraphsAfter?: string[];
  zoom?: number;
  scrollPlay?: boolean;
  customCursor?: string;
};

export type Project = {
  slug: string;
  title: string;
  areas: string[];
  bg: string;
  year: string;
  client: string;
  area: string;
  description: string;
  cover: string;
  images: (string | MediaItem)[];
};

export const projects: Project[] = [
  {
    slug: "miravia-metro-sol",
    title: "Miravia × Metro Sol",
    areas: ["Campaign Design", "Large Format", "OOH Advertising"],
    bg: "#E8E4DF",
    year: "2025",
    client: "Miravia",
    area: "E-commerce",
    description: "Miravia — Spain's leading e-commerce platform — brought its Black Friday campaign into one of Europe's most transited underground stations. Sol is the busiest station in the entire Madrid Metro network, a system that moves 2.4 million passengers daily — making this activation a high-visibility, high-stakes design challenge.\n\nThe work involved designing assets across multiple station placements and formats, developing campaign-specific graphic elements to give the activation a distinctive visual identity, and adapting layouts for large-format print with attention to color accuracy and production specs. A real constraint shaped every design decision: the tunnel's irregular geometry left no room for perfect measurements, requiring multiple iterations to balance campaign content with the station's mandatory wayfinding signage — including coordination with the high-contrast accessibility patterns on the floor, designed for people with low or partial vision. The result was a campaign that felt cohesive and bold at scale, without compromising the needs of the space or its users.",
    cover: "cover.jpg",
    images: ["01.jpg", "02.jpg", "03.jpg", { src: "04.jpg", customCursor: "/images/projects/cursor_yup, this is me _).png" }, "05.jpg", "06.jpg"],
  },
  {
    slug: "helpidy",
    title: "Helpidy",
    areas: ["Naming", "Concept Development", "Brand Design", "Character Design", "App Design", "Motion Graphics"],
    bg: "#DDD6CD",
    year: "2020",
    client: "Helpidy",
    area: "Multi-service",
    description: "Helpidy is a multi-service platform based in Chile, offering home services — which meant it faced a very particular trust barrier: convincing people to welcome a stranger into their home. The brand response to this was warmth by design. The name was crafted to communicate joy and support. The color palette signals openness and modernity. The graphic system was built to be immediately readable and flexible across every platform.\n\nThe accompanying character and motion work extended the brand's personality into animation, giving Helpidy a presence that felt approachable, human, and consistent in movement as well as in print.",
    cover: "cover.jpg",
    images: ["01.jpg", "02.jpg", "ANIMACION-LESS GRAIN.mp4", "04.jpg", { src: "helpidy_5.mp4", zoom: 1.01 }, "06.jpg"],
  },
  {
    slug: "verdeen",
    title: "Verdeen",
    areas: ["Brand Design", "Concept Development", "Character Design", "Illustration"],
    bg: "#D4C9BC",
    year: "2024",
    client: "Verdeen",
    area: "Café & Bar",
    description: "Verdeen is a modern café and bar in Brazil, with one specific creative condition: it was already open. The interior design existed, the space had a personality — the new brand had to grow around it, not replace it. This shaped every decision, from the organic forms to the nature-inspired color palette chosen to coexist with the existing environment rather than compete with it.\n\nThe brand's character — inspired by a bread crumb one of the owners found while washing dishes — was brought to life through illustration, developed with hand-drawing techniques that gave it warmth and personality. The logotype itself has manual intervention: individual letters were edited freehand to fit together more naturally, giving the wordmark an organic, slightly imperfect quality that feels intentional and alive.",
    cover: "cover.jpg",
    images: ["01.jpg", "02.jpg", "03.gif", "04.jpg", "05.jpg", "06.jpg", "07.jpg"],
  },
  {
    slug: "burnitdown",
    title: "Burn It Down",
    areas: ["Logo Design", "Social Media", "Photography Direction", "Video Direction", "Web Assets"],
    bg: "#D9D2CA",
    year: "2022",
    client: "Burn It Down",
    area: "Fitness",
    description: "Burn It Down is the personal brand of a fitness trainer based in Madrid, with a global client base. The brief was clear: stand apart from a fitness industry that defaults to gray, rigid, and self-serious. The brand needed to feel alive — colorful, welcoming, and energizing without losing credibility.\n\nI designed the logo and social media assets, directed photoshoots and video content for social media, and created assets for his website. The result is a brand that brings genuine personality to a saturated market — one that makes you want to move.",
    cover: "cover.jpg",
    images: ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg"],
  },
  {
    slug: "davara",
    title: "Davara",
    areas: ["Personal Branding", "Logo Design", "Illustration", "Brand Identity"],
    bg: "#DDD7D0",
    year: "2023",
    client: "Davara",
    area: "Makeup Artist",
    description: "Davara is a makeup artist personal brand — my own. Designing for yourself is its own kind of challenge: extracting the visual symbols that actually represent you, rather than what you think you should look like.\n\nThe name came first — created in adolescence, rooted in an ancient word, grown into a nickname. The visual identity followed its curves: the waves of my hair became the curves of the logo, the ornamental D was hand-drawn, and the illustrated hand in the brand is left-handed — like me — with a hidden D inside. The color palette is deliberately neutral: a washed white and a broken black, because the makeup itself was always the color. Different skin tones, different looks — the brand needed to hold space for all of it without competing. The absence of color was the palette.",
    cover: "Davara_cover.jpg",
    images: ["Davara_1.jpg", { src: "Davara_2.mp4", zoom: 1.01 }, "Davara_3.jpg", "Davara_4.jpg", "Davara_5.jpg", "Davara_6.jpg", "Davara_7.jpg", "Davara_8.jpg"],
  },
  {
    slug: "mozaic",
    title: "Mozaic",
    areas: ["Motion Graphics", "Video Editing", "Creative Direction", "Social Media", "Web Animation"],
    bg: "#E0DAD3",
    year: "2024–2025",
    client: "Mozaic",
    area: "Payment Platform",
    description: "Mozaic is a payment platform for creators, based in Nashville. When the brand relaunched under a new name and identity, the challenge wasn't just building something new — it was honoring what the brand already was, and translating its existing legacy and community into a new visual language in motion.\n\nMy role was to create the brand's entire audiovisual universe: defining motion guidelines across channels, concepting social media and web content, building storyboards, animating graphic assets, and editing video and image content. This included directing real creators and collaborators remotely — a constraint that sharpened my ability to lead through precise briefings and creative documentation. I also animated web assets, produced interview-format content, and contributed to merchandise and brand asset design. The result was a cohesive motion identity that felt alive across every touchpoint.",
    cover: "Mozaic_cover.jpg.jpg",
    images: [
      "Mozaic_1.jpg",
      { src: "mozaic_2.mp4", scrollPlay: true },
      "mozaic_3b.mp4",
      {
        src: "mozaic_4.mp4",
        title: "Snapshot Interviews",
        paragraphs: [
          "A video series where creators around the world express their thoughts regarding success, failure and colaboration in a one-question format.",
          "My work on this video series included: creative direction, defining the recording and format guidelines (video guidelines), crafted and structured the interview questions, video editing, as well as designing and animating both the intro and outro.",
        ],
      },
      "mozaic_5.jpg",
      { youtube: "wQTY-hZuCAw" },
      "mozaic_7.jpg",
      { src: "mozaic_8.mp4", zoom: 1.002, scrollPlay: true },
      "mozaic_9.jpg",
      { src: "mozaic_10.mp4", zoom: 1.002, scrollPlay: true },
      { src: "mozaic_11.mp4", scrollPlay: true },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
