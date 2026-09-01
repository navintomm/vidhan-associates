"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

// Extended mock data with curated legal editorial imagery
const CAROUSEL_DATA = [
  {
    image: "/images/insights/insight_property_v2.jpg",
    description: "Property disputes often involve complex historical claims and fragmented titles. A thorough understanding of local tenancy laws and inheritance frameworks is required to secure a clear title.",
  },
  {
    image: "/images/insights/insight_liberty.jpg",
    description: "Personal liberty is a fundamental constitutional right. Bail conditions must balance the state's interest with the presumption of innocence. Understanding these nuances is critical for any accused.",
  },
  {
    image: "/images/insights/insight_divorce.jpg",
    description: "Divorce proceedings under the Hindu Marriage Act require navigating emotional turbulence alongside rigid statutory requirements regarding alimony, maintenance, and child custody.",
  },
  {
    image: "/images/insights/insight_real_estate.jpg",
    description: "Real estate transactions are fraught with risk. Due diligence and title verification ensure that buyers do not inherit encumbrances, litigation, or defective ownership from previous sellers.",
  },
];

const TRANSITION_CONFIG = {
  duration: 1.3,
  ease: [0.76, 0, 0.24, 1], // Smooth editorial luxury easing
};

export default function InsightsCarousel({ locale }: { locale: string }) {
  const t = useTranslations("home.perspectives");
  const posts = t.raw("posts") as Array<{
    category: string;
    title: string;
    date: string;
  }>;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeModalIndex, setActiveModalIndex] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const total = posts.length;

  const mergedPosts = posts.map((post, i) => ({
    ...post,
    ...CAROUSEL_DATA[i % CAROUSEL_DATA.length],
  }));

  // Detect mobile / screen resizing
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Next / Prev navigation
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Auto-advance every 3.8 seconds when not hovered and modal not open
  useEffect(() => {
    if (isHovered || activeModalIndex !== null) return;
    const interval = setInterval(nextSlide, 3800);
    return () => clearInterval(interval);
  }, [nextSlide, isHovered, activeModalIndex]);

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

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeModalIndex !== null) {
        if (e.key === "Escape") setActiveModalIndex(null);
        return;
      }
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide, activeModalIndex]);

  // Helper to calculate circular relative offset (-1: Left, 0: Center, 1: Right, etc.)
  const getOffset = (index: number) => {
    let diff = (index - currentIndex) % total;
    if (diff < -Math.floor(total / 2)) diff += total;
    if (diff > Math.floor(total / 2)) diff -= total;
    return diff;
  };

  return (
    <>
      <section 
        className="bg-parchment py-28 md:py-36 overflow-hidden border-t border-gold/10 relative z-10 select-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Section Header */}
        <div className="container mx-auto px-6 lg:px-12 mb-16 md:mb-20 flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-0.5 bg-gold" />
            <span className="text-gold tracking-[0.3em] uppercase text-xs md:text-sm font-bold">
              Legal Perspectives
            </span>
            <span className="w-8 h-0.5 bg-gold" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-ink tracking-tight mb-4">
            Insights
          </h2>
          <p className="text-base md:text-lg lg:text-xl font-sans text-ink/70 max-w-xl leading-relaxed">
            {t("sublabel")}
          </p>
        </div>

        {/* 3-Item Horizontal Editorial Filmstrip Carousel Container */}
        <div className="relative w-full h-[460px] md:h-[520px] flex items-center justify-center overflow-visible">
          <div className="relative w-full h-full flex items-center justify-center">
            {mergedPosts.map((post, index) => {
              const offset = getOffset(index);
              const isCenter = offset === 0;
              const isLeft = offset === -1;
              const isRight = offset === 1;
              const isVisible = Math.abs(offset) <= 1;

              // Responsive horizontal translation offsets
              const xOffsetDesktop = offset * 33.5; // percentage in vw
              const xOffsetMobile = offset * 76;

              // Curved / Warped Edge Clip-Path based on physical position
              let clipPathStyle = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";
              if (isLeft) {
                // Left card curves outward on the left edge
                clipPathStyle = "polygon(0% 4%, 100% 0%, 100% 100%, 0% 96%)";
              } else if (isRight) {
                // Right card curves outward on the right edge
                clipPathStyle = "polygon(0% 0%, 100% 4%, 100% 96%, 0% 100%)";
              } else if (isCenter) {
                // Center card has a balanced subtle barrel contour
                clipPathStyle = "polygon(0% 0.5%, 100% 0.5%, 100% 99.5%, 0% 99.5%)";
              }

              return (
                <motion.div
                  key={index}
                  className="absolute top-0 flex flex-col items-center cursor-pointer"
                  style={{
                    width: isMobile ? "74vw" : "31.5vw",
                    pointerEvents: isVisible ? "auto" : "none",
                  }}
                  initial={false}
                  animate={{
                    x: isMobile ? `${xOffsetMobile}vw` : `${xOffsetDesktop}vw`,
                    scale: isCenter ? 1 : 0.96,
                    opacity: isCenter ? 1 : isVisible ? 0.82 : 0,
                    rotate: isCenter ? 0 : isLeft ? -1.8 : isRight ? 1.8 : 0,
                    zIndex: isCenter ? 30 : isVisible ? 20 : 10,
                  }}
                  transition={TRANSITION_CONFIG}
                  onClick={() => {
                    if (isLeft) prevSlide();
                    else if (isRight) nextSlide();
                    else if (isCenter) setActiveModalIndex(index);
                  }}
                >
                  {/* Image Container with Distinctive Warped Editorial Edges */}
                  <div
                    className="relative w-full h-[250px] sm:h-[280px] md:h-[330px] lg:h-[350px] rounded-2xl overflow-hidden shadow-sm transition-all duration-700 bg-slate/5 group"
                    style={{
                      clipPath: clipPathStyle,
                      transition: "clip-path 1.3s cubic-bezier(0.76, 0, 0.24, 1)",
                    }}
                  >
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 80vw, 33vw"
                      className={`object-cover transition-transform duration-700 ${
                        isCenter ? "group-hover:scale-105" : ""
                      }`}
                      priority={isVisible}
                    />

                    {/* Subtle Overlay to enhance center prominence */}
                    <div
                      className={`absolute inset-0 transition-colors duration-700 ${
                        isCenter
                          ? "bg-transparent group-hover:bg-ink/5"
                          : "bg-parchment/30"
                      }`}
                    />

                    {/* Category pill on center card */}
                    {isCenter && (
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-gold/30 text-[11px] font-bold tracking-widest uppercase text-gold shadow-sm">
                        {post.category}
                      </div>
                    )}

                    {/* Active center hover badge */}
                    {isCenter && (
                      <div className="absolute bottom-4 right-4 bg-ink/90 text-gold rounded-full w-10 h-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md">
                        <ArrowRight size={16} />
                      </div>
                    )}
                  </div>

                  {/* Title & Date (Moving as ONE Single Unit with Image) */}
                  <div className="w-full pt-5 md:pt-7 text-center px-3">
                    <p className={`text-xs font-sans tracking-widest uppercase mb-1.5 transition-colors duration-500 ${
                      isCenter ? "text-gold font-bold" : "text-gold/50 font-medium"
                    }`}>
                      {post.date}
                    </p>
                    <h3
                      className={`font-serif leading-snug transition-all duration-500 line-clamp-2 ${
                        isCenter
                          ? "text-xl sm:text-2xl md:text-3xl text-ink font-semibold"
                          : "text-lg sm:text-xl md:text-2xl text-ink/65 font-normal"
                      }`}
                    >
                      {post.title}
                    </h3>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Carousel Controls & Pagination */}
        <div className="container mx-auto px-6 mt-12 md:mt-16 flex items-center justify-between max-w-xs md:max-w-sm mx-auto">
          {/* Prev Button */}
          <button
            onClick={prevSlide}
            aria-label="Previous Insight"
            className="w-11 h-11 rounded-full border border-ink/20 hover:border-gold hover:text-gold flex items-center justify-center text-ink transition-colors bg-white/80 shadow-sm group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
          </button>

          {/* Indicator Counter & Dots */}
          <div className="flex items-center gap-2">
            {mergedPosts.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`transition-all duration-500 rounded-full ${
                  currentIndex === i
                    ? "w-8 h-2 bg-gold"
                    : "w-2 h-2 bg-ink/20 hover:bg-ink/40"
                }`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            aria-label="Next Insight"
            className="w-11 h-11 rounded-full border border-ink/20 hover:border-gold hover:text-gold flex items-center justify-center text-ink transition-colors bg-white/80 shadow-sm group"
          >
            <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
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
              className="relative z-10 w-full max-w-5xl max-h-[90vh] bg-parchment rounded-2xl shadow-2xl border border-gold/30 overflow-hidden flex flex-col md:flex-row my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModalIndex(null)}
                aria-label="Close modal"
                className="absolute top-4 right-4 md:top-6 md:right-6 z-30 w-10 h-10 rounded-full bg-white/90 border border-ink/20 text-ink hover:text-gold hover:border-gold flex items-center justify-center transition-colors shadow-md"
              >
                <X size={20} />
              </button>

              {/* Modal Left: Image */}
              <div className="relative w-full md:w-1/2 h-[260px] sm:h-[320px] md:h-auto min-h-[300px]">
                <Image
                  src={mergedPosts[activeModalIndex].image}
                  alt={mergedPosts[activeModalIndex].title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Modal Right: Article Description */}
              <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-14 flex flex-col justify-center overflow-y-auto">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-bold tracking-widest uppercase text-gold">
                    {mergedPosts[activeModalIndex].category}
                  </span>
                  <span className="text-ink/30">•</span>
                  <span className="text-xs font-medium tracking-wider uppercase text-ink/50">
                    {mergedPosts[activeModalIndex].date}
                  </span>
                </div>

                <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-ink leading-tight mb-6">
                  {mergedPosts[activeModalIndex].title}
                </h2>

                <div className="w-12 h-0.5 bg-gold mb-6" />

                <p className="text-base md:text-lg text-ink/75 font-sans leading-relaxed mb-8">
                  {mergedPosts[activeModalIndex].description}
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
