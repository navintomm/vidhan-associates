"use client";

import { useTranslations } from "next-intl";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function FirmStory() {
 const t = useTranslations("home.story");
 
 const containerRef = useRef<HTMLDivElement>(null);
 const beatsRef = useRef<(HTMLDivElement | null)[]>([]);

 useLayoutEffect(() => {
 if (!containerRef.current) return;

 const ctx = gsap.matchMedia();

 ctx.add(
 // Conditions for desktop and reduced motion preference
 "(min-width: 768px) and (prefers-reduced-motion: no-preference)", 
 () => {
 // Scrollytelling Pinning Timeline
 const tl = gsap.timeline({
 scrollTrigger: {
 trigger: containerRef.current,
 start: "top top",
 end: "+=300%", // 3 sections = 300% scroll depth
 scrub: 1, // Smooth scrubbing
 pin: true,
 }
 });

 // Hide all beats except first initially
 gsap.set(beatsRef.current.slice(1), { autoAlpha: 0, y: 50 });

 // Beat 1 -> Beat 2
 tl.to(beatsRef.current[0], { autoAlpha: 0, y: -50, duration: 1 })
 .to(beatsRef.current[1], { autoAlpha: 1, y: 0, duration: 1 }, "<")
 
 // Beat 2 -> Beat 3 
 .to(beatsRef.current[1], { autoAlpha: 0, y: -50, duration: 1 }, "+=0.5")
 .to(beatsRef.current[2], { autoAlpha: 1, y: 0, duration: 1 }, "<");
 }
 );

 return () => ctx.revert();
 }, []);

 const beats = [
 { key: "beat1", bg: "bg-parchment", text: "text-ink" },
 { key: "beat2", bg: "bg-parchment", text: "text-ink" },
 { key: "beat3", bg: "bg-slate", text: "text-ink" }
 ];

 return (
 <section 
 ref={containerRef} 
 className="relative w-full md:h-screen flex flex-col md:block"
 >
 {beats.map((beat, i) => (
 <div 
 key={beat.key}
 ref={(el) => { beatsRef.current[i] = el; }}
 className={`
 w-full py-24 px-6 md:py-0 md:absolute md:inset-0 
 flex flex-col items-center justify-center 
 ${beat.bg} ${beat.text}
 `}
 >
 <div className="max-w-4xl mx-auto text-center">
 <h2 className="text-4xl md:text-6xl font-serif mb-6 md:mb-10 text-gold">
 {t(`${beat.key}.title`)}
 </h2>
 <p className="text-lg md:text-3xl font-light leading-relaxed max-w-2xl mx-auto">
 {t(`${beat.key}.description`)}
 </p>
 </div>
 </div>
 ))}
 </section>
 );
}
