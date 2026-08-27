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
          scrub: 1,
          start: "top top",
          end: "+=600%", // 6 screens of scrolling duration for 6 pillars
          anticipatePin: 1,
        },
      });

      // Initial States - explicitly setting xPercent to -50 so GSAP preserves true centering!
      gsap.set(".pillar-0", { y: "40vh", opacity: 0, xPercent: -50, x: 0 });
      
      const otherPillars = WORDS.slice(1).map((_, i) => `.pillar-${i + 1}`).join(", ");
      gsap.set(otherPillars, { x: "50vw", xPercent: -50, z: -600, rotationY: 45, opacity: 0 });

      // Phase 1: Pillar 0 rises
      tl.to(".pillar-0", { y: 0, opacity: 1, duration: 1.5, ease: "power2.out" });

      // Hold Phase 0
      tl.to({}, { duration: 1 });

      // Build the transitions dynamically for the 6 pillars
      for (let i = 0; i < WORDS.length - 1; i++) {
        const transLabel = `trans${i}`;
        
        // Current pillar arcs left and exits
        tl.to(`.pillar-${i}`, { x: "-50vw", z: -600, rotationY: -45, opacity: 0, duration: 2, ease: "power2.inOut" }, transLabel)
        // Next pillar arcs in from right to center
          .to(`.pillar-${i+1}`, { x: 0, z: 0, rotationY: 0, opacity: 1, duration: 2, ease: "power2.inOut" }, transLabel);
          
        // Hold Phase
        tl.to({}, { duration: 1 });
      }

      return () => {
        tl.kill();
      };
    });

    return () => mm.revert();
  }, [isReducedMotion]);

  return (
    <section ref={sectionRef} className="relative bg-ink overflow-hidden h-screen w-full">
      
      {/* BACKGROUND WATERMARK */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
        <h2 className="text-[15vw] lg:text-[18vw] font-serif uppercase tracking-widest text-parchment/[0.02] whitespace-nowrap select-none">
          VIDHAN
        </h2>
      </div>

      {/* 3D PILLARS STAGE */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none" style={{ perspective: '1400px' }}>
        {WORDS.map((item, i) => (
          <div 
            key={i} 
            className={`absolute pillar-${i} bottom-[-10vh] md:bottom-[-5vh] h-[65vh] md:h-[70vh] lg:h-[80vh] flex flex-col justify-end items-center`}
            style={{ left: '50%' }}
          >
            {/* The Text hovering beside the pillar */}
            <div className="absolute top-[35%] md:top-[40%] left-[100%] ml-6 md:ml-10 whitespace-nowrap z-40">
              <h3 className="text-5xl md:text-6xl lg:text-8xl font-serif text-parchment drop-shadow-xl tracking-wider">
                <span className="text-amber-500">{item.letter}</span>
                {item.word}
              </h3>
            </div>

            {/* The Scale of Justice */}
            <div className="absolute bottom-[96%] left-[71%] -translate-x-1/2 w-[80%] md:w-[85%] lg:w-[90%] z-30 flex flex-col items-center">
              <Image
                src="/images/icons/scale-of-justice-transparent.png"
                alt="Scale of Justice"
                width={300}
                height={300}
                className="w-full h-auto object-contain drop-shadow-2xl relative z-10"
              />
              <div className="absolute bottom-[2%] left-1/2 -translate-x-1/2 w-[40%] h-[8px] bg-black/80 blur-[5px] rounded-[100%] z-0"></div>
            </div>
            
            {/* The Pillar Base */}
            <Image
              src="/images/icons/ashoka-pillar-transparent.png"
              alt="Ashoka Pillar"
              width={800}
              height={1420}
              className="w-auto h-full object-contain object-bottom relative z-10"
            />
          </div>
        ))}
      </div>

    </section>
  );
}
