"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const VALUES = [
  { id: "justice", title: "Civil Litigation", description: "Comprehensive representation in civil disputes, property matters, and contractual obligations with a track record of decisive outcomes." },
  { id: "integrity", title: "Criminal Defence", description: "Vigorous defence strategy rooted in constitutional rights, ensuring every accused receives fair and competent representation." },
  { id: "excellence", title: "Family & Matrimonial", description: "Sensitive and strategic counsel in divorce, custody, maintenance, and domestic matters — protecting what matters most." },
  { id: "experience", title: "Property & Real Estate", description: "Expert guidance on land acquisition, title verification, tenancy disputes, and real estate transactions across Kerala." },
];

export default function PracticeShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const areas = VALUES;

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
          end: "+=400%", // 4 screens of scrolling duration
          anticipatePin: 1,
        },
      });

      // Initial States
      gsap.set(".pillar-0", { y: "40vh", opacity: 0 });
      gsap.set(".scale-0", { y: "-30vh", opacity: 0 });
      gsap.set(".text-0", { opacity: 0, y: 30 });

      gsap.set(".pillar-1, .pillar-2, .pillar-3", { x: "50vw", z: -600, rotationY: 45, opacity: 0 });
      gsap.set(".text-1, .text-2, .text-3", { opacity: 0, y: 30 });

      // Phase 1: Pillar 0 rises & Text 0 appears
      tl.to(".pillar-0", { y: 0, opacity: 1, duration: 1.5, ease: "power2.out" })
        .to(".text-0", { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, "<0.5");

      // Phase 2: Scale 0 drops on Pillar 0
      tl.to(".scale-0", { y: 0, opacity: 1, duration: 1.5, ease: "bounce.out" });

      // Hold Phase 0
      tl.to({}, { duration: 1 });

      // Transition 1: 0 out left, 1 in from right
      tl.to(".pillar-0", { x: "-50vw", z: -600, rotationY: -45, opacity: 0, duration: 2, ease: "power2.inOut" }, "trans1")
        .to(".text-0", { opacity: 0, y: -30, duration: 1, ease: "power2.in" }, "trans1")
        .to(".pillar-1", { x: 0, z: 0, rotationY: 0, opacity: 1, duration: 2, ease: "power2.inOut" }, "trans1")
        .to(".text-1", { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, "trans1+=1");

      // Hold Phase 1
      tl.to({}, { duration: 1 });

      // Transition 2: 1 out left, 2 in from right
      tl.to(".pillar-1", { x: "-50vw", z: -600, rotationY: -45, opacity: 0, duration: 2, ease: "power2.inOut" }, "trans2")
        .to(".text-1", { opacity: 0, y: -30, duration: 1, ease: "power2.in" }, "trans2")
        .to(".pillar-2", { x: 0, z: 0, rotationY: 0, opacity: 1, duration: 2, ease: "power2.inOut" }, "trans2")
        .to(".text-2", { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, "trans2+=1");

      // Hold Phase 2
      tl.to({}, { duration: 1 });

      // Transition 3: 2 out left, 3 in from right
      tl.to(".pillar-2", { x: "-50vw", z: -600, rotationY: -45, opacity: 0, duration: 2, ease: "power2.inOut" }, "trans3")
        .to(".text-2", { opacity: 0, y: -30, duration: 1, ease: "power2.in" }, "trans3")
        .to(".pillar-3", { x: 0, z: 0, rotationY: 0, opacity: 1, duration: 2, ease: "power2.inOut" }, "trans3")
        .to(".text-3", { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, "trans3+=1");

      // Hold Phase 3
      tl.to({}, { duration: 1 });

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
          EXPERTISE
        </h2>
      </div>

      {/* 3D PILLARS LAYER */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none" style={{ perspective: '1400px' }}>
        {areas.map((_, i) => (
          <div key={`pillar-${i}`} className={`absolute pillar-${i} flex flex-col justify-end items-center h-[55vh] md:h-[65vh] lg:h-[75vh]`}>
            {/* The Scale */}
            <div className={`absolute bottom-[96%] left-[71%] -translate-x-1/2 w-[80%] md:w-[85%] lg:w-[90%] z-30 flex flex-col items-center scale-${i}`}>
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

      {/* TEXT CONTENT LAYER */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {areas.map((area, i) => (
          <div key={`text-${i}`} className={`text-${i} absolute inset-0 flex flex-col md:flex-row items-center justify-between w-full max-w-7xl mx-auto h-full pt-24 pb-8 md:pt-0 md:pb-0`}>
            
            {/* LEFT TEXT (Title) */}
            <div className="w-full text-center md:text-right md:absolute md:top-[35%] md:left-0 md:w-[30%] px-4 md:px-12 xl:px-24 md:pr-8 flex-shrink-0">
              <h3 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif text-parchment leading-tight">
                {area.title.split(' ').map((word: string, j: number) => (
                  <span key={j} className="block drop-shadow-md">{word}</span>
                ))}
              </h3>
            </div>

            {/* RIGHT TEXT (Description) */}
            <div className="w-full text-center md:text-left md:absolute md:top-[35%] md:right-0 md:w-[30%] px-6 md:px-12 xl:px-24 md:pl-8 mt-auto md:mt-0 mb-8 md:mb-0 flex-shrink-0">
              <p className="text-base sm:text-lg lg:text-xl text-parchment/70 font-sans leading-relaxed drop-shadow-md max-w-[90%] mx-auto md:max-w-none">
                {area.description}
              </p>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
}
