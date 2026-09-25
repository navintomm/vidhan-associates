"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight, X } from "lucide-react";

const CAROUSEL_DATA = [
  {
    image: "/images/insights/insight_property_v2.jpg",
    title: "Firm Featured in Legal Press",
    category: "Media & Recognition",
    date: "August 2026",
    description: "Property disputes often involve complex historical claims and fragmented titles. A thorough understanding of local tenancy laws and inheritance frameworks is required to secure a clear title.",
  },
  {
    image: "/images/insights/insight_liberty.jpg",
    title: "Firm Recognised Among Regional Peers",
    category: "Accolades",
    date: "July 2026",
    description: "Personal liberty is a fundamental constitutional right. Bail conditions must balance the state's interest with the presumption of innocence. Understanding these nuances is critical for any accused.",
  },
  {
    image: "/images/insights/insight_divorce.jpg",
    title: "Inheritance Planning Before the Inevitable Momento",
    category: "Estate & Family",
    date: "June 2026",
    description: "Divorce proceedings under the Hindu Marriage Act require navigating emotional turbulence alongside rigid statutory requirements regarding alimony, maintenance, and child custody.",
  },
  {
    image: "/images/insights/insight_real_estate.jpg",
    title: "Title Verification Before Purchase: Due Diligence",
    category: "Real Estate",
    date: "May 2026",
    description: "Real estate transactions are fraught with risk. Due diligence and title verification ensure that buyers do not inherit encumbrances, litigation, or defective ownership from previous sellers.",
  },
  {
    image: "/images/insights/insight_property_v2.jpg",
    title: "Navigating High Court Jurisprudence in Commercial Claims",
    category: "Commercial Law",
    date: "April 2026",
    description: "A strategic overview of emerging judicial interpretations in commercial contracts and arbitration enforcement across south Indian courts.",
  }
];

export default function InsightsCarousel({ locale }: { locale: string }) {
  const t = useTranslations("home.perspectives");
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeModalIndex, setActiveModalIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;

    const sortTriggers = () => ScrollTrigger.sort();
    ScrollTrigger.addEventListener("refreshInit", sortTriggers);

    const ctx = gsap.context(() => {
      const getScrollDistance = () => {
        if (!trackRef.current) return 0;
        // The total scrollable width minus the viewport width
        return trackRef.current.scrollWidth - window.innerWidth;
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1, // Smooth interpolation
          start: "top top",
          end: () => `+=${getScrollDistance()}`,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Linear, clean horizontal slide
      tl.to(trackRef.current, {
        x: () => -getScrollDistance(),
        ease: "none",
      });

    }, sectionRef);

    return () => {
      ScrollTrigger.removeEventListener("refreshInit", sortTriggers);
      ctx.revert();
    };
  }, []);

  // Lock body scroll when modal is active
  useEffect(() => {
    if (activeModalIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeModalIndex]);

  return (
    <>
      <section 
        ref={sectionRef} 
        className="relative w-full h-[100svh] min-h-[600px] bg-parchment text-ink flex flex-col justify-center pt-24 pb-12 md:pt-32 md:pb-16 overflow-hidden select-none z-10 border-t border-gold/10"
      >
        {/* Top Header */}
        <div className="container mx-auto px-6 lg:px-12 flex-shrink-0 z-20 flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-0.5 bg-gold" />
              <span className="text-xs sm:text-sm font-bold tracking-[0.3em] uppercase text-gold">
                Legal Perspectives
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-serif tracking-wide text-ink">
              Insights & Updates
            </h2>
          </div>
          <p className="text-base md:text-lg font-sans text-ink/70 max-w-md">
            {t("sublabel") || "Insight turns complexity into clarity at the right moment."}
          </p>
        </div>

        {/* Clean Editorial Horizontal Track */}
        <div className="relative w-full flex items-center overflow-visible">
          <div 
            ref={trackRef} 
            className="flex items-start px-6 lg:px-12 gap-8 md:gap-12 w-max"
          >
            {CAROUSEL_DATA.map((item, index) => (
              <div 
                key={index}
                className="relative w-[85vw] sm:w-[50vw] md:w-[35vw] lg:w-[28vw] flex-shrink-0"
              >
                <div 
                  className="w-full flex flex-col cursor-pointer group"
                  onClick={() => setActiveModalIndex(index)}
                >
                  <div className="relative w-full aspect-[3/2] overflow-hidden bg-slate/5 mb-5 rounded-sm">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 85vw, 30vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      priority={index < 3}
                    />
                    {/* Subtle Overlay */}
                    <div className="absolute inset-0 bg-ink/5 group-hover:bg-transparent transition-colors duration-500" />
                  </div>
                  
                  <div className="flex flex-col gap-2.5">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-bold tracking-widest uppercase text-gold">
                        {item.category}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-gold/50" />
                      <span className="text-[10px] font-medium tracking-wider uppercase text-ink/50">
                        {item.date}
                      </span>
                    </div>
                    <h3 className="font-serif text-xl md:text-2xl leading-snug text-ink group-hover:text-gold transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPANDED EDITORIAL DETAIL MODAL */}
      <AnimatePresence>
        {activeModalIndex !== null && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6 md:p-12 lg:p-20">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 bg-ink/70 backdrop-blur-md"
              onClick={() => setActiveModalIndex(null)}
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
              className="relative z-10 w-full max-w-5xl max-h-[90vh] bg-parchment text-ink rounded-sm shadow-2xl overflow-hidden flex flex-col md:flex-row my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModalIndex(null)}
                aria-label="Close modal"
                className="absolute top-4 right-4 md:top-6 md:right-6 z-30 w-10 h-10 rounded-full bg-white/90 text-ink hover:text-gold hover:bg-white flex items-center justify-center transition-colors shadow-md"
              >
                <X size={20} />
              </button>

              {/* Modal Left: Image */}
              <div className="relative w-full md:w-1/2 h-[260px] sm:h-[320px] md:h-auto min-h-[300px]">
                <Image
                  src={CAROUSEL_DATA[activeModalIndex].image}
                  alt={CAROUSEL_DATA[activeModalIndex].title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Modal Right: Article Description */}
              <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-14 flex flex-col justify-center overflow-y-auto">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-bold tracking-widest uppercase text-gold">
                    {CAROUSEL_DATA[activeModalIndex].category}
                  </span>
                  <span className="text-ink/30">•</span>
                  <span className="text-xs font-medium tracking-wider uppercase text-ink/50">
                    {CAROUSEL_DATA[activeModalIndex].date}
                  </span>
                </div>

                <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-ink leading-tight mb-6">
                  {CAROUSEL_DATA[activeModalIndex].title}
                </h2>

                <div className="w-12 h-0.5 bg-gold mb-6" />

                <p className="text-base md:text-lg text-ink/75 font-sans leading-relaxed mb-8">
                  {CAROUSEL_DATA[activeModalIndex].description}
                </p>

                <a
                  href={`/${locale}/blog`}
                  className="group inline-flex items-center gap-3 bg-ink hover:bg-ink/90 text-parchment font-bold font-sans uppercase tracking-widest px-8 py-3.5 rounded-sm text-xs md:text-sm transition-all shadow-md w-fit"
                >
                  <span>Read Full Article</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
