import { useState, useRef, useEffect } from 'react';
import { LoadingScreen } from '@/components/loading/LoadingScreen';
import { ServicesSection } from '@/components/services/ServicesSection';
import { ProcessSection } from '@/components/process/ProcessSection';
import { WhyChooseUsSection } from '@/components/why-choose-us/WhyChooseUsSection';
import { CaseStudiesSection } from '@/components/cases/CaseStudiesSection';
import { FounderSection } from '@/components/founder/FounderSection';
import { ContactSection } from '@/components/contact/ContactSection';
import { FAQSection } from '@/components/faq/FAQSection';
import { Footer } from '@/components/footer/Footer';
import { WebGL3DLogo } from '@/components/loading/WebGL3DLogo';
import type { WebGL3DLogoRef } from '@/components/loading/WebGL3DLogo';
import { WhatsAppButton } from '@/components/shared/WhatsAppButton';
import gsap from 'gsap';
import { useLenis } from '@/hooks/useLenis';
import { SEO } from '@/seo/SEO';

type AppState = 'LOADING' | 'HOLD' | 'TRANSITIONING' | 'READY';

function App() {
  useLenis();
  const [appState, setAppState] = useState<AppState>('LOADING');
  const [isWebGLVisible, setIsWebGLVisible] = useState(false);
  const [isLoadingOverlayActive, setIsLoadingOverlayActive] = useState(true);

  // Expose WebGL canvas controls directly to avoid React state triggers
  const logoRef = useRef<WebGL3DLogoRef>(null);
  const heroLogoRef = useRef<WebGL3DLogoRef>(null);

  // States for interactive mouse tracking and scroll scaling
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
  });
  const [scrollY, setScrollY] = useState(0);

  // Track window scroll for premium parallax scaling
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Compute scroll-based scaling/fading factor
  const scrollScale = Math.max(0.88, 1 - scrollY * 0.0004);
  const scrollOpacity = Math.max(0, 1 - scrollY * 0.002);

  // Mouse interactivity triggers (3D tilt + lighting specular shifting)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (appState !== 'READY') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // range: -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // range: -0.5 to 0.5

    // Restrict tilt to exactly max 3 degrees: 6 * 0.5 = 3
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`,
      transition: 'transform 0.1s ease-out',
    });

    if (heroLogoRef.current) {
      heroLogoRef.current.setLightOffset(x * 1.5, -y * 1.5);
    }
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
      transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
    });
    if (heroLogoRef.current) {
      heroLogoRef.current.setLightOffset(0, 0);
    }
  };

  return (
    <div className="relative min-h-[150vh] bg-black text-white overflow-x-hidden font-sans select-none">
      <SEO />
      {/* 1. Subtle Premium Background Grid & Center Orb */}

      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: '44px 44px',
          maskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)',
        }}
      />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div
          className={`w-[700px] h-[700px] bg-gradient-to-tr from-[#0E6EFF]/4 via-[#16D9C5]/2 to-transparent rounded-full blur-[140px] transition-all duration-[2400ms] ${
            appState === 'TRANSITIONING' || appState === 'READY'
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-90'
          }`}
        />
      </div>

      {/* 2. Premium Navigation Bar (Revealed during transition) */}
      <header
        className={`fixed top-0 left-0 right-0 h-20 border-b border-white/5 backdrop-blur-md bg-black/20 z-40 transition-all duration-[1600ms] ease-out ${
          appState === 'TRANSITIONING' || appState === 'READY'
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-4'
        }`}
      >
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 md:px-8 flex items-center justify-between">
          {/* Logo brand label (Fades in slightly after logo flies into place) */}
          <div className="flex items-center gap-14 pl-[56px] sm:pl-[62px] md:pl-[72px]">
            <span className="font-display font-bold tracking-[0.3em] sm:tracking-[0.35em] text-[10px] sm:text-xs md:text-sm text-white uppercase leading-none select-none">
              DESIRE CONSULTANCY
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-10">
            {['Services', 'Process', 'About', 'Contact'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-[10px] tracking-[0.25em] text-white/50 hover:text-white uppercase transition-colors duration-300"
              >
                {link}
              </a>
            ))}
          </nav>

          {/* CTA Action Button */}
          <div>
            <a
              href="#contact"
              className="text-[9px] sm:text-[10px] tracking-[0.18em] sm:tracking-[0.22em] text-white uppercase bg-white/5 border border-white/10 hover:bg-white hover:text-black transition-all duration-500 px-3.5 py-1.5 sm:px-5 sm:py-2 rounded-full inline-block text-center"
            >
              Book Consultation
            </a>
          </div>
        </div>
      </header>

      {/* 3. Global 3D WebGL Logo (Shared layout element that flies to navigation) */}
      <div className="fixed inset-0 pointer-events-none z-50">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 md:px-8 relative">
          <div
            className={`absolute transition-all duration-[1800ms] cubic-bezier(0.16, 1, 0.3, 1) ${
              appState === 'LOADING' || appState === 'HOLD'
                ? 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px]'
                : 'left-4 sm:left-6 md:left-8 top-10 -translate-x-0 -translate-y-1/2 w-[44px] h-[44px] sm:w-[48px] sm:h-[48px] md:w-[56px] md:h-[56px] pointer-events-auto'
            }`}
            style={{
              opacity: isWebGLVisible ? 1 : 0,
            }}
          >
            <WebGL3DLogo ref={logoRef} />
          </div>
        </div>
      </div>

      {/* 4. Luxury Homepage Hero Section */}
      <main
        className={`relative min-h-screen max-w-7xl mx-auto px-6 md:px-8 flex items-center z-10 transition-all duration-[2000ms] ease-out ${
          appState === 'TRANSITIONING' || appState === 'READY'
            ? 'opacity-100 translate-y-0 blur-0 pointer-events-auto'
            : 'opacity-0 translate-y-8 blur-md pointer-events-none'
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center w-full pt-28 pb-16">
          {/* LEFT SIDE CONTENT */}
          <div className="lg:col-span-7 flex flex-col items-start text-left gap-8">
            {/* Small uppercase label */}
            <div
              className={`text-[10px] tracking-[0.3em] text-[#16D9C5] font-mono font-medium uppercase transition-all duration-[1200ms] delay-100 ${
                appState === 'READY' ? 'opacity-80 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              TRUSTED FSSAI & BIS CONSULTANCY
            </div>

            {/* Large Typography Main Headline */}
            <h2
              className={`font-display text-4xl sm:text-6xl font-bold tracking-tight text-white uppercase leading-[1.15] max-w-xl transition-all duration-[1200ms] delay-300 ${
                appState === 'READY' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Helping Businesses
              <br />
              Get Certified,
              <br />
              Compliant &<br />
              Market Ready.
            </h2>

            {/* Bulleted Subtext */}
            <div
              className={`text-white/50 tracking-wider text-xs uppercase max-w-lg leading-relaxed space-y-2.5 transition-all duration-[1200ms] delay-500 ${
                appState === 'READY' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <div className="font-semibold text-white/70">End-to-end consultancy for:</div>
              <ul className="space-y-1.5 list-none">
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-[#0E6EFF] rounded-full" /> FSSAI Licensing
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-[#16D9C5] rounded-full" /> BIS Certification
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-[#0E6EFF] rounded-full" /> Packaged Drinking Water
                  Plants
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-[#16D9C5] rounded-full" /> Industrial RO Solutions
                </li>
              </ul>
            </div>

            {/* CTA Buttons (Elegant Apple-inspired sizes) */}
            <div
              className={`flex flex-col sm:flex-row items-center gap-4 mt-4 w-full sm:w-auto transition-all duration-[1200ms] delay-700 ${
                appState === 'READY' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <a
                href="#contact"
                className="w-full sm:w-auto text-[10px] tracking-[0.25em] text-black font-semibold bg-white border border-white hover:bg-transparent hover:text-white transition-all duration-300 px-6 py-3 rounded-full uppercase inline-block text-center"
              >
                Book Free Consultation
              </a>
              <a
                href="#services"
                className="w-full sm:w-auto text-[10px] tracking-[0.25em] text-white bg-transparent border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all duration-300 px-6 py-3 rounded-full uppercase inline-block text-center"
              >
                Explore Services
              </a>
            </div>

            {/* Trust Metrics (2-line descriptions) */}
            <div
              className={`grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 w-full mt-10 border-t border-white/5 pt-8 transition-all duration-[1200ms] delay-900 ${
                appState === 'READY' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <div>
                <div className="text-xl sm:text-2xl font-bold text-white font-display">500+</div>
                <div className="text-[10px] tracking-wider text-white/40 uppercase mt-1 leading-normal">
                  Projects
                  <br />
                  Assisted
                </div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-white font-display">15+</div>
                <div className="text-[10px] tracking-wider text-white/40 uppercase mt-1 leading-normal">
                  Years
                  <br />
                  Experience
                </div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-white font-display">
                  PAN India
                </div>
                <div className="text-[10px] tracking-wider text-white/40 uppercase mt-1 leading-normal">
                  Coverage
                  <br />
                  Network
                </div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-white font-display">
                  End-to-End
                </div>
                <div className="text-[10px] tracking-wider text-white/40 uppercase mt-1 leading-normal">
                  Compliance
                  <br />
                  Support
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE VISUAL (3D CENTERPIECE) */}
          <div
            className={`lg:col-span-5 flex flex-col items-center justify-center relative min-h-[300px] sm:min-h-[480px] transition-all duration-[1800ms] cubic-bezier(0.16, 1, 0.3, 1) ${
              appState === 'READY'
                ? 'opacity-100 scale-100 translate-y-0 blur-0'
                : 'opacity-0 scale-95 translate-y-4 blur-sm'
            }`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Small floating branding label above the centerpiece */}
            <div className="text-[10px] tracking-[0.45em] text-white/25 font-mono uppercase mb-6 text-center select-none">
              DESIRE CONSULTANCY
            </div>

            <div className="relative w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] lg:w-[380px] lg:h-[380px] flex items-center justify-center">
              {/* Subtle backglow background */}
              <div
                className="absolute w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] lg:w-[440px] lg:h-[440px] rounded-full pointer-events-none z-0 filter blur-[80px] opacity-100"
                style={{
                  background:
                    'radial-gradient(circle, rgba(14, 110, 255, 0.08) 0%, rgba(22, 217, 197, 0.03) 50%, transparent 100%)',
                }}
              />

              {/* Rotating guidelines acting as a certification seal (Opacity elevated to 12% with 60s rotation loop) */}
              <div className="absolute w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] lg:w-[460px] lg:h-[460px] rounded-full border border-white/12 pointer-events-none flex items-center justify-center animate-[spin_60s_linear_infinite]">
                <div className="absolute w-[210px] h-[210px] sm:w-[260px] sm:h-[260px] lg:w-[380px] lg:h-[380px] rounded-full border border-white/8 border-dashed animate-[spin_90s_linear_infinite_reverse]" />
                <div className="absolute w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] lg:w-[460px] lg:h-[460px] rounded-full border border-white/5 border-double" />
              </div>

              {/* Upscaled Interactive WebGL 3D Logo Container */}
              <div
                className="w-[210px] h-[210px] sm:w-[260px] sm:h-[260px] lg:w-[380px] lg:h-[380px] relative z-10 will-change-transform"
                style={{
                  ...tiltStyle,
                  transform: `${tiltStyle.transform} scale(${scrollScale})`,
                  opacity: scrollOpacity,
                }}
              >
                <WebGL3DLogo ref={heroLogoRef} />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 5. Luxury Services Section */}
      <ServicesSection />

      {/* 6. Luxury Process Section */}
      <ProcessSection />

      {/* 7. Luxury Why Choose Us Section */}
      <WhyChooseUsSection />

      {/* 8. Luxury Case Studies Section */}
      <CaseStudiesSection />

      {/* 9. Founder Story Section */}
      <FounderSection />

      {/* 10. Contact Inquiry Form Section */}
      <ContactSection />

      {/* 11. Frequently Asked Questions Accordion Section */}
      <FAQSection />

      {/* 12. Premium Brand Footer */}
      <Footer />

      {/* 5. Refined Loading Screen Overlay Backdrop */}
      {isLoadingOverlayActive && (
        <LoadingScreen
          logoRef={logoRef}
          onTransitionStart={() => setAppState('TRANSITIONING')}
          onComplete={() => {
            // Once navigation animation completes, stop WebGL rendering loop on navbar logo
            if (logoRef.current) {
              logoRef.current.setGlow(0.2); // Set minor static ambient glow for navbar presentation
              logoRef.current.setSheenPos(-1.2); // Reset sheen
              logoRef.current.stopLoop(); // Halt requestAnimationFrame drawing to save energy
            }

            // Activate and configure the interactive hero logo
            if (heroLogoRef.current) {
              heroLogoRef.current.setGlow(0.65);
              heroLogoRef.current.setBevelDepth(2.2); // Elevated bevel depth for stronger 3D extrusion

              // Run a single metallic sheen sweep on hero centerpiece for the visual entry reward
              gsap.to(
                { val: -1.2 },
                {
                  val: 1.5,
                  duration: 1.8,
                  ease: 'power3.inOut',
                  onUpdate: function () {
                    heroLogoRef.current?.setSheenPos(this.targets()[0].val);
                  },
                },
              );
            }

            setAppState('READY');
            setIsLoadingOverlayActive(false);
          }}
          isWebGLVisible={isWebGLVisible}
          setIsWebGLVisible={setIsWebGLVisible}
        />
      )}
      {/* Floating WhatsApp CTA — always visible after loading */}
      <WhatsAppButton />
    </div>
  );
}

export default App;
