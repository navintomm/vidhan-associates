"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WORDS = [
 { letter: "V", word: "ision" },
 { letter: "I", word: "ntegrity" },
 { letter: "D", word: "edication" },
 { letter: "H", word: "onor" },
 { letter: "A", word: "ccountability" },
 { letter: "N", word: "obility" }
];

export default function PracticeShowcase() {
 const sectionRef = useRef<HTMLElement>(null);
 const [isReducedMotion, setIsReducedMotion] = useState(false);

 useEffect(() => {
 const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
 setIsReducedMotion(mediaQuery.matches);

 const handleMotionChange = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
 mediaQuery.addEventListener("change", handleMotionChange);

 return () => mediaQuery.removeEventListener("change", handleMotionChange);
 }, []);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("all", () => {
      if (!sectionRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          pinSpacing: true,
          scrub: 1.8, // Smooth cinematic dampening
          start: "top top",
          end: "+=900vh", // Generous 9 screens of scroll distance for relaxed pacing
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Initial States - explicitly setting xPercent to -71 so GSAP preserves visual centering 
      // because the pillar image's visual center is at 71% of its width.
      gsap.set(".pillar-0", { y: "40vh", opacity: 0, xPercent: -71, x: 0, z: 0, rotationY: 0 });
      
      const otherPillars = WORDS.slice(1).map((_, i) => `.pillar-${i + 1}`).join(", ");
      gsap.set(otherPillars, { x: "50vw", xPercent: -71, z: -600, rotationY: 45, opacity: 0 });

      // Phase 1: Pillar 0 rises
      tl.to(".pillar-0", { y: 0, opacity: 1, duration: 2, ease: "power2.out" });

      // Hold Phase 0 (Vision)
      tl.to({}, { duration: 2.5 });

      // Build the transitions dynamically for the 6 pillars (V - I - D - H - A - N)
      for (let i = 0; i < WORDS.length - 1; i++) {
        const transLabel = `trans${i}`;
        
        // Current pillar arcs left and exits
        tl.to(`.pillar-${i}`, { x: "-50vw", z: -600, rotationY: -45, opacity: 0, duration: 2.5, ease: "power2.inOut" }, transLabel)
        // Next pillar arcs in from right to center
        .to(`.pillar-${i+1}`, { x: 0, z: 0, rotationY: 0, opacity: 1, duration: 2.5, ease: "power2.inOut" }, transLabel);
        
        // Hold Phase for each pillar so user can read comfortably
        tl.to({}, { duration: 2.5 });
      }

      // Final Hold for Nobility (N)
      tl.to({}, { duration: 2.5 });

      setTimeout(() => {
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
      }, 150);

      return () => {
        tl.kill();
      };
    });

    return () => mm.revert();
  }, [isReducedMotion]);

 return (
 <section ref={sectionRef} className="relative bg-parchment overflow-hidden h-screen w-full">
 
 {/* BACKGROUND WATERMARK */}
 <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
 <h2 className="text-[15vw] lg:text-[18vw] font-serif uppercase tracking-widest text-ink/[0.06] whitespace-nowrap select-none">
 VIDHAN
 </h2>
 </div>

 {/* 3D PILLARS STAGE */}
 <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none" style={{ perspective: '1400px' }}>
 {WORDS.map((item, i) => (
 <div 
 key={i} 
 className={`absolute pillar-${i} bottom-[-5vh] md:bottom-[-10vh] lg:bottom-[-15vh] h-[35vh] md:h-[40vh] lg:h-[45vh] flex flex-col justify-end items-center`}
 style={{ left: '50%' }}
 >
 {/* The Text hovering exactly on top of everything */}
 <div className="absolute bottom-[100%] left-[71%] -translate-x-1/2 mb-[22vh] md:mb-[26vh] lg:mb-[32vh] whitespace-nowrap z-40 text-center">
 <h3 className="text-5xl md:text-6xl lg:text-7xl font-serif text-ink drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] tracking-wider">
 <span className="text-amber-500">{item.letter}</span>
 {item.word}
 </h3>
 </div>

 {/* The Scale of Justice */}
 <div className="absolute bottom-[96%] left-[71%] -translate-x-1/2 w-[110%] md:w-[120%] lg:w-[130%] z-30 flex flex-col items-center">
 <Image
 src="/images/icons/scale-of-justice-transparent.png"
 alt="Scale of Justice"
 width={300}
 height={300}
 className="w-full h-auto object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)] relative z-10 pointer-events-none"
 />
 <div className="absolute bottom-[2%] left-1/2 -translate-x-1/2 w-[40%] h-[8px] bg-black/80 blur-[5px] rounded-[100%] z-0"></div>
 </div>
 
 {/* The Pillar Base */}
 <Image
 src="/images/icons/ashoka-pillar-transparent.png"
 alt="Ashoka Pillar"
 width={800}
 height={1420}
 className="w-auto h-full object-contain object-bottom relative z-10 drop-shadow-[0_10px_25px_rgba(0,0,0,0.9)] pointer-events-none"
 />
 </div>
 ))}
 </div>

 </section>
 );
}
