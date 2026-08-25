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

    mm.add("(min-width: 1024px)", () => {
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
      panels.forEach((panel: any) => {
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

  // We use slightly smaller height so the scale above it doesn't hit the navbar
  const heights = [
    "h-[50vh] lg:h-[55vh]",
    "h-[50vh] lg:h-[55vh]",
    "h-[50vh] lg:h-[55vh]",
    "h-[50vh] lg:h-[55vh]",
  ];

  return (
    <section ref={sectionRef} className="relative bg-ink overflow-hidden">
      
      {/* BACKGROUND WATERMARK - Fixed during scroll */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
        <h2 className="text-[25vw] font-serif uppercase tracking-wide-xl text-parchment/[0.02] whitespace-nowrap select-none">
          EXPERTISE
        </h2>
      </div>

      {/* DESKTOP VIEW (Horizontal Scroll Track) */}
      <div className="hidden lg:block h-screen relative z-10 w-full overflow-hidden">
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
              <div className="relative flex flex-col items-center justify-end w-full max-w-7xl mx-auto h-[85vh]">
                
                {/* TEXT LAYER (Absolute positioned to float perfectly beside the scale without affecting its center alignment) */}
                <div className="absolute top-[25%] w-full flex justify-between px-12 xl:px-24 z-20 pointer-events-none">
                  <div className="w-[30%] text-right pr-8">
                    <h3 className="text-4xl lg:text-5xl font-serif text-parchment leading-tight">
                      {val.title.split(' ').map((word, j) => (
                        <span key={j} className="block drop-shadow-md">{word}</span>
                      ))}
                    </h3>
                  </div>
                  <div className="w-[30%] text-left pl-8">
                    <p className="text-base text-parchment/70 font-sans leading-relaxed drop-shadow-md">
                      {val.description}
                    </p>
                  </div>
                </div>

                {/* VISUAL STACK: Scale -> Pillar */}
                {/* Clean stack. Translate-y kisses the rim of the capital, translate-x adjusts for asymmetrical padding in the PNG */}
                <div className="relative z-30 flex flex-col items-center justify-end w-full translate-y-4 lg:translate-y-6 translate-x-12 lg:translate-x-16">
                  <Image
                    src="/images/icons/scale-of-justice-transparent.png"
                    alt="Scale of Justice"
                    width={300}
                    height={300}
                    className="relative z-10 w-[180px] lg:w-[260px] h-auto object-contain drop-shadow-2xl"
                  />
                  {/* Contact Shadow */}
                  <div className="absolute bottom-[2%] w-[120px] lg:w-[150px] h-[8px] lg:h-[12px] bg-black/90 blur-md rounded-[100%] z-0"></div>
                </div>

                <div className="relative z-10 flex justify-center w-full">
                  <Image
                    src="/images/icons/ashoka-pillar-transparent.png"
                    alt="Ashoka Pillar"
                    width={800}
                    height={1420}
                    className={`w-auto object-contain object-bottom ${heights[i]}`}
                    priority={i === 0}
                  />
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MOBILE VIEW (Static stacked layout) */}
      <div className="lg:hidden flex flex-col gap-24 relative z-10 w-full py-24 px-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-serif text-parchment">EXPERTISE</h2>
        </div>
        
        {VALUES.map((val) => (
          <div key={val.id} className="flex flex-col items-center text-center gap-8">
            <div className="relative flex flex-col items-center justify-end h-[35vh]">
              <div className="relative z-20 flex flex-col items-center justify-end translate-y-2 translate-x-6">
                <Image
                  src="/images/icons/scale-of-justice-transparent.png"
                  alt="Scale of Justice"
                  width={200}
                  height={200}
                  className="relative z-10 w-[140px] h-auto object-contain drop-shadow-2xl"
                />
                {/* Mobile Contact Shadow */}
                <div className="absolute bottom-[2%] w-[80px] h-[6px] bg-black/90 blur-sm rounded-[100%] z-0"></div>
              </div>
              <div className="relative z-10">
                <Image
                  src="/images/icons/ashoka-pillar-transparent.png"
                  alt="Ashoka Pillar"
                  width={400}
                  height={710}
                  className="h-[25vh] w-auto object-contain object-bottom opacity-80"
                />
              </div>
            </div>
            
            <div className="px-4">
              <h3 className="text-2xl font-serif text-parchment mb-4 whitespace-pre-line">{val.title}</h3>
              <p className="text-sm text-parchment/60 font-sans leading-relaxed">
                {val.description}
              </p>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
