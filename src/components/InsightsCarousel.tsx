"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight, X } from "lucide-react";

// Extended mock data matching the reference image aesthetic
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
  const [activeCenterIndex, setActiveCenterIndex] = useState(1);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".curved-card");
      const imgWrappers = gsap.utils.toArray<HTMLElement>(".curved-img-box");

      const updateCardCurvature = () => {
        const viewportCenter = window.innerWidth / 2;
        let closestIndex = 0;
        let minDistance = Infinity;

        cards.forEach((card, index) => {
          const rect = card.getBoundingClientRect();
          const cardCenter = rect.left + rect.width / 2;
          const distance = Math.abs(cardCenter - viewportCenter);

          if (distance < minDistance) {
            minDistance = distance;
            closestIndex = index;
          }

          // Normalized ratio from -1.5 (far left) to 0 (center) to 1.5 (far right)
          const ratio = (cardCenter - viewportCenter) / (window.innerWidth * 0.35);
          const clamped = Math.max(-1.5, Math.min(1.5, ratio));
          const absRatio = Math.abs(clamped);

          // Concave Inward Edge Tapering (Perspective geometry of a cylindrical arc)
          // The outer edges of the left and right cards taper inward as they recede into the concave background
          const leftTaper = Math.max(0, -clamped) * 8.5; // percent taper on outer left
          const rightTaper = Math.max(0, clamped) * 8.5; // percent taper on outer right

          let clipPath = "";
          if (clamped < 0) {
            clipPath = `polygon(0% ${leftTaper}%, 100% 0%, 100% 100%, 0% ${100 - leftTaper}%)`;
          } else {
            clipPath = `polygon(0% 0%, 100% ${rightTaper}%, 100% ${100 - rightTaper}%, 0% 100%)`;
          }

          const imgBox = imgWrappers[index];
          if (imgBox) {
            imgBox.style.clipPath = clipPath;
          }

          // Inward Concave 3D Rotation and Depth Curvature
          // Pushes side cards backward along the Z-axis (concave bowl) and angles them inward facing center
          const isFocal = distance < window.innerWidth * 0.18;
          gsap.set(card, {
            scale: 1 - absRatio * 0.04,
            opacity: isFocal ? 1 : Math.max(0.4, 1 - absRatio * 0.3),
            rotationY: -clamped * 18, // Angled inward toward center
            z: -Math.pow(absRatio, 1.5) * 90, // Pushed backward into concave arc
            transformPerspective: 1200,
            transformOrigin: "center center",
          });
        });

        setActiveCenterIndex(closestIndex);
      };

      // Set initial frame
      updateCardCurvature();

      const getScrollDistance = () => {
        if (!trackRef.current) return 0;
        return trackRef.current.scrollWidth - window.innerWidth;
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1.2,
          start: "top top",
          end: () => `+=${getScrollDistance() + window.innerHeight * 0.8}`,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: updateCardCurvature,
        },
      });

      // Continuous horizontal movement to the right as user scrolls down
      tl.to(trackRef.current, {
        x: () => -getScrollDistance(),
        ease: "none",
      });
    }, sectionRef);

    return () => ctx.revert();
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
        className="relative w-full h-screen bg-parchment text-ink flex flex-col justify-between py-12 md:py-16 overflow-hidden select-none z-10 border-t border-gold/10"
      >
        {/* Top Header */}
        <div className="container mx-auto px-6 text-center flex-shrink-0 z-20">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-8 h-0.5 bg-gold" />
            <span className="text-xs sm:text-sm font-bold tracking-[0.3em] uppercase text-gold">
              Legal Perspectives
            </span>
            <span className="w-8 h-0.5 bg-gold" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif tracking-[0.35em] uppercase text-ink mb-3 pl-[0.35em]">
            I N S I G H T S
          </h2>
          <p className="text-base md:text-lg font-sans text-ink/70 tracking-wide max-w-lg mx-auto">
            {t("sublabel") || "Insight turns complexity into clarity at the right Momento."}
          </p>
        </div>

        {/* Continuous Horizontal Curved Ribbon Track */}
        <div className="relative w-full flex-grow flex items-center overflow-hidden my-auto [perspective:1400px]">
          <div 
            ref={trackRef} 
            className="flex items-center px-[34vw] gap-6 md:gap-10 w-max [transform-style:preserve-3d]"
          >
            {CAROUSEL_DATA.map((item, index) => {
              const isActive = activeCenterIndex === index;

              return (
                <div 
                  key={index}
                  className="curved-card relative w-[75vw] sm:w-[50vw] md:w-[32vw] lg:w-[31vw] flex flex-col items-center flex-shrink-0 cursor-pointer transition-colors duration-500 [transform-style:preserve-3d] will-change-transform"
                  onClick={() => setActiveModalIndex(index)}
                >
                  {/* Image Container with Dynamic Curved / Warped Edge */}
                  <div className="curved-img-box relative w-full h-[240px] sm:h-[280px] md:h-[320px] lg:h-[350px] overflow-hidden bg-white group shadow-xl border border-gold/15 transition-all duration-300">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 80vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      priority={index < 3}
                    />
                    <div className="absolute inset-0 bg-parchment/15 group-hover:bg-transparent transition-colors duration-500" />
                  </div>

                  {/* Title underneath (moves together as one single unit) */}
                  <div className="pt-6 md:pt-8 text-center px-4 max-w-sm">
                    <h3 className={`font-serif text-lg md:text-xl lg:text-2xl leading-snug transition-colors duration-300 ${
                      isActive ? "text-ink font-semibold drop-shadow-sm" : "text-ink/60 font-normal"
                    }`}>
                      {item.title}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Callout & "See Details" indicator */}
        <div className="container mx-auto px-6 text-center flex-shrink-0 z-20 flex flex-col items-center">
          <button
            onClick={() => setActiveModalIndex(activeCenterIndex)}
            className="group inline-flex items-center gap-3 text-xs md:text-sm font-sans tracking-widest uppercase text-ink/80 hover:text-gold transition-colors py-2"
          >
            <span className="font-bold">See Details</span>
            <span className="w-8 h-8 rounded-full border border-ink/20 group-hover:border-gold group-hover:text-gold flex items-center justify-center transition-colors bg-white/60">
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </span>
          </button>
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
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
              className="relative z-10 w-full max-w-5xl max-h-[90vh] bg-parchment text-ink rounded-2xl shadow-2xl border border-gold/30 overflow-hidden flex flex-col md:flex-row my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModalIndex(null)}
                aria-label="Close modal"
                className="absolute top-4 right-4 md:top-6 md:right-6 z-30 w-10 h-10 rounded-full bg-white/90 border border-ink/15 text-ink hover:text-gold hover:border-gold flex items-center justify-center transition-colors shadow-md"
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
                  className="group inline-flex items-center gap-3 bg-gold hover:bg-gold/90 text-ink font-bold font-sans uppercase tracking-widest px-8 py-3.5 rounded-full text-xs md:text-sm transition-all shadow-md w-fit"
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
