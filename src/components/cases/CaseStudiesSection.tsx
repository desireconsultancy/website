import { useRef } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

interface CaseStudy {
  id: string;
  title: string;
  badge: string;
  challenge: string;
  solution: string;
  outcome: string;
  accent: 'blue' | 'teal';
  svgType: 'water' | 'food' | 'ro';
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'case-water',
    title: 'Packaged Drinking Water Plant',
    badge: '✓ Certified',
    challenge: 'Required BIS approval and inspection readiness.',
    solution: 'Complete documentation support, compliance guidance, and inspection preparation.',
    outcome: 'Successfully achieved certification approval.',
    accent: 'blue',
    svgType: 'water',
  },
  {
    id: 'case-food',
    title: 'Food Manufacturing Business',
    badge: '✓ Approved',
    challenge: 'Needed FSSAI licensing and regulatory compliance support.',
    solution: 'Application preparation, documentation management, and filing assistance.',
    outcome: 'License successfully obtained.',
    accent: 'teal',
    svgType: 'food',
  },
  {
    id: 'case-ro',
    title: 'Commercial RO Project',
    badge: '✓ Completed',
    challenge: 'Required technical and compliance guidance for implementation.',
    solution: 'Consultancy support throughout planning and execution.',
    outcome: 'Project completed successfully.',
    accent: 'blue',
    svgType: 'ro',
  },
];

// Custom blueprint SVG rendering based on case study type (hoisted to module scope to avoid re-creation)
const renderBlueprintSVG = (type: 'water' | 'food' | 'ro', accent: 'blue' | 'teal') => {
  const strokeColor = accent === 'blue' ? '#0E6EFF' : '#16D9C5';

  if (type === 'water') {
    return (
      <svg
        className="absolute bottom-4 right-4 w-44 h-44 opacity-[0.06] group-hover:opacity-15 transition-all duration-700 pointer-events-none select-none"
        viewBox="0 0 100 100"
        fill="none"
        stroke={strokeColor}
        strokeWidth="0.5"
      >
        {/* Blueprint grid lines */}
        <line x1="10" y1="10" x2="90" y2="10" strokeDasharray="1 3" />
        <line x1="10" y1="50" x2="90" y2="50" strokeDasharray="1 3" />
        <line x1="10" y1="90" x2="90" y2="90" strokeDasharray="1 3" />
        <line x1="50" y1="10" x2="50" y2="90" strokeDasharray="1 3" />

        {/* Schematic flow nodes */}
        <circle cx="50" cy="50" r="12" />
        <circle cx="50" cy="50" r="25" strokeDasharray="2 2" />
        <circle cx="20" cy="30" r="6" />
        <circle cx="80" cy="70" r="6" />

        {/* Flow connect lines */}
        <path d="M26 33 L40 43" />
        <path d="M60 57 L74 67" />
        <path d="M50 20 L50 38" />
        <path d="M50 62 L50 80" />
      </svg>
    );
  }

  if (type === 'food') {
    return (
      <svg
        className="absolute bottom-4 right-4 w-44 h-44 opacity-[0.06] group-hover:opacity-15 transition-all duration-700 pointer-events-none select-none"
        viewBox="0 0 100 100"
        fill="none"
        stroke={strokeColor}
        strokeWidth="0.5"
      >
        {/* Blueprint stamp concentric circles */}
        <circle cx="50" cy="50" r="30" />
        <circle cx="50" cy="50" r="38" strokeDasharray="1 2" />
        <circle cx="50" cy="50" r="16" />

        {/* Angular compliance markers */}
        <line x1="50" y1="5" x2="50" y2="95" strokeDasharray="2 3" />
        <line x1="5" y1="50" x2="95" y2="50" strokeDasharray="2 3" />

        {/* Technical check boxes */}
        <rect x="25" y="25" width="50" height="50" strokeDasharray="1 4" />
        <path d="M42 50 L48 56 L58 44" strokeWidth="1" />
      </svg>
    );
  }

  // RO filter system
  return (
    <svg
      className="absolute bottom-4 right-4 w-44 h-44 opacity-[0.06] group-hover:opacity-15 transition-all duration-700 pointer-events-none select-none"
      viewBox="0 0 100 100"
      fill="none"
      stroke={strokeColor}
      strokeWidth="0.5"
    >
      {/* Membrane cylinders */}
      <rect x="15" y="30" width="70" height="12" rx="2" />
      <rect x="15" y="58" width="70" height="12" rx="2" />

      {/* Connector plumbing lines */}
      <path d="M10 36 L15 36" />
      <path d="M85 36 L90 36 L90 64 L85 64" />
      <path d="M10 64 L15 64" />

      {/* Pressure gauge round schematics */}
      <circle cx="50" cy="20" r="8" />
      <line x1="50" y1="20" x2="54" y2="16" strokeWidth="1" />
      <line x1="50" y1="28" x2="50" y2="30" />

      {/* Technical grid tick lines */}
      <line x1="30" y1="30" x2="30" y2="42" />
      <line x1="45" y1="30" x2="45" y2="42" />
      <line x1="60" y1="30" x2="60" y2="42" />
      <line x1="30" y1="58" x2="30" y2="70" />
      <line x1="45" y1="58" x2="45" y2="70" />
      <line x1="60" y1="58" x2="60" y2="70" />
    </svg>
  );
};

