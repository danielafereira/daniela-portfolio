export type ResultsTable = {
  headers: string[];
  rows: string[][];
};

export type CaseStudy = {
  slug: string;
  num: string;
  title: string;
  subtitle: string;
  client: string;
  role: string;
  period: string;
  tags: string[];
  cover?: string;
  images?: string[];
  imageTitles?: string[];
  closingImage?: string;
  overview: string;
  challenge: string;
  approach: string;
  results: string;
  table?: ResultsTable;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "seasonal-campaign-design",
    num: "01",
    title: "Seasonal Campaign Design for Ecommerce",
    subtitle: "Miravia · Lead Designer · 2025–2026",
    client: "Miravia",
    role: "Lead Designer",
    period: "2025–2026",
    tags: ["Campaign Design", "E-commerce"],
    cover: "Seasonal_Campaigns_01.jpg",
    images: ["Seasonal_Campaigns_01.jpg", "Seasonal_Campaigns_02.png", "Seasonal_Campaigns_03.png", "Seasonal_Campaigns_04.png"],
    overview:
      "Miravia is a Spanish e-commerce platform operating in a highly competitive market, where peak seasonal moments represent the most critical windows for traffic and conversion. I led the visual design across three very important campaigns — Christmas, Gifting, and Valentine's Day — translating commercial objectives into cohesive, high-performing visual experiences.",
    challenge:
      "Each campaign needed to strike a delicate balance: festive enough to feel seasonal and emotionally relevant, commercial enough to drive measurable action. At the same time, the design had to scale consistently across multiple touchpoints — landing pages, CRM assets, and homepage entry points — without losing coherence or impact. The added pressure of back-to-back campaign deadlines meant there was little room for error. Every creative decision had to serve both the brand and the business.",
    approach:
      "I started by benchmarking each seasonal moment and reviewing learnings from previous peak campaigns to identify what had worked and where there were gaps. From there, I defined the visual direction for each campaign — owning the creative concept while collaborating closely with business and cross-functional teams to ensure the execution aligned with commercial priorities. I built a consistent visual logic across all three — varying the aesthetic for each moment while maintaining a recognizable design language. Assets were adapted across formats, from full-width landing pages to CRM banners and app entry points, with each touchpoint designed to support discovery and drive users deeper into the funnel.",
    results:
      "All three campaigns exceeded their click targets. The strongest design impact was consistently at the top of the funnel, where visual consistency across CRM, Homepage, and the main campaign page improved discoverability and user exploration.",
    table: {
      headers: ["Campaign", "Banner CTR", "Campaign Page CTR", "Highlight"],
      rows: [
        ["Christmas", "5.09%", "—", "CRM traffic +52% on launch day · Click UV 7.3K"],
        ["Gifting", "4.5%", "35.95%", "Click UV 3.8K — above target"],
        ["Valentine's Day", "3.7%", "33%", "Above target"],
      ],
    },
  },
  {
    slug: "ai-pinterest-channel",
    num: "02",
    title: "AI Powered Pinterest Channel",
    subtitle: "Miravia · Lead Designer · 2025–2026",
    client: "Miravia",
    role: "Lead Designer",
    period: "2025–2026",
    tags: ["Digital Strategy", "Content Design"],
    cover: "AI_Pinterest_01.jpg",
    images: ["AI_Pinterest_01.jpg", "AI_Pinterest_02.jpg", "AI_Pinterest_03.jpg"],
    imageTitles: ["Engaged vs total audience", "Pin clicks vs saves"],
    closingImage: "AI_Pinterest_04.jpg",
    overview:
      "Organic discovery was an underexplored growth lever for Miravia. I built the brand's Pinterest presence from zero — designing an AI-assisted content workflow that combined trend research, localized visual content, and a scalable publishing system. In six months, the channel grew from 19K to 106K monthly views.",
    challenge:
      "Pinterest requires a very different creative approach than performance marketing — it rewards inspiration over promotion, and consistency over volume. The challenge was building a channel that felt genuinely native to the platform while still serving Miravia's commercial objectives, and doing so at a pace that one designer could realistically sustain.",
    approach:
      "I designed the workflow before designing the content. Using spreadsheets for planning and UTM tracking for attribution, I mapped the content calendar to Miravia's campaign schedule and seasonal moments, ensuring the channel always felt current and culturally relevant to the Spanish market. For visual production, I developed a system using Midjourney moodboards to establish image style consistency across pins — then used AI-assisted product placement to create visuals where different products appeared to exist in the same environment. This gave the feed a cohesive, editorial quality that would have been impossible to achieve manually at scale. Copy was standardized with AI support, with tone adapted between commercial and inspirational depending on the content's objective. The result was a daily publishing rhythm that felt considered, not automated.",
    results:
      "Over six months, the channel grew consistently across every metric — not just in reach, but in genuine engagement. Beyond the numbers, the project demonstrated how an AI-assisted design workflow can support content scale and strategic relevance without sacrificing visual quality — and established Pinterest as a fully operational self-served discovery channel for the brand.",
    table: {
      headers: ["Metric", "Result"],
      rows: [
        ["Monthly views", "19K → 106.3K"],
        ["Impressions", "236.84K (+381%)"],
        ["Engagements", "8.06K (+329%)"],
        ["Saves", "743 (+317%)"],
        ["Pin clicks", "7,186"],
        ["Outbound clicks", "226"],
      ],
    },
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
