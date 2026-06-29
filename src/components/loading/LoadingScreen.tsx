import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import type { WebGL3DLogoRef } from './WebGL3DLogo';

interface LoadingScreenProps {
  logoRef: React.RefObject<WebGL3DLogoRef | null>;
  onTransitionStart: () => void;
  onComplete: () => void;
  isWebGLVisible: boolean;
  setIsWebGLVisible: (visible: boolean) => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  logoRef,
  onTransitionStart,
  onComplete,
  isWebGLVisible,
  setIsWebGLVisible,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const brandTextRef = useRef<HTMLDivElement>(null);
  const gridOverlayRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const fragmentsContainerRef = useRef<HTMLDivElement>(null);

  const [percent, setPercent] = useState(0);

  // Define 4 quadrants for CSS fragment assembly
  const fragments = [
    { id: 'tl', clipPath: 'inset(0 50% 50% 0)', x: -60, y: -60 }, // Top-Left
    { id: 'tr', clipPath: 'inset(0 0 50% 50%)', x: 60, y: -60 }, // Top-Right
    { id: 'bl', clipPath: 'inset(50% 50% 0 0)', x: -60, y: 60 }, // Bottom-Left
    { id: 'br', clipPath: 'inset(50% 0 0 50%)', x: 60, y: 60 }, // Bottom-Right
  ];