export function CaseStudiesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(sectionRef);


  return (
    <section
      id="cases"
      ref={sectionRef}
      className="relative py-28 sm:py-36 max-w-7xl mx-auto px-6 md:px-8 border-t border-white/5 z-10 overflow-hidden bg-black"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-32 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

      {/* SECTION HEADER */}
      <div className="flex flex-col items-start text-left max-w-3xl mb-16 sm:mb-24">
        <span
          className={`text-[10px] tracking-[0.3em] text-[#16D9C5] font-mono font-medium uppercase mb-4 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isVisible ? 'opacity-80 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          SUCCESS STORIES
        </span>

        <h3
          className={`font-display text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase leading-[1.2] transition-all duration-[1200ms] delay-100 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Real Businesses.
          <br />
          Real Compliance Success.
        </h3>

        <p
          className={`text-white/50 tracking-wider text-xs sm:text-sm uppercase leading-relaxed mt-5 transition-all duration-[1200ms] delay-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          A glimpse into how businesses have successfully navigated certification and compliance
          requirements with expert guidance.
        </p>
      </div>

      {/* HORIZONTAL / VERTICAL SCROLL CARDS CONTAINER */}
      {/* Desktop/Tablet: Horizontal scroll with snap-mandatory. Mobile: Vertical stack */}
      <div
        ref={scrollContainerRef}
        className="flex flex-col md:flex-row gap-8 w-full md:overflow-x-auto pb-6 md:pb-12 scrollbar-none snap-x snap-mandatory cursor-grab active:cursor-grabbing"
      >
        {CASE_STUDIES.map((study, index) => {
          const delayClass =
            index === 0 ? 'delay-300' : index === 1 ? 'delay-[450ms]' : 'delay-[600ms]';

          const hoverBorderClass =
            study.accent === 'blue' ? 'hover:border-[#0E6EFF]/30' : 'hover:border-[#16D9C5]/30';

          const badgeStyle =
            study.accent === 'blue'
              ? 'bg-[#0E6EFF]/10 text-[#0E6EFF] border-[#0E6EFF]/20'
              : 'bg-[#16D9C5]/10 text-[#16D9C5] border-[#16D9C5]/20';

          return (
            <div
              key={study.id}
              className={`group w-full md:w-[480px] lg:w-[540px] shrink-0 p-8 sm:p-12 border border-white/5 bg-white/[0.005] rounded-2xl snap-center flex flex-col justify-between min-h-[420px] sm:min-h-[460px] relative overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${hoverBorderClass} ${
                isVisible
                  ? 'opacity-100 translate-y-0 scale-100 blur-0'
                  : 'opacity-0 translate-y-6 scale-95 blur-sm'
              } ${delayClass}`}
            >
              {/* Outer Glow Line decoration */}
              <div className="absolute top-0 left-0 right-0 h-[1px] w-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-opacity duration-700 opacity-50 group-hover:opacity-100" />

              {/* Title & Badge */}
              <div className="flex justify-between items-start mb-10 relative z-10">
                <h4 className="font-display text-lg sm:text-xl font-bold uppercase tracking-tight text-white pr-20">
                  {study.title}
                </h4>

                {/* Understated Outcome Badge */}
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[8px] font-mono tracking-widest font-semibold uppercase border select-none ${badgeStyle}`}
                >
                  {study.badge}
                </span>
              </div>

              {/* Core Case Study Content Grid */}
              <div className="flex flex-col gap-6 relative z-10 max-w-md">
                {/* Challenge */}
                <div>
                  <span className="text-[8px] tracking-[0.2em] text-[#16D9C5] font-mono uppercase opacity-75 block mb-1">
                    CHALLENGE
                  </span>
                  <p className="text-white/80 text-xs sm:text-[13px] tracking-wide leading-relaxed font-sans">
                    {study.challenge}
                  </p>
                </div>

                {/* Solution */}
                <div>
                  <span className="text-[8px] tracking-[0.2em] text-[#0E6EFF] font-mono uppercase opacity-75 block mb-1">
                    SOLUTION
                  </span>
                  <p className="text-white/80 text-xs sm:text-[13px] tracking-wide leading-relaxed font-sans">
                    {study.solution}
                  </p>
                </div>

                {/* Outcome */}
                <div>
                  <span className="text-[8px] tracking-[0.2em] text-white/50 font-mono uppercase opacity-75 block mb-1">
                    OUTCOME
                  </span>
                  <p className="text-white font-semibold text-xs sm:text-[13px] tracking-wide leading-relaxed font-sans">
                    {study.outcome}
                  </p>
                </div>
              </div>

              {/* Render structural schematic blueprint SVG background */}
              {renderBlueprintSVG(study.svgType, study.accent)}

              {/* Blueprint scale lines background decoration */}
              <div className="absolute left-0 bottom-0 top-0 w-[1px] bg-white/[0.02]" />
              <div className="absolute right-0 bottom-0 top-0 w-[1px] bg-white/[0.02]" />
            </div>
          );
        })}
      </div>
    </section>
  );
}
