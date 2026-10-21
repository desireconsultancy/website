import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Footer } from '../components/footer/Footer';
import { WhatsAppButton } from '../components/shared/WhatsAppButton';

interface SubpageLayoutProps {
  children: React.ReactNode;
}

export function SubpageLayout({ children }: SubpageLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans">
      {/* Global Subpage Sticky Header */}
      <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-xl border-b border-white/5 h-20 px-6 md:px-8">
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
          {/* Logo & Brand Name */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden flex items-center justify-center p-0.5 group-hover:scale-105 transition-transform duration-300">
              <img
                src="/logo.webp"
                alt="Desire Consultancy Logo"
                className="w-full h-full object-contain"
                loading="eager"
              />
            </div>
            <span className="font-display font-bold tracking-[0.25em] text-xs sm:text-sm text-white uppercase group-hover:text-[#16D9C5] transition-colors">
              Desire Consultancy
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 font-mono text-[11px] tracking-widest uppercase">
            <Link to="/" className="text-white/60 hover:text-white transition-colors">Home</Link>
            <Link to="/fssai-certification" className="text-white/60 hover:text-[#16D9C5] transition-colors">FSSAI</Link>
            <Link to="/bis-certification" className="text-white/60 hover:text-[#16D9C5] transition-colors">BIS</Link>
            <Link to="/services/packaged-drinking-water" className="text-white/60 hover:text-[#16D9C5] transition-colors">Water Plants</Link>
            <Link to="/services/ro-solutions" className="text-white/60 hover:text-[#16D9C5] transition-colors">Industrial RO</Link>
            <Link to="/blog" className="text-white/60 hover:text-white transition-colors">Blog</Link>
            <Link to="/#contact" className="text-white/60 hover:text-white transition-colors">Contact</Link>
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              to="/#contact"
              className="text-[9px] sm:text-[10px] tracking-[0.2em] text-white uppercase bg-white/5 border border-white/10 hover:bg-white hover:text-black transition-all px-4 py-2 rounded-full inline-block"
            >
              Consultation
            </Link>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="lg:hidden p-2 rounded-xl border border-white/10 text-white/70 hover:text-white hover:bg-white/5 transition-all"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              <svg className="w-5 h-5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-20 bg-black/95 backdrop-blur-2xl border-b border-white/10 px-6 py-6 flex flex-col gap-3 font-mono text-xs tracking-widest uppercase shadow-2xl">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="py-2 text-white/70 hover:text-white">Home</Link>
            <Link to="/fssai-certification" onClick={() => setIsMobileMenuOpen(false)} className="py-2 text-white/70 hover:text-[#16D9C5]">↳ FSSAI Licensing</Link>
            <Link to="/bis-certification" onClick={() => setIsMobileMenuOpen(false)} className="py-2 text-white/70 hover:text-[#16D9C5]">↳ BIS Certification</Link>
            <Link to="/services/packaged-drinking-water" onClick={() => setIsMobileMenuOpen(false)} className="py-2 text-white/70 hover:text-[#16D9C5]">↳ Packaged Water Plants</Link>
            <Link to="/services/ro-solutions" onClick={() => setIsMobileMenuOpen(false)} className="py-2 text-white/70 hover:text-[#16D9C5]">↳ Industrial RO Solutions</Link>
            <Link to="/trademark-registration" onClick={() => setIsMobileMenuOpen(false)} className="py-2 text-white/70 hover:text-[#16D9C5]">↳ Trademark Registration</Link>
            <Link to="/blog" onClick={() => setIsMobileMenuOpen(false)} className="py-2 text-white/70 hover:text-white">Compliance Blog</Link>
            <Link to="/#contact" onClick={() => setIsMobileMenuOpen(false)} className="py-2 text-white/70 hover:text-white">Contact Us</Link>
          </div>
        )}
      </header>

      {/* Page Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Floating WhatsApp CTA */}
      <WhatsAppButton />
    </div>
  );
}