  useGSAP(
    () => {
      // Local animatable values for WebGL uniforms
      const animValues = {
        glow: 0.0,
        sheenPos: -1.2,
        bevelDepth: 1.8,
        progress: 0,
      };

      const updateUniforms = () => {
        if (logoRef.current) {
          logoRef.current.setGlow(animValues.glow);
          logoRef.current.setSheenPos(animValues.sheenPos);
          logoRef.current.setBevelDepth(animValues.bevelDepth);
        }
      };

      const tl = gsap.timeline({
        onComplete: () => {
          onComplete();
        },
      });

      // --- INITIAL STATE ---
      gsap.set('.logo-fragment-png', {
        opacity: 0,
        x: (i: number) => fragments[i].x,
        y: (i: number) => fragments[i].y,
      });
      gsap.set(brandTextRef.current, { opacity: 0, y: 12 });
      gsap.set(gridOverlayRef.current, { opacity: 0, scale: 0.98 });
      if (progressBarRef.current?.parentElement) {
        gsap.set(progressBarRef.current.parentElement, { opacity: 0 });
      }

      // --- 1. CIRCULAR BLUEPRINT GUIDELINES REVEAL ---
      tl.to(
        gridOverlayRef.current,
        {
          opacity: 0.15,
          scale: 1,
          duration: 1.4,
          ease: 'power2.out',
        },
        0.1,
      );

      // --- 2. LOGO ASSEMBLY (CONVERGING FRAGMENTS) ---
      tl.to(
        '.logo-fragment-png',
        {
          x: 0,
          y: 0,
          opacity: 1,
          duration: 1.8,
          ease: 'power3.out',
          stagger: 0.05,
        },
        '<-0.3',
      );

      // --- 3. SEAMLESS FUSION WITH WEBGL LOGO ---
      // Fade in the WebGL Logo underneath and fade out the PNG fragments
      tl.to(
        {},
        {
          duration: 0.1,
          onStart: () => {
            setIsWebGLVisible(true);
            updateUniforms();
          },
        },
        '>-0.1',
      );

      tl.to(
        fragmentsContainerRef.current,
        {
          opacity: 0,
          duration: 0.4,
          ease: 'power2.inOut',
        },
        '<',
      );

      // --- 4. LOADING PROGRESS LINE ---
      // Fade in progress track
      if (progressBarRef.current?.parentElement) {
        tl.to(
          progressBarRef.current.parentElement,
          {
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
          },
          '<',
        );
      }

      // Smooth progress accumulation
      tl.to(
        animValues,
        {
          progress: 100,
          duration: 2.2,
          ease: 'power2.inOut',
          onUpdate: () => {
            const currentPct = Math.floor(animValues.progress);
            setPercent(currentPct);
            if (progressBarRef.current) {
              progressBarRef.current.style.width = `${currentPct}%`;
            }
          },
        },
        '<',
      );

      // --- 5. PROGRESS COMPLETION: SPECULAR SWEEP & GLOW PUSH ---
      // Sweep the sheen and bump the specular glow right as progress finishes
      tl.to(
        animValues,
        {
          sheenPos: 1.5,
          glow: 1.0,
          bevelDepth: 2.2,
          duration: 1.4,
          ease: 'power3.inOut',
          onUpdate: updateUniforms,
        },
        '>-0.2',
      );

      // Fade out the progress bar once loading is complete
      if (progressBarRef.current?.parentElement) {
        tl.to(
          progressBarRef.current.parentElement,
          {
            opacity: 0,
            y: -8,
            duration: 0.6,
            ease: 'power2.in',
          },
          '<-0.2',
        );
      }

      // --- 6. BRAND TEXT REVEAL ---
      tl.to(
        brandTextRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
        },
        '>-0.4',
      );

      // --- 7. AMBIENT BREATHING HOLD ---
      // Allow the layout to breathe. Pulse the glow on the WebGL logo
      tl.to(
        animValues,
        {
          glow: 0.65,
          bevelDepth: 1.8,
          duration: 1.2,
          ease: 'sine.inOut',
          onUpdate: updateUniforms,
        },
        '>',
      );

      // Hold state duration
      tl.to({}, { duration: 1.8 });

      // --- 8. PREPARATION FOR SITE TRANSITION ---
      // Fade out guidelines, circle overlay, and brand typography
      tl.to(
        [brandTextRef.current, gridOverlayRef.current],
        {
          opacity: 0,
          y: -15,
          duration: 1.1,
          ease: 'power3.inOut',
        },
        '>',
      );

      // Trigger the Parent layout movement (Logo moves to header, Website fades in)
      tl.to(
        {},
        {
          duration: 0.1,
          onStart: () => {
            onTransitionStart();
          },
        },
        '>-0.3',
      );

      // Final fade out of the loading screen overlay backdrop
      tl.to(
        containerRef.current,
        {
          opacity: 0,
          duration: 1.4,
          ease: 'power2.inOut',
        },
        '<',
      );
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-black z-40 overflow-hidden flex flex-col items-center justify-center pointer-events-none"
    >
      <div className="flex flex-col items-center justify-center gap-14 select-none relative">
        {/* Scene 3: Circular Outline behind the logo (Symmetrical Guidelines) */}
        <div
          ref={gridOverlayRef}
          className="absolute w-[360px] h-[360px] pointer-events-none flex items-center justify-center opacity-0"
        >
          {/* Faint Concentric Circles with extremely slow ambient rotations */}
          <div className="w-[300px] h-[300px] border border-white/4 rounded-full absolute animate-[spin_100s_linear_infinite]" />
          <div className="w-[360px] h-[360px] border border-white/2 rounded-full absolute animate-[spin_160s_linear_infinite_reverse]" />

          {/* Symmetrical Grid Axis Lines */}
          <div className="w-[420px] h-[1px] bg-white/3 absolute" />
          <div className="h-[420px] w-[1px] bg-white/3 absolute" />
        </div>

        {/* Temporary CSS Logo Fragments container (Faded out upon WebGL transition) */}
        {!isWebGLVisible && (
          <div ref={fragmentsContainerRef} className="relative w-[220px] h-[220px] z-10">
            {fragments.map((frag) => (
              <img
                key={frag.id}
                src="/logo.webp"
                alt="Logo Fragment"
                className="absolute inset-0 w-full h-full logo-fragment-png"
                style={{
                  clipPath: frag.clipPath,
                  willChange: 'transform, opacity',
                }}
              />
            ))}
          </div>
        )}

        {/* Spacer of matching height to keep grid layout correct when fragments fade */}
        {isWebGLVisible && <div className="w-[220px] h-[220px] z-0" />}

        {/* Scene 4: Progress Indicator (Thin 1px Line) */}
        <div className="flex flex-col items-center gap-3 h-10 z-10">
          <div className="w-[220px] h-[1px] bg-white/5 relative overflow-hidden opacity-0">
            <div
              ref={progressBarRef}
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-transparent via-[#0E6EFF] to-[#16D9C5]"
              style={{ width: '0%' }}
            />
          </div>
          <div className="text-[10px] tracking-[0.3em] text-white/30 font-mono mt-1 select-none">
            {percent.toString().padStart(3, '0')}%
          </div>
        </div>

        {/* Scene 5: Typography Reveal Area */}
        <div
          ref={brandTextRef}
          className="flex flex-col items-center gap-4 absolute bottom-[-130px] z-10"
        >
          <h1 className="text-2xl sm:text-3xl font-bold tracking-[0.55em] text-white font-display uppercase">
            DESIRE CONSULTANCY
          </h1>
          <p className="text-[10px] tracking-[0.62em] text-white/40 uppercase font-sans">
            FSSAI • BIS • WATER SOLUTIONS
          </p>
        </div>
      </div>
    </div>
  );
};
