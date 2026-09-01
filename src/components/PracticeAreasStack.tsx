"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { X, ArrowRight, Scale, Briefcase, Landmark, Users, Gavel, FileText, FileSignature, MessageSquare, BookOpen } from "lucide-react";

if (typeof window !== "undefined") {
 gsap.registerPlugin(ScrollTrigger);
}

const CASE_IMAGES = [
 "/images/cases/case_corporate_1787754118570.jpg",
 "/images/cases/case_realestate_1787754137293.jpg",
 "/images/cases/case_criminal_1787754154520.jpg",
 "/images/cases/case_family_1787754172004.jpg",
 "/images/cases/case_ip_1787754189522.jpg",
];
import { ElementType } from "react";

const ICONS: Record<string, ElementType> = {
 "pa-01": Scale,
 "pa-02": Gavel,
 "pa-03": Briefcase,
 "pa-04": Users,
 "pa-05": Landmark,
 "pa-06": FileText,
 "pa-07": FileSignature,
 "pa-08": MessageSquare,
 "pa-09": BookOpen
};

const IMAGES: Record<string, string> = {
 "pa-01": CASE_IMAGES[0],
 "pa-02": CASE_IMAGES[2],
 "pa-03": CASE_IMAGES[4],
 "pa-04": CASE_IMAGES[3],
 "pa-05": CASE_IMAGES[1],
 "pa-06": CASE_IMAGES[0],
 "pa-07": CASE_IMAGES[1],
 "pa-08": CASE_IMAGES[4],
 "pa-09": CASE_IMAGES[2]
};

