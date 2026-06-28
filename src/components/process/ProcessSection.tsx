import { useEffect, useRef, useState } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

interface TimelineStep {
  id: string;
  number: string;
  title: string;
  description: string;
}

const TIMELINE_STEPS: TimelineStep[] = [
  {
    id: 'consultation',
    number: '01',
    title: 'Consultation',
    description:
      'Understand business requirements, certification needs, and compliance objectives.',
  },
  {
    id: 'documentation',
    number: '02',
    title: 'Documentation',
    description: 'Collect, organize, and prepare all required documents and supporting materials.',
  },
  {
    id: 'filing',
    number: '03',
    title: 'Application Filing',
    description:
      'Submit applications accurately while ensuring compliance with regulatory requirements.',
  },
  {
    id: 'inspection',
    number: '04',
    title: 'Inspection Support',
    description:
      'Prepare for inspections, audits, and verification processes with expert guidance.',
  },
  {
    id: 'approval',
    number: '05',
    title: 'Approval & Cert',
    description: 'Receive approvals and certifications with complete support until completion.',
  },
];

export function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(containerRef);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);


  // 2. Track scrolling to activate indicators sequentially
  useEffect(() => {
    const stepElements = [...stepRefs.current];

    const stepObservers = TIMELINE_STEPS.map((_, index) => {
      return new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            // Update active step (going forward or backward)
            setActiveStep((prev) => Math.max(prev, index));
          }
        },
        {
          rootMargin: '-20% 0px -40% 0px', // Center-screen triggers for comfortable activation
          threshold: 0.1,
        },
      );
    });

    stepElements.forEach((el, idx) => {
      if (el) stepObservers[idx].observe(el);
    });

    return () => {
      stepElements.forEach((el, idx) => {
        if (el) stepObservers[idx].unobserve(el);
      });
    };
  }, []);

  // Progress percentage (0 to 100 based on step indices 0 to 4)
  const progressPercent = (activeStep / (TIMELINE_STEPS.length - 1)) * 100;

  return (
    <section
      id="process"
      ref={containerRef}
      className="relative py-28 sm:py-36 max-w-7xl mx-auto px-6 md:px-8 border-t border-white/5 z-10 overflow-hidden"
    >
      {/* Subtle vertical marker */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-32 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

      {/* SECTION HEADER */}
      <div className="flex flex-col items-start text-left max-w-3xl mb-20 sm:mb-28">
        <span
          className={`text-[10px] tracking-[0.3em] text-[#16D9C5] font-mono font-medium uppercase mb-4 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isVisible ? 'opacity-80 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          HOW IT WORKS
        </span>

        <h3
          className={`font-display text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase leading-[1.2] transition-all duration-[1200ms] delay-100 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          A Clear Path To
          <br />
          Certification & Compliance.
        </h3>

        <p
          className={`text-white/50 tracking-wider text-xs sm:text-sm uppercase leading-relaxed mt-5 transition-all duration-[1200ms] delay-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          From consultation to approval, we guide businesses through every stage of the process with
          clarity and confidence.
        </p>
      </div>

      {/* TIMELINE CONTAINER */}
      <div className="relative mt-8 sm:mt-12 w-full">
        {/* DESKTOP/TABLET HORIZONTAL TIMELINE VIEW */}
        <div className="hidden md:block relative w-full pt-12 pb-8">
          {/* Base inactive connection line */}
          <div className="absolute top-[55px] left-4 right-4 h-[1px] bg-white/10 z-0" />

          {/* Active scroll progress connection line */}
          <div
            className="absolute top-[55px] left-4 h-[1px] bg-gradient-to-r from-[#0E6EFF] to-[#16D9C5] z-0 transition-all duration-[1000ms] ease-out"
            style={{ width: `calc(${progressPercent}% - 32px)` }}
          />

          {/* Steps Row */}
          <div className="grid grid-cols-5 gap-6 relative z-10">
            {TIMELINE_STEPS.map((step, index) => {
              const isPastOrActive = index <= activeStep;

              return (
                <div
                  key={step.id}
                  ref={(el) => {
                    stepRefs.current[index] = el;
                  }}
                  className="group flex flex-col items-start text-left cursor-default"
                >
                  {/* Step Code label */}
                  <span
                    className={`text-[10px] tracking-widest font-mono mb-4 transition-colors duration-500 ${
                      isPastOrActive ? 'text-[#16D9C5] font-semibold' : 'text-white/20'
                    }`}
                  >
                    {step.number}
                  </span>

                  {/* Circular Node Indicator */}
                  <div
                    className={`w-3 h-3 rounded-full border transition-all duration-700 bg-black flex items-center justify-center ${
                      isPastOrActive
                        ? 'border-[#0E6EFF] scale-110'
                        : 'border-white/25 group-hover:border-white/50'
                    }`}
                  >
                    {/* Inner active glow core */}
                    <div
                      className={`w-1.5 h-1.5 rounded-full transition-transform duration-500 ${
                        isPastOrActive
                          ? 'bg-gradient-to-tr from-[#0E6EFF] to-[#16D9C5] scale-100'
                          : 'bg-transparent scale-0'
                      }`}
                    />
                  </div>

                  {/* Header Title */}
                  <h4
                    className={`font-display text-sm font-bold uppercase tracking-wider mt-6 transition-colors duration-500 ${
                      isPastOrActive ? 'text-white' : 'text-white/50 group-hover:text-white'
                    }`}
                  >
                    {step.title}
                  </h4>

                  {/* Description Paragraph */}
                  <p
                    className={`text-[11px] tracking-wide leading-relaxed text-white/40 mt-3 max-w-[180px] transition-all duration-500 group-hover:text-white/75 ${
                      isPastOrActive ? 'text-white/60' : 'text-white/40'
                    }`}
                  >
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* MOBILE VERTICAL TIMELINE VIEW */}
        <div className="md:hidden relative pl-8 pb-4">
          {/* Base inactive connection line */}
          <div className="absolute top-2 bottom-2 left-2.5 w-[1px] bg-white/10 z-0" />

          {/* Active progress connection line */}
          <div
            className="absolute top-2 left-2.5 w-[1px] bg-gradient-to-b from-[#0E6EFF] to-[#16D9C5] z-0 transition-all duration-[1000ms] ease-out"
            style={{ height: `${progressPercent}%` }}
          />

          {/* Steps Column */}
          <div className="flex flex-col gap-12">
            {TIMELINE_STEPS.map((step, index) => {
              const isPastOrActive = index <= activeStep;

              return (
                <div
                  key={step.id}
                  ref={(el) => {
                    stepRefs.current[index] = el;
                  }}
                  className="group flex flex-col relative text-left"
                >
                  {/* Circular Node Indicator on left line */}
                  <div
                    className={`absolute -left-8 top-1.5 w-3 h-3 rounded-full border transition-all duration-700 bg-black flex items-center justify-center ${
                      isPastOrActive ? 'border-[#0E6EFF] scale-110' : 'border-white/25'
                    }`}
                  >
                    <div
                      className={`w-1.5 h-1.5 rounded-full transition-transform duration-500 ${
                        isPastOrActive
                          ? 'bg-gradient-to-tr from-[#0E6EFF] to-[#16D9C5] scale-100'
                          : 'bg-transparent scale-0'
                      }`}
                    />
                  </div>

                  {/* Step Code label */}
                  <span
                    className={`text-[9px] tracking-widest font-mono transition-colors duration-500 ${
                      isPastOrActive ? 'text-[#16D9C5] font-semibold' : 'text-white/20'
                    }`}
                  >
                    {step.number}
                  </span>

                  {/* Header Title */}
                  <h4 className="font-display text-sm font-bold uppercase tracking-wider mt-1 text-white">
                    {step.title}
                  </h4>

                  {/* Description Paragraph */}
                  <p className="text-[11px] tracking-wide leading-relaxed text-white/50 mt-2 max-w-sm">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
