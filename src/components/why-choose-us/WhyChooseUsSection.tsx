import { useRef } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

interface BentoBlock {
  id: string;
  stat: string;
  title: string;
  description: string;
  colSpan: string; // Tailwind col-span class
  accent: 'blue' | 'teal';
}

const BENTO_BLOCKS: BentoBlock[] = [
  {
    id: 'projects',
    stat: '500+',
    title: 'Projects Assisted',
    description:
      'Successfully supported businesses across certification, licensing, and compliance requirements.',
    colSpan: 'md:col-span-3',
    accent: 'blue',
  },
  {
    id: 'experience',
    stat: '15+',
    title: 'Years Of Experience',
    description: 'Extensive industry knowledge and regulatory expertise.',
    colSpan: 'md:col-span-3',
    accent: 'teal',
  },
  {
    id: 'coverage',
    stat: 'PAN India',
    title: 'Consultancy Support',
    description: 'Remote and on-site guidance for businesses across India.',
    colSpan: 'md:col-span-2',
    accent: 'teal',
  },
  {
    id: 'documentation',
    stat: 'End-To-End',
    title: 'Documentation Support',
    description: 'Complete assistance from preparation to approval.',
    colSpan: 'md:col-span-2',
    accent: 'blue',
  },
  {
    id: 'inspection',
    stat: 'Inspection',
    title: 'Preparation & Guidance',
    description: 'Support for audits, inspections, and compliance reviews.',
    colSpan: 'md:col-span-2',
    accent: 'teal',
  },
  {
    id: 'assistance',
    stat: 'Dedicated',
    title: 'Client Assistance',
    description: 'Direct communication and personalized support throughout the entire process.',
    colSpan: 'md:col-span-6',
    accent: 'blue',
  },
];

export function WhyChooseUsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.12 });


  return (
    <section
      id="why-choose-us"
      ref={sectionRef}
      className="relative py-28 sm:py-36 max-w-7xl mx-auto px-6 md:px-8 border-t border-white/5 z-10 overflow-hidden bg-black"
    >
      {/* Subtle blueprint alignment grid background (almost invisible) */}
      <div className="absolute inset-0 pointer-events-none opacity-5 z-0">
        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-white/20" />
        <div className="absolute top-0 left-2/4 w-[1px] h-full bg-white/20" />
        <div className="absolute top-0 left-3/4 w-[1px] h-full bg-white/20" />
        <div className="absolute top-1/3 left-0 w-full h-[1px] bg-white/20" />
        <div className="absolute top-2/3 left-0 w-full h-[1px] bg-white/20" />
      </div>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-32 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

      {/* SECTION HEADER */}
      <div className="flex flex-col items-start text-left max-w-3xl mb-16 sm:mb-24 relative z-10">
        <span
          className={`text-[10px] tracking-[0.3em] text-[#16D9C5] font-mono font-medium uppercase mb-4 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isVisible ? 'opacity-80 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          WHY CHOOSE US
        </span>

        <h3
          className={`font-display text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase leading-[1.2] transition-all duration-[1200ms] delay-100 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Built On Experience.
          <br />
          Focused On Compliance.
        </h3>

        <p
          className={`text-white/50 tracking-wider text-xs sm:text-sm uppercase leading-relaxed mt-5 transition-all duration-[1200ms] delay-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Helping businesses navigate certifications, approvals, and regulatory requirements with
          confidence and clarity.
        </p>
      </div>

      {/* ASYMMETRICAL BENTO GRID */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6 sm:gap-8 w-full relative z-10">
        {BENTO_BLOCKS.map((block, index) => {
          // Stagger reveal delays
          const delayClass =
            index === 0
              ? 'delay-[200ms]'
              : index === 1
                ? 'delay-[350ms]'
                : index === 2
                  ? 'delay-[500ms]'
                  : index === 3
                    ? 'delay-[650ms]'
                    : index === 4
                      ? 'delay-[800ms]'
                      : 'delay-[950ms]';

          const hoverBorderClass =
            block.accent === 'blue' ? 'hover:border-[#0E6EFF]/30' : 'hover:border-[#16D9C5]/30';

          return (
            <div
              key={block.id}
              className={`group flex flex-col justify-between p-8 sm:p-10 rounded-2xl border border-white/5 bg-white/[0.005] relative overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${hoverBorderClass} hover:-translate-y-1 ${block.colSpan} ${
                isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-6 blur-sm'
              } ${delayClass}`}
            >
              {/* Subtle blueprint crosshair corner accent */}
              <span className="absolute top-4 right-4 text-white/10 font-mono text-[9px] select-none pointer-events-none transition-colors duration-500 group-hover:text-white/25">
                +
              </span>

              {/* Decorative blueprint circle line inside PAN India card */}
              {block.id === 'coverage' && (
                <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full border border-white/[0.02] pointer-events-none group-hover:border-white/[0.06] transition-colors duration-700">
                  <div className="absolute inset-2 rounded-full border border-dashed border-white/[0.01] group-hover:border-white/[0.04] transition-colors duration-700" />
                </div>
              )}

              {/* Stat Typography */}
              <div>
                <div className="text-4xl sm:text-5xl font-bold tracking-tight text-white font-display uppercase mb-1 bg-gradient-to-r from-white via-white to-white/70 bg-clip-text">
                  {block.stat}
                </div>
                <div
                  className={`text-[10px] tracking-[0.25em] uppercase font-mono font-medium transition-colors duration-500 ${
                    block.accent === 'blue'
                      ? 'text-[#0E6EFF]/80 group-hover:text-[#0E6EFF]'
                      : 'text-[#16D9C5]/80 group-hover:text-[#16D9C5]'
                  }`}
                >
                  {block.title}
                </div>
              </div>

              {/* Description paragraph */}
              <p className="text-white/45 text-xs sm:text-sm leading-relaxed mt-6 max-w-md transition-colors duration-500 group-hover:text-white/75 font-sans">
                {block.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
