import { useRef, useState } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-fssai',
    question: 'How long does the FSSAI licensing process take?',
    answer:
      'Timelines vary depending on the license type, documentation readiness, and approval requirements. We assist throughout the process to ensure smooth and timely completion.',
  },
  {
    id: 'faq-bis',
    question: 'Do you provide BIS certification support?',
    answer:
      'Yes. We provide guidance, documentation assistance, compliance support, and inspection preparation for BIS certification requirements.',
  },
  {
    id: 'faq-water',
    question: 'Can you assist packaged drinking water plants?',
    answer:
      'Yes. We help businesses understand regulatory requirements, prepare documentation, coordinate approvals, and navigate compliance procedures.',
  },
  {
    id: 'faq-india',
    question: 'Do you work with businesses across India?',
    answer:
      'Yes. We provide consultancy support to businesses across India through remote and direct consultation.',
  },
  {
    id: 'faq-inspection',
    question: 'Do you provide inspection preparation support?',
    answer:
      'Yes. We help businesses prepare for audits, inspections, and verification processes with complete guidance and documentation assistance.',
  },
  {
    id: 'faq-started',
    question: 'How do I get started?',
    answer:
      "Simply contact us through the inquiry form or phone. We'll understand your requirements and recommend the appropriate next steps.",
  },
];

export function FAQSection() {
  const [openId, setOpenId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef);


  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="relative py-28 sm:py-36 max-w-7xl mx-auto px-6 md:px-8 border-t border-white/5 z-10 overflow-hidden bg-black"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-32 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

      {/* SECTION HEADER */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 sm:mb-24">
        <span
          className={`text-[10px] tracking-[0.3em] text-[#16D9C5] font-mono font-medium uppercase mb-4 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isVisible ? 'opacity-80 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          FREQUENTLY ASKED QUESTIONS
        </span>

        <h3
          className={`font-display text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase leading-[1.2] transition-all duration-[1200ms] delay-100 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Everything You Need
          <br />
          To Know.
        </h3>

        <p
          className={`text-white/50 tracking-wider text-xs sm:text-sm uppercase leading-relaxed mt-5 transition-all duration-[1200ms] delay-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Answers to common questions about licensing, certification, approvals, compliance
          requirements, and consultancy support.
        </p>
      </div>

      {/* ACCORDION ACCENT */}
      <div
        className={`max-w-3xl mx-auto w-full transition-all duration-[1400ms] delay-[300ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="border-t border-white/10">
          {FAQ_DATA.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div key={faq.id} className="border-b border-white/10 py-3">
                <button
                  id={`faq-btn-${faq.id}`}
                  onClick={() => toggleFAQ(faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${faq.id}`}
                  className="w-full flex items-center justify-between text-left py-3 px-4 -mx-4 group rounded-xl hover:bg-white/[0.02] active:bg-white/[0.04] focus-visible:ring-1 focus-visible:ring-[#16D9C5]/40 !focus-visible:outline-none transition-all duration-300"
                >
                  <span className="font-display text-sm sm:text-base font-bold uppercase tracking-wide text-white group-hover:text-[#16D9C5] transition-colors duration-300">
                    {faq.question}
                  </span>

                  {/* Subtle "+" turning to "x" on expand */}
                  <span
                    className={`text-white/30 group-hover:text-white transition-transform duration-500 w-5 h-5 flex items-center justify-center font-mono text-lg select-none ${
                      isOpen ? 'rotate-45 text-[#16D9C5] group-hover:text-[#16D9C5]' : ''
                    }`}
                  >
                    +
                  </span>
                </button>

                {/* 60fps Native CSS Height Animation using Grid template trick */}
                <div
                  id={`faq-panel-${faq.id}`}
                  role="region"
                  aria-labelledby={`faq-btn-${faq.id}`}
                  className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isOpen ? 'grid-template-rows-[1fr]' : 'grid-template-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-white/45 text-xs sm:text-[13px] leading-relaxed pt-3 pb-2 px-4 -mx-4 max-w-2xl font-sans">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>

            );
          })}
        </div>

        {/* BOTTOM CALL TO ACTION */}
        <div className="text-center mt-14 sm:mt-18">
          <span className="text-[11px] tracking-wider text-white/30 font-mono block">
            Still Have Questions?
          </span>
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.25em] text-[#16D9C5] hover:text-white font-semibold uppercase mt-3 transition-colors duration-300"
          >
            Book a Consultation{' '}
            <span className="transition-transform duration-300 hover:translate-x-0.5">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
