"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const VALUES: { id: string; title: string; description: string; iconUrl?: string }[] = [
  { id: "justice", title: "Justice", description: "Unwavering commitment to fairness and equity." },
  { id: "integrity", title: "Integrity", description: "Upholding the highest ethical standards in all matters." },
  { id: "excellence", title: "Excellence", description: "Delivering exceptional legal counsel and representation." },
  { id: "experience", title: "Experience", description: "Decades of proven expertise across practice areas." },
];

export default function PracticeShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [step, setStep] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const areas = VALUES;

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // 3s stationary + 1.6s transition = 4.6s loop
    const interval = setInterval(() => {
      setStep((prev) => prev + 1);
    }, 4600);
    return () => clearInterval(interval);
  }, []);

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

      return () => {
        tl.kill();
      };
    });

    return () => mm.revert();
  }, [isReducedMotion]);

  const positions = [
    { transform: `translateX(0vw) scale(1) rotateY(0deg)`, opacity: 1, zIndex: 3 }, // 0: Center
    { transform: `translateX(${isMobile ? '35vw' : '40vw'}) scale(0.78) rotateY(5deg)`, opacity: 0.65, zIndex: 2 }, // 1: Right
    { transform: `translateX(${isMobile ? '65vw' : '75vw'}) scale(0.6) rotateY(0deg)`, opacity: 0, zIndex: 1 }, // 2: Far Right
    { transform: `translateX(${isMobile ? '-65vw' : '-75vw'}) scale(0.6) rotateY(0deg)`, opacity: 0, zIndex: 1 }, // 3: Far Left
    { transform: `translateX(${isMobile ? '-35vw' : '-40vw'}) scale(0.78) rotateY(-5deg)`, opacity: 0.65, zIndex: 2 }, // 4: Left
  ];

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
          className="flex h-full w-[400vw]"
        >
          {areas.map((value, index) => (
            <div 
              key={value.id}
              className="horizontal-panel relative w-screen h-full flex flex-col items-center justify-end pb-0"
            >
              {/* Unit Container */}
              <div className="relative flex flex-col items-center justify-between w-full max-w-7xl mx-auto h-[100vh] pt-24 pb-8 md:pt-0 md:pb-0 md:h-[85vh] md:justify-end overflow-hidden">

                {/* MOBILE TITLE / DESKTOP LEFT */}
                <div className="w-full text-center md:text-right md:absolute md:top-[25%] md:left-0 md:w-[30%] px-4 md:px-12 xl:px-24 md:pr-8 z-20 order-1 md:order-none flex-shrink-0">
                  <h3 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif text-parchment leading-tight">
                    {value.title.split(' ').map((word: string, j: number) => (
                      <span key={j} className="block drop-shadow-md">{word}</span>
                    ))}
                  </h3>
                </div>

                {/* MOBILE DESCRIPTION / DESKTOP RIGHT */}
                <div className="w-full text-center md:text-left md:absolute md:top-[25%] md:right-0 md:w-[30%] px-6 md:px-12 xl:px-24 md:pl-8 z-20 order-2 md:order-none mt-4 md:mt-0 flex-shrink-0">
                  {value.iconUrl && (
                    <div className="mb-4 w-12 h-12 relative mx-auto md:mx-0 opacity-50 pillar-parallax">
                      <Image src={value.iconUrl} alt={value.title} fill className="object-contain" />
                    </div>
                  )}
                  <p className="text-base sm:text-lg lg:text-xl text-parchment/70 font-sans leading-relaxed drop-shadow-md max-w-[90%] mx-auto md:max-w-none">
                    {value.description}
                  </p>
                </div>

                {/* SPACER FOR CENTRAL FOCAL POINT */}
                <div className="flex-1 w-full order-3 md:order-none min-h-[30vh]"></div>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3D Pillar Carousel - Fixed behind content */}
      <div 
        className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none" 
        style={{ perspective: '1400px' }}
      >
        {[0, 1, 2, 3, 4].map((i) => {
          const posIdx = (i - (step % 5) + 5) % 5;
          const pos = positions[posIdx];
          
          return (
             <div 
               key={i}
               className="absolute transition-all duration-[1600ms]"
               style={{
                 transform: pos.transform,
                 opacity: pos.opacity,
                 zIndex: pos.zIndex,
                 // custom cubic bezier for the luxurious cinematic feel
                 transitionTimingFunction: 'cubic-bezier(0.76, 0, 0.24, 1)'
               }}
             >
                <div className="relative flex flex-col justify-end items-center h-[55vh] md:h-[65vh] lg:h-[75vh]">
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
                    <Image
                      src="/images/icons/ashoka-pillar-transparent.png"
                      alt="Ashoka Pillar"
                      width={800}
                      height={1420}
                      className="w-auto h-full object-contain object-bottom relative z-10"
                    />
                </div>
             </div>
          )
        })}
      </div>

    </section>
  );
}