export default function PracticeAreasStack() {
 const containerRef = useRef<HTMLDivElement>(null);
 const [activeCase, setActiveCase] = useState<string | null>(null);
 
 const t = useTranslations("practiceAreasPage");
 const locale = useLocale();
 
 type PracticeArea = {
 id: string;
 category: string;
 title: string;
 description: string;
 detailedBrief: string;
 };
 const rawAreas = t.raw("areas") as Array<PracticeArea>;
 const practiceAreas = rawAreas.map(area => ({
 ...area,
 icon: ICONS[area.id],
 image: IMAGES[area.id]
 }));

 useEffect(() => {
 const mm = gsap.matchMedia();

 mm.add("all", () => {
 if (!containerRef.current) return;

 const cards = gsap.utils.toArray<HTMLElement>(".case-card");
 
 // Initial Setup: Stack them with scale and Y offsets
 gsap.set(cards, {
 scale: (i) => 1 - (i * 0.05),
 y: (i) => i * 40,
 zIndex: (i) => cards.length - i,
 transformOrigin: "bottom center"
 });

 const tl = gsap.timeline({
 scrollTrigger: {
 trigger: containerRef.current,
 pin: true,
 scrub: 1,
 start: "top top",
 end: () => `+=${window.innerHeight * (cards.length * 0.8)}`, // Total scroll distance
 anticipatePin: 1
 }
 });

 // Create the Bumble-swipe staggered animation
 cards.forEach((card, index) => {
 // The last card doesn't swipe away
 if (index === cards.length - 1) return;

 const label = `swipe-${index}`;
 
 // 1. Swipe away the current top card
 tl.to(card, {
 xPercent: -120, // Swipe left
 rotationZ: -15, // Tilt
 opacity: 0, // Fade out
 ease: "power2.inOut",
 }, label);

 // 2. Bring all cards beneath it forward
 for(let j = index + 1; j < cards.length; j++) {
 const nextCard = cards[j];
 // Determine its new position in the visual stack
 const stackPos = j - (index + 1); // 0 for the one immediately below, 1 for the next, etc.
 
 tl.to(nextCard, {
 scale: 1 - (stackPos * 0.05),
 y: stackPos * 40,
 ease: "power2.inOut",
 }, label);
 }
 });

 return () => {
 tl.kill();
 };
 });

 return () => mm.revert();
 }, []);

 // Lock body scroll when modal is active
 useEffect(() => {
 if (activeCase) {
 document.body.style.overflow = "hidden";
 } else {
 document.body.style.overflow = "";
 }
 return () => { document.body.style.overflow = ""; };
 }, [activeCase]);

 const activeData = practiceAreas.find(c => c.id === activeCase);

 return (
 <>
 {/* Scrollable Pinned Container */}
 <div ref={containerRef} className="h-screen w-full bg-parchment flex flex-col items-center justify-center relative overflow-hidden pt-24 pb-12">
 
 {/* Background Texture/Watermark */}
 <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
 <h2 className="text-[15vw] font-serif tracking-[0.2em] text-ink/[0.08] whitespace-nowrap select-none">
 V I D H A N
 </h2>
 </div>

 {/* Header Text */}
 <div className="absolute top-32 left-8 md:left-16 z-20 pointer-events-none">
 <p className="text-gold tracking-[0.3em] uppercase text-sm mb-4">{t("header.subtitle")}</p>
 <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif text-ink leading-tight break-words whitespace-pre-line">
 {t("header.title")}
 </h1>
 </div>

 {/* Scroll Indicator */}
 <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 z-20 flex flex-col items-center pointer-events-none opacity-80">
 <span className="text-[10px] tracking-widest uppercase text-ink mb-2">Scroll</span>
 <div className="w-px h-16 bg-gradient-to-b from-ink to-transparent" />
 </div>

 {/* The Card Stack */}
 <div className="relative w-full max-w-md md:max-w-2xl h-[60vh] md:h-[70vh] z-10 flex items-center justify-center perspective-[1000px]">
 {practiceAreas.map((item) => {
 const Icon = item.icon;
 return (
 <div 
 key={item.id} 
 className="case-card absolute inset-0 w-full h-full flex items-center justify-center p-4 cursor-pointer"
 onClick={() => setActiveCase(item.id)}
 >
 {/* Framer Motion Shared Element Wrapper */}
 <motion.div 
 layoutId={`case-${item.id}`}
 className="w-full h-full relative rounded-2xl overflow-hidden border border-gold/20 shadow-2xl bg-parchment group"
 >
 <Image 
 src={item.image} 
 alt={item.title}
 fill
 className="object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
 />
 {/* Dark gradient so text stays readable on photos */}
 <div className="absolute inset-0" style={{background: 'linear-gradient(to top, rgba(1,1,1,0.80) 0%, rgba(1,1,1,0.40) 50%, rgba(1,1,1,0.10) 100%)'}} />
 
 {/* Card Content */}
 <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
 <div className="w-12 h-12 rounded-full bg-gold/10 backdrop-blur-md flex items-center justify-center border border-gold/30 text-gold mb-4 group-hover:scale-110 transition-transform duration-500">
 <Icon size={24} />
 </div>
 <p className="text-sm tracking-[0.2em] uppercase text-gold mb-2">{item.category}</p>
 <h3 className={`${locale === "ml" ? "text-xl md:text-2xl leading-snug mb-2 md:mb-4" : "text-2xl md:text-3xl leading-snug mb-4"} font-serif text-parchment break-words`}>
 {item.title}
 </h3>
 <p className="text-parchment/70 font-sans line-clamp-2 md:line-clamp-3">
 {item.description}
 </p>
 
 <div className="mt-6 flex items-center gap-2 text-xs uppercase tracking-widest text-parchment/60 group-hover:text-gold transition-colors">
 <span>{t("viewDetails")}</span>
 <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
 </div>
 </div>
 </motion.div>
 </div>
 );
 })}
 </div>

 </div>

 {/* Expanded Modal */}
 <AnimatePresence>
 {activeData && (
 <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-12 pointer-events-none">
 
 {/* Backdrop */}
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 exit={{ opacity: 0 }}
 className="absolute inset-0 bg-parchment/95 backdrop-blur-lg pointer-events-auto"
 onClick={() => setActiveCase(null)}
 />

 {/* Modal Content */}
 <motion.div 
 layoutId={`case-${activeData.id}`}
 className="relative z-10 w-full max-w-6xl h-full md:h-[60vh] bg-parchment rounded-2xl md:rounded-[2rem] overflow-hidden border border-gold/30 shadow-2xl flex flex-col md:flex-row pointer-events-auto"
 >
 {/* Close Button */}
 <button 
 onClick={() => setActiveCase(null)}
 className="absolute top-4 right-4 md:top-8 md:right-8 z-50 w-12 h-12 rounded-full bg-parchment/50 backdrop-blur-md border border-gold/30 flex items-center justify-center text-ink hover:text-gold transition-colors"
 >
 <X size={24} />
 </button>

 {/* Left Image Pane */}
 <div className="w-full md:w-1/2 h-[40vh] md:h-full relative overflow-hidden flex-shrink-0">
 <Image 
 src={activeData.image} 
 alt={activeData.title}
 fill
 className="object-cover"
 />
 <div className="absolute inset-0" style={{background: 'linear-gradient(to right, rgba(1,1,1,0.0) 60%, rgba(254,254,254,0.95) 100%)'}} />
 </div>

 {/* Right Content Pane */}
 <div className="w-full md:w-1/2 h-full flex flex-col justify-start py-8 px-6 md:py-16 md:px-12 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
 <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center border border-gold/30 text-gold mb-8 flex-shrink-0">
 <activeData.icon size={32} />
 </div>
 
 <p className="text-sm tracking-[0.2em] uppercase text-gold mb-4">{activeData.category}</p>
 <h2 className={`${locale === "ml" ? "text-2xl md:text-4xl leading-snug" : "text-3xl md:text-5xl leading-tight"} font-serif text-ink mb-8 break-words`}>
 {activeData.title}
 </h2>
 
 <div className="w-16 h-px bg-gold/50 mb-8" />
 
 <div className="space-y-8 pb-12 md:pb-0">
 <div>
 <h4 className="text-lg font-serif text-gold mb-3">{t("overview")}</h4>
 <p className="text-ink/80 font-sans leading-relaxed md:text-lg">{activeData.detailedBrief}</p>
 </div>
 </div>
 </div>
 
 </motion.div>
 </div>
 )}
 </AnimatePresence>
 </>
 );
}
