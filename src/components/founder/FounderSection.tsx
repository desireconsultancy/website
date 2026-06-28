import { useRef } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const EXPERTISE_TAGS = [
  'FSSAI Licensing',
  'BIS Certification',
  'Packaged Drinking Water Compliance',
  'Industrial RO Consultancy',
  'Documentation & Inspection Support',
];

export function FounderSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef);


  return (
    <section
      id="founder"
      ref={sectionRef}
      className="relative py-28 sm:py-36 max-w-7xl mx-auto px-6 md:px-8 border-t border-white/5 z-10 overflow-hidden bg-black"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-32 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

      {/* SECTION HEADER */}
      <div className="flex flex-col items-start text-left max-w-3xl mb-16 sm:mb-24 relative z-10">
        <span
          className={`text-[10px] tracking-[0.3em] text-[#16D9C5] font-mono font-medium uppercase mb-4 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isVisible ? 'opacity-80 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          MEET THE FOUNDER
        </span>

        <h3
          className={`font-display text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase leading-[1.2] transition-all duration-[1200ms] delay-100 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Experience That
          <br />
          Guides Every Approval.
        </h3>

        <p
          className={`text-white/50 tracking-wider text-xs sm:text-sm uppercase leading-relaxed mt-5 transition-all duration-[1200ms] delay-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Years of hands-on experience helping businesses navigate certifications, licensing
          requirements, inspections, and compliance processes.
        </p>
      </div>

      {/* SPLIT LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative z-10">
        {/* LEFT COLUMN: PORTRAIT FRAME */}
        <div
          className={`lg:col-span-5 flex justify-center w-full transition-all duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
          }`}
        >
          <div className="relative p-3 border border-white/5 rounded-3xl bg-white/[0.002] w-full max-w-sm sm:max-w-md lg:max-w-full">
            {/* Technical grid borders & reference label */}
            <div className="absolute inset-0 border border-white/5 rounded-3xl pointer-events-none" />
            <div className="absolute top-4 left-4 text-white/10 font-mono text-[9px] select-none pointer-events-none">
              +
            </div>
            <div className="absolute top-4 right-4 text-white/10 font-mono text-[9px] select-none pointer-events-none">
              +
            </div>

            {/* Image frame */}
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-zinc-900 border border-white/10">
              <img
                src="/founder.png"
                alt="Shiv lal"
                className="w-full h-full object-cover filter grayscale contrast-[1.08] hover:grayscale-0 transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                loading="lazy"
              />
              {/* Subtle visual gradient edge overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Reference document code label */}
            <span className="text-[9px] text-white/20 font-mono absolute -bottom-3 left-6 bg-black px-2 select-none uppercase tracking-wider">
              [ PORTRAIT REF: SL-2026 ]
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: BIOGRAPHY & DETAILS */}
        <div
          className={`lg:col-span-7 flex flex-col justify-center transition-all duration-[1400ms] delay-[300ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Founder Identity */}
          <div className="mb-8">
            <h4 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white">
              Shiv lal
            </h4>
            <span className="text-xs tracking-[0.2em] text-[#16D9C5] font-mono uppercase font-semibold block mt-1">
              Founder & Compliance Consultant
            </span>
          </div>

          {/* Story Telling Bio */}
          <div className="text-white/60 text-xs sm:text-sm leading-relaxed tracking-wide space-y-6 max-w-2xl font-sans">
            <p>
              With a deep understanding of corporate compliance and regulatory frameworks, Shiv
              lal founded Desire Consultancy to offer businesses a direct, transparent path to
              certifications. His ethos centers on eliminating operational bottlenecks, ensuring
              that business leaders can scale their operations unhindered by complex legal
              requirements.
            </p>
            <p>
              Over the years, he has guided enterprise clients and growing startups alike through
              complex FSSAI licensing, BIS certifications, and water solutions setup, building
              relationships grounded in trust, precision, and absolute compliance.
            </p>
            <p className="border-l border-[#0E6EFF]/30 pl-4 py-1.5 italic text-white/75 font-mono text-[11px] sm:text-xs">
              "Our mission is simple: to transform regulatory compliance from a complex bottleneck
              into a seamless foundation for business growth."
            </p>
          </div>

          {/* Core Expertise Tags */}
          <div className="mt-10">
            <span className="text-[9px] tracking-[0.25em] text-white/30 font-mono uppercase block mb-4">
              KEY EXPERTISE AREAS
            </span>
            <div className="flex flex-wrap gap-3 max-w-xl">
              {EXPERTISE_TAGS.map((tag, idx) => (
                <div
                  key={idx}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/5 bg-white/[0.005] hover:border-white/15 transition-colors duration-300 text-[10px] sm:text-[11px] tracking-wide text-white/75 font-mono"
                >
                  <span
                    className={`w-1 h-1 rounded-full ${idx % 2 === 0 ? 'bg-[#0E6EFF]' : 'bg-[#16D9C5]'}`}
                  />
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FOUNDER QUOTE CALLOUT */}
      <div
        className={`mt-24 sm:mt-32 max-w-4xl mx-auto text-center relative transition-all duration-[1600ms] delay-[500ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
        }`}
      >
        {/* Background Double Quotes */}
        <div className="absolute -top-12 left-4 sm:left-12 text-white/[0.015] font-display text-[150px] leading-none select-none pointer-events-none">
          “
        </div>

        <blockquote className="font-display text-base sm:text-2xl font-light tracking-wide text-white/90 leading-relaxed italic relative z-10 px-8">
          "Compliance shouldn't feel complicated. Our role is to simplify the process and help
          businesses move forward with confidence."
        </blockquote>

        {/* Signature Element */}
        <div className="mt-8 flex flex-col items-center select-none">
          <span className="font-mono text-[9px] tracking-[0.3em] text-[#16D9C5] uppercase">
            SHIV LAL
          </span>
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-[#0E6EFF] to-transparent mt-2" />
        </div>
      </div>
    </section>
  );
}
