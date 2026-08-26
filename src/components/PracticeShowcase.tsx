"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const VALUES = [
  { id: "justice", title: "Justice", description: "Unwavering commitment to fairness and equity." },
  { id: "integrity", title: "Integrity", description: "Upholding the highest ethical standards in all matters." },
  { id: "excellence", title: "Excellence", description: "Delivering exceptional legal counsel and representation." },
  { id: "experience", title: "Experience", description: "Decades of proven expertise across practice areas." },
];

export default function PracticeShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

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
      if (!sectionRef.current || !trackRef.current) return;

      const panels = gsap.utils.toArray(".horizontal-panel");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${trackRef.current?.offsetWidth || 0}`,
          anticipatePin: 1,
        },
      });

      // Horizontal translation
      tl.to(trackRef.current, {
        xPercent: -100 * (panels.length - 1) / panels.length,
        ease: "none",
      });

      // Add subtle parallax to elements inside the panels
      (panels as HTMLElement[]).forEach((panel) => {
        const pillar = panel.querySelector('.pillar-parallax');

        // Make the pillar drift slightly opposite to scroll to create depth
        if (pillar) {
          gsap.to(pillar, {
            x: 100, // moves right slightly as track moves left
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: () => `+=${trackRef.current?.offsetWidth || 0}`,
              scrub: 1,
            }
          });
        }
      });

      return () => {
        tl.kill();
      };
    });

    return () => mm.revert();
  }, [isReducedMotion]);

  return (
    <section ref={sectionRef} className="relative bg-ink overflow-hidden">

      {/* BACKGROUND WATERMARK - Fixed during scroll */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
        <h2 className="text-[15vw] lg:text-[18vw] font-serif uppercase tracking-widest text-parchment/[0.02] whitespace-nowrap select-none">
          EXPERTISE
        </h2>
      </div>

      {/* UNIFIED VIEW (Horizontal Scroll Track) */}
      <div className="h-screen relative z-10 w-full overflow-hidden">
        <div
          ref={trackRef}
          className="flex h-full"
          style={{ width: `${VALUES.length * 100}vw` }}
        >
          {VALUES.map((val, i) => (
            <div
              key={val.id}
              className="horizontal-panel relative w-screen h-full flex flex-col items-center justify-end pb-0"
            >
              {/* Unit Container */}
              <div className="relative flex flex-col items-center justify-between w-full max-w-7xl mx-auto h-[100vh] pt-24 pb-8 md:pt-0 md:pb-0 md:h-[85vh] md:justify-end overflow-hidden">

                {/* MOBILE TITLE / DESKTOP LEFT */}
                <div className="w-full text-center md:text-right md:absolute md:top-[25%] md:left-0 md:w-[30%] px-4 md:px-12 xl:px-24 md:pr-8 z-20 order-1 md:order-none flex-shrink-0">
                  <h3 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif text-parchment leading-tight">
                    {val.title.split(' ').map((word, j) => (
                      <span key={j} className="block drop-shadow-md">{word}</span>
                    ))}
                  </h3>
                </div>

                {/* MOBILE DESCRIPTION / DESKTOP RIGHT */}
                <div className="w-full text-center md:text-left md:absolute md:top-[25%] md:right-0 md:w-[30%] px-6 md:px-12 xl:px-24 md:pl-8 z-20 order-2 md:order-none mt-4 md:mt-0 flex-shrink-0">
                  <p className="text-base sm:text-lg lg:text-xl text-parchment/70 font-sans leading-relaxed drop-shadow-md max-w-[90%] mx-auto md:max-w-none">
                    {val.description}
                  </p>
                </div>

                {/* VISUAL STACK */}
                <div className="flex-1 flex flex-col justify-end items-center relative z-10 w-full order-3 md:order-none mb-4 md:mb-0">
                  
                  {/* Unified Visual Object (Bounding box defined by pillar) */}
                  <div className="relative inline-block h-[45vh] lg:h-[55vh]">
                    
                    {/* Scale of Justice centered on axis with manual visual correction for PNG asymmetry */}
                    <div className="absolute bottom-[96%] left-1/2 translate-x-[calc(-50%+32px)] lg:translate-x-[calc(-50%+62px)] w-[130px] lg:w-[260px] z-30 flex flex-col items-center">
                      <Image
                        src="/images/icons/scale-of-justice-transparent.png"
                        alt="Scale of Justice"
                        width={300}
                        height={300}
                        className="w-full h-auto object-contain drop-shadow-2xl relative z-10"
                      />
                      {/* Contact Shadow */}
                      <div className="absolute bottom-[2%] left-1/2 -translate-x-1/2 w-[40%] h-[8px] bg-black/80 blur-[5px] rounded-[100%] z-0"></div>
                    </div>

                    {/* Ashoka Pillar (Defines the width of the wrapper) */}
                    <Image
                      src="/images/icons/ashoka-pillar-transparent.png"
                      alt="Ashoka Pillar"
                      width={800}
                      height={1420}
                      className="w-auto h-full object-contain object-bottom relative z-10"
                      priority={i === 0}
                    />

                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
