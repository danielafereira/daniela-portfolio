const tools = [
  { name: "Figma",            file: "figma.svg" },
  { name: "Illustrator",      file: "illustrator.svg" },
  { name: "Photoshop",        file: "photoshop.svg" },
  { name: "After Effects",    file: "after-effects.svg" },
  { name: "Premiere Pro",     file: "premiere-pro.svg" },
  { name: "Midjourney",       file: "midjourney.svg" },
  { name: "Gemini",           file: "gemini.svg" },
  { name: "Claude",           file: "claude.svg" },
  { name: "Google Workspace", file: "google-workspace.svg" },
];

export default function ToolsSection() {
  return (
    <div className="mt-14">
      <h2 className="font-sans font-extrabold text-5xl md:text-6xl mb-8 leading-tight text-ink">
        Tools I Master
      </h2>
      <div className="flex flex-wrap gap-1">
        {tools.map((tool) => (
          <div
            key={tool.file}
            className="group flex items-center gap-[9px] border border-muted rounded-[13px] px-2 py-1.5 transition-colors duration-200 hover:bg-[#FFFBAF] hover:border-[#FFFBAF]"
          >
            <div className="w-[30px] h-[30px] shrink-0 flex items-center justify-center">
              <img
                src={`/images/tools/${tool.file}`}
                alt={tool.name}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-sans text-base text-muted group-hover:text-ink whitespace-nowrap transition-colors duration-200">
              {tool.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
