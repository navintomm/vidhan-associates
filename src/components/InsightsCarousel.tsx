"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight, X } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Extended mock data with Unsplash images matching the Momento aesthetic
const CAROUSEL_DATA = [
 {
 image: "/images/insights/insight_property_v2.jpg",
 description: "Property disputes often involve complex historical claims and fragmented titles. A thorough understanding of local tenancy laws and inheritance frameworks is required to secure a clear title.",
 },
 {
 image: "/images/insights/insight_liberty.jpg",
 description: "Personal liberty is a fundamental right. Bail conditions must balance the state's interest with the presumption of innocence. Understanding these nuances is critical for any accused.",
 },
 {
 image: "/images/insights/insight_divorce.jpg",
 description: "Divorce proceedings under the Hindu Marriage Act require navigating emotional turbulence alongside rigid legal requirements regarding alimony, maintenance, and child custody.",
 },
 {
 image: "/images/insights/insight_real_estate.jpg",
 description: "Real estate transactions are fraught with risk. Title verification ensures that buyers do not inherit encumbrances, litigation, or defective ownership from previous sellers.",
 },
];

export default function InsightsCarousel({ locale }: { locale: string }) {
 const t = useTranslations("home.perspectives");
 const posts = t.raw("posts") as Array<{
 category: string;
 title: string;
 date: string;
 }>;
 const sectionRef = useRef<HTMLElement>(null);
 const trackRef = useRef<HTMLDivElement>(null);
 
 const [activeCard, setActiveCard] = useState<number | null>(null);
 const [isReducedMotion, setIsReducedMotion] = useState(false);
 const [isDesktop, setIsDesktop] = useState(true);

 const mergedPosts = posts.map((post, i) => ({
 ...post,
 ...CAROUSEL_DATA[i % CAROUSEL_DATA.length]
 }));

 // Handle system preference and screen size
 useEffect(() => {
 setIsDesktop(window.innerWidth >= 1024);
 const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
 window.addEventListener("resize", handleResize);

 const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
 setIsReducedMotion(mediaQuery.matches);
 const handleMotionChange = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
 mediaQuery.addEventListener("change", handleMotionChange);

 return () => {
 window.removeEventListener("resize", handleResize);
 mediaQuery.removeEventListener("change", handleMotionChange);
 };
 }, []);

 // GSAP Horizontal Scroll Logic with Coverflow
 useEffect(() => {
 const mm = gsap.matchMedia();

 mm.add("all", () => {
 if (!sectionRef.current || !trackRef.current) return;

 const cards = gsap.utils.toArray<HTMLElement>(".insight-card");

 const updateCoverflow = () => {
 cards.forEach((card) => {
 const rect = card.getBoundingClientRect();
 const cardCenter = rect.left + rect.width / 2;
 const viewportCenter = window.innerWidth / 2;
 
 // Distance from center (-1 to 1)
 const ratio = (cardCenter - viewportCenter) / (window.innerWidth / 2);
 const clampedRatio = Math.max(-1, Math.min(1, ratio));
 
 // Apply dramatic Scale, Opacity, and 3D Rotation
 gsap.set(card, {
 scale: 1 - Math.abs(clampedRatio) * 0.4, // 1 -> 0.6
 opacity: 1 - Math.abs(clampedRatio) * 0.8, // 1 -> 0.2
 rotationY: -clampedRatio * 45, // Dramatic 3D curve
 transformPerspective: 800,
 transformOrigin: "center center"
 });
 });
 };

 // Run once to set initial state
 updateCoverflow();
 window.addEventListener("scroll", updateCoverflow);
 
 const getScrollAmount = () => {
 if (!trackRef.current) return 0;
 return -(trackRef.current.scrollWidth - window.innerWidth);
 };

 const tl = gsap.timeline({
 scrollTrigger: {
 trigger: sectionRef.current,
 pin: true,
 scrub: 1,
 start: "top top",
 end: () => `+=${trackRef.current ? trackRef.current.scrollWidth - window.innerWidth : 0}`,
 anticipatePin: 1,
 invalidateOnRefresh: true,
 onUpdate: updateCoverflow,
 },
 });

 tl.to(trackRef.current, {
 x: getScrollAmount,
 ease: "none",
 });

 return () => {
 tl.kill();
 window.removeEventListener("scroll", updateCoverflow);
 };
 });

 return () => mm.revert();
 }, [isReducedMotion]);

 // Lock body scroll when modal is active
 useEffect(() => {
 if (activeCard !== null) {
 document.body.style.overflow = "hidden";
 } else {
 document.body.style.overflow = "";
 }
 return () => { document.body.style.overflow = ""; };
 }, [activeCard]);

 return (
 <>
 <section ref={sectionRef} className="bg-parchment py-24 md:py-0 md:h-screen flex flex-col justify-center overflow-hidden border-t border-gold/10 relative z-10">
 
 {/* Section Header */}
 <div className="container mx-auto px-6 lg:px-12 mb-16 flex flex-col items-center justify-center text-center flex-shrink-0">
 <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif tracking-[0.5em] uppercase text-ink mb-6 drop-shadow-md pl-[0.5em]">
 INSIGHTS
 </h2>
 <p className="text-base md:text-lg lg:text-xl font-serif text-ink/80 max-w-lg">
 {t("sublabel")}
 </p>
 </div>

 {/* Universal Carousel */}
 <div className="relative w-full h-[60vh] flex-shrink-0 overflow-hidden">
 <div 
 ref={trackRef} 
 className="flex h-full px-[7.5vw] lg:px-[30vw] gap-6 md:gap-8 items-center w-max"
 >
 {mergedPosts.map((post, i) => (
 <div 
 key={`carousel-${i}`} 
 className="insight-card relative w-[85vw] lg:w-[40vw] flex flex-col group cursor-pointer"
 onClick={() => setActiveCard(i)}
 >
 <motion.div 
 layoutId={isDesktop ? `image-container-${i}` : `image-container-mobile-${i}`}
 className="relative w-full aspect-video overflow-hidden border border-gold/10"
 >
 <motion.div 
 layoutId={isDesktop ? `image-${i}` : `image-mobile-${i}`}
 className="absolute inset-0"
 >
 <Image
 src={post.image}
 alt={post.title}
 fill
 className="object-cover transition-transform duration-700 group-hover:scale-105"
 />
 </motion.div>
 <div className="absolute inset-0 bg-parchment/40 group-hover:bg-transparent transition-colors duration-500" />
 
 {/* Click affordance */}
 <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 w-10 h-10 md:w-12 md:h-12 rounded-full border border-gold/30 bg-parchment/80 backdrop-blur-sm flex items-center justify-center opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 transform lg:translate-y-4 lg:group-hover:translate-y-0">
 <ArrowRight size={18} className="text-gold" />
 </div>
 </motion.div>

 <div className="pt-6 md:pt-8 text-center px-4">
 <h3 className="text-lg md:text-xl lg:text-2xl font-serif text-ink/90 leading-snug group-hover:text-gold transition-colors">
 {post.title}
 </h3>
 </div>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* EXPANDED MODAL OVERLAY */}
 <AnimatePresence>
 {activeCard !== null && (
 <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12 lg:p-24 pointer-events-none">
 {/* Backdrop */}
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 exit={{ opacity: 0 }}
 className="absolute inset-0 bg-parchment/95 backdrop-blur-md pointer-events-auto"
 onClick={() => setActiveCard(null)}
 />

 {/* Expanded Content Modal */}
 <div className="relative z-10 w-full max-w-6xl h-full flex flex-col lg:flex-row bg-parchment border border-gold/20 shadow-2xl overflow-hidden pointer-events-auto">
 
 {/* Close Button */}
 <button 
 onClick={() => setActiveCard(null)}
 className="absolute top-4 right-4 lg:top-6 lg:right-6 z-20 text-ink/50 hover:text-gold transition-colors bg-parchment/50 backdrop-blur-md p-2 rounded-full"
 >
 <X size={24} />
 </button>

 {/* Left: Expanded Image (Framer Motion Morph) */}
 <motion.div 
 layoutId={isDesktop ? `image-container-${activeCard}` : `image-container-mobile-${activeCard}`}
 className="relative w-full lg:w-1/2 h-[40vh] lg:h-full"
 >
 <motion.div 
 layoutId={isDesktop ? `image-${activeCard}` : `image-mobile-${activeCard}`}
 className="absolute inset-0"
 >
 <Image
 src={mergedPosts[activeCard].image}
 alt={mergedPosts[activeCard].title}
 fill
 className="object-cover"
 />
 </motion.div>
 {/* Gradient overlay to ensure text contrast if we had overlaid text, but we don't. Just adding a vignette */}
 <div className="absolute inset-0 bg-gradient-to-r from-transparent to-parchment/20 pointer-events-none" />
 </motion.div>

 {/* Right: Detailed Description */}
 <motion.div 
 initial={{ opacity: 0, x: 20 }}
 animate={{ opacity: 1, x: 0, transition: { delay: 0.2, duration: 0.5 } }}
 exit={{ opacity: 0, transition: { duration: 0.2 } }}
 className="w-full lg:w-1/2 h-full p-8 lg:p-16 flex flex-col justify-center overflow-y-auto"
 >
 <p className="text-[10px] tracking-wide-2xl uppercase text-gold/70 mb-4">
 {mergedPosts[activeCard].category} • {mergedPosts[activeCard].date}
 </p>
 <h2 className="text-3xl lg:text-4xl font-serif text-ink mb-8 leading-tight">
 {mergedPosts[activeCard].title}
 </h2>
 
 <div className="h-px w-12 bg-gold/50 mb-8" />
 
 <p className="text-base lg:text-lg text-ink/70 font-sans leading-relaxed mb-6">
 {mergedPosts[activeCard].description}
 </p>
 
 <a
 href={`/${locale}/blog`}
 className="mt-8 group inline-flex items-center gap-3 text-xs tracking-wide-xl uppercase text-gold hover:text-ink transition-colors w-fit"
 >
 <span>Read Full Article</span>
 <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
 </a>
 </motion.div>

 </div>
 </div>
 )}
 </AnimatePresence>
 </>
 );
}
