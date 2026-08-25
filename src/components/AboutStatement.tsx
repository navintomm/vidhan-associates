"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const STATEMENTS = [
  "act with precision.",
  "think beyond the obvious.",
  "represent with conviction.",
  "pursue what matters.",
  "stand beside you.",
];

export default function AboutStatement() {
  const containerRef = useRef<HTMLElement>(null);
  const textWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const phrases = gsap.utils.toArray(".dynamic-phrase") as HTMLElement[];

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${STATEMENTS.length * 80}%`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      phrases.forEach((phrase, i) => {
        if (i > 0) {
          // Entering animation (overlapping perfectly with previous phrase's exit)
          tl.fromTo(phrase, 
            { opacity: 0, y: 60 },
            { opacity: 1, y: 0, duration: 1.2, ease: "power3.inOut" },
            "<"
          );
        }

        if (i !== phrases.length - 1) {
          // Exiting animation (runs after this phrase has been visible)
          tl.to(phrase, {
            opacity: 0,
            y: -60,
            duration: 1.2,
            ease: "power3.inOut",
          }, "+=3");
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="h-screen w-full bg-ink flex items-center justify-center overflow-hidden border-t border-gold/10"
    >
      <div className="flex items-center gap-4 lg:gap-6 text-3xl md:text-5xl lg:text-7xl xl:text-[5.5rem] font-serif text-parchment px-6">
        {/* Fixed word */}
        <span className="font-bold flex-shrink-0 text-gold">WE</span>
        
        {/* Dynamic wrapper */}
        <div className="relative h-[1.2em] w-[260px] md:w-[450px] lg:w-[650px] xl:w-[800px] flex items-center overflow-visible">
          {STATEMENTS.map((stmt, i) => (
            <span
              key={i}
              className={`dynamic-phrase absolute left-0 top-0 h-full flex items-center w-full whitespace-nowrap ${i === 0 ? 'opacity-100' : 'opacity-0'}`}
              style={{ transform: i === 0 ? "translateY(0)" : "translateY(60px)" }}
            >
              {stmt}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
