import { useRef } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  accent: 'blue' | 'teal';
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'fssai',
    number: '01',
    title: 'FSSAI Licensing',
    description:
      'Assistance with new licenses, renewals, modifications, state licenses, and central licenses.',
    accent: 'blue',
  },
  {
    id: 'bis',
    number: '02',
    title: 'BIS Certification',
    description:
      'Support for BIS certification, compliance requirements, documentation, and approval processes.',
    accent: 'teal',
  },
  {
    id: 'drinking-water',
    number: '03',
    title: 'Packaged Drinking Water Plants',
    description:
      'Consultancy for packaged drinking water units including approvals, documentation, inspections, and setup guidance.',
    accent: 'blue',
  },
  {
    id: 'industrial-ro',
    number: '04',
    title: 'Industrial RO Solutions',
    description:
      'Consultancy and compliance support for industrial and commercial RO water treatment systems.',
    accent: 'teal',
  },
];

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px',
  });


  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-28 sm:py-36 max-w-7xl mx-auto px-6 md:px-8 border-t border-white/5 z-10 overflow-hidden"
    >
      {/* Subtle background ambient line to frame the content */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-32 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

      {/* SECTION HEADER AREA */}
      <div className="flex flex-col items-start text-left max-w-3xl mb-16 sm:mb-24">
        {/* Small uppercase section label */}
        <span
          className={`text-[10px] tracking-[0.3em] text-[#16D9C5] font-mono font-medium uppercase mb-4 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isVisible ? 'opacity-80 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          OUR SERVICES
        </span>

        {/* Headline */}
        <h3
          className={`font-display text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase leading-[1.2] transition-all duration-[1200ms] delay-100 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Compliance Solutions
          <br />
          Built For Growing Businesses.
        </h3>

        {/* Supporting text */}
        <p
          className={`text-white/50 tracking-wider text-xs sm:text-sm uppercase leading-relaxed mt-5 transition-all duration-[1200ms] delay-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          End-to-end consultancy services helping businesses navigate certifications, licensing,
          approvals, and regulatory requirements with confidence.
        </p>
      </div>

      {/* 2x2 SERVICES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        {SERVICES_DATA.map((service, index) => {
          // Stagger delays based on service index (100ms steps)
          const delayClass =
            index === 0
              ? 'delay-300'
              : index === 1
                ? 'delay-[450ms]'
                : index === 2
                  ? 'delay-[600ms]'
                  : 'delay-[750ms]';

          const hoverBorderColor =
            service.accent === 'blue' ? 'hover:border-[#0E6EFF]/30' : 'hover:border-[#16D9C5]/30';

          const numberHoverColor =
            service.accent === 'blue'
              ? 'group-hover:text-[#0E6EFF]/50'
              : 'group-hover:text-[#16D9C5]/50';

          return (
            <div
              key={service.id}
              className={`group flex flex-col justify-between min-h-[260px] sm:min-h-[300px] p-8 sm:p-10 rounded-2xl border border-white/5 bg-white/[0.005] relative overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${hoverBorderColor} hover:-translate-y-1 ${
                isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-6 blur-sm'
              } ${delayClass}`}
            >
              {/* Subtle metallic bottom shine trace inside the card */}
              <div
                className={`absolute bottom-0 left-0 right-0 h-[1px] w-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-opacity duration-700 opacity-50 group-hover:opacity-100`}
              />

              {/* Numbering system (top-right, low opacity) */}
              <div
                className={`text-[11px] tracking-widest text-white/15 font-mono select-none transition-colors duration-500 ${numberHoverColor}`}
              >
                {service.number}
              </div>

              {/* Service Details */}
              <div className="mt-6">
                <h4 className="font-display text-lg sm:text-xl font-bold tracking-tight text-white uppercase">
                  {service.title}
                </h4>
                <p className="text-white/45 text-xs sm:text-sm leading-relaxed mt-3 max-w-md font-sans">
                  {service.description}
                </p>
              </div>

              {/* Action CTA link (refined and restrained Apple style) */}
              <a
                href={`#contact`}
                className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.2em] text-[#16D9C5] font-semibold uppercase mt-8 hover:text-white transition-colors duration-300 self-start"
              >
                Learn More{' '}
                <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                  →
                </span>
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
}
