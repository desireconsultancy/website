import { useRef } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(footerRef, { threshold: 0.05 });


  return (
    <footer
      ref={footerRef}
      className="relative bg-black border-t border-white/5 pt-24 pb-12 overflow-hidden z-10"
    >
      {/* OVERSIZED WATERMARK IN BACKGROUND */}
      <div className="absolute right-0 bottom-[-50px] sm:bottom-[-80px] pointer-events-none select-none opacity-[0.015] z-0">
        <svg
          width="450"
          height="450"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-white"
        >
          <text
            x="50%"
            y="70%"
            textAnchor="middle"
            fontFamily="system-ui, sans-serif"
            fontWeight="900"
            fontSize="140"
            fill="currentColor"
          >
            DC
          </text>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        {/* FOOTER INTRO STATEMENT */}
        <div
          className={`border-b border-white/5 pb-16 mb-16 transition-all duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="max-w-3xl">
            <h4 className="font-display text-2xl sm:text-4xl font-bold uppercase tracking-tight text-white leading-[1.2]">
              Helping Businesses Navigate
              <br />
              Compliance With Confidence.
            </h4>
            <p className="text-white/40 tracking-wider text-xs sm:text-sm uppercase leading-relaxed mt-4 font-mono">
              Expert consultancy for FSSAI licensing, BIS certification, packaged drinking water
              plants, and industrial RO solutions.
            </p>
          </div>
        </div>

        {/* 4-COLUMN LAYOUT */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-16 transition-all duration-[1400ms] delay-[200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* COLUMN 1: BRAND */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              {/* Minimalist vector monogram logo */}
              <div className="w-8 h-8 rounded border border-white/20 flex items-center justify-center font-mono font-black text-sm text-white select-none bg-white/[0.02]">
                D
              </div>
              <span className="font-display font-black text-sm uppercase tracking-[0.25em] text-white">
                Desire Consultancy
              </span>
            </div>
            <p className="text-white/40 text-[11px] sm:text-xs leading-relaxed max-w-sm mt-1 font-sans">
              Helping businesses simplify certification, compliance, and approval processes across
              India with absolute precision.
            </p>
          </div>

          {/* COLUMN 2: SERVICES LINKS */}
          <div className="lg:col-span-2 lg:col-start-6 flex flex-col gap-4">
            <span className="text-[10px] tracking-[0.25em] text-[#16D9C5] font-mono font-medium uppercase">
              SERVICES
            </span>
            <ul className="space-y-2 text-[11px] sm:text-xs tracking-wider text-white/50 font-mono">
              <li>
                <a href="#services" className="hover:text-white transition-colors duration-300">
                  FSSAI Licensing
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors duration-300">
                  BIS Certification
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors duration-300">
                  Water Plants Setup
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors duration-300">
                  Industrial RO Solutions
                </a>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: COMPANY LINKS */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <span className="text-[10px] tracking-[0.25em] text-[#16D9C5] font-mono font-medium uppercase">
              COMPANY
            </span>
            <ul className="space-y-2 text-[11px] sm:text-xs tracking-wider text-white/50 font-mono">
              <li>
                <a href="#founder" className="hover:text-white transition-colors duration-300">
                  About Founder
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-white transition-colors duration-300">
                  Our Process
                </a>
              </li>
              <li>
                <a href="#cases" className="hover:text-white transition-colors duration-300">
                  Success Stories
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors duration-300">
                  Get In Touch
                </a>
              </li>
            </ul>
          </div>

          {/* COLUMN 4: CONTACT INFO */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <span className="text-[10px] tracking-[0.25em] text-[#16D9C5] font-mono font-medium uppercase">
              CONTACT
            </span>
            <div className="space-y-2 text-[11px] sm:text-xs tracking-wider text-white/50 font-mono">
              <p>
                Phone:{' '}
                <a
                  href="tel:+918421504028"
                  className="hover:text-white transition-colors duration-300"
                >
                  +91 84215 04028
                </a>
              </p>
              <p>
                Email:{' '}
                <a
                  href="mailto:desireconsultancy37@gmail.com"
                  className="hover:text-white transition-colors duration-300"
                >
                  desireconsultancy37@gmail.com
                </a>
              </p>
              <p>Hours: Mon - Sat (9 AM - 6 PM)</p>
            </div>

            {/* Minimal WhatsApp link */}
            <a
              href="https://wa.me/918421504028"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[9px] tracking-widest text-emerald-400 hover:text-emerald-300 font-mono uppercase mt-1 self-start"
            >
              Chat on WhatsApp <span>→</span>
            </a>
          </div>
        </div>

        {/* BOTTOM METADATA DIVIDER */}
        <div
          className={`border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all duration-[1400ms] delay-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="text-[9px] tracking-widest text-white/30 font-mono">
            © 2026 DESIRE CONSULTANCY. ALL RIGHTS RESERVED.
          </span>
          <span className="text-[9px] tracking-widest text-white/20 font-mono">
            COMPLIANCE • CERTIFICATION • SETUP
          </span>
        </div>
      </div>
    </footer>
  );
}
