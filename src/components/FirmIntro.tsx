"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";

export default function FirmIntro({ locale }: { locale: string }) {
 const t = useTranslations("home.firmIntro");
 
 const quotes = t.raw("quotes") as Array<{ text: string; author: string }>;
 const [quoteIndex, setQuoteIndex] = useState(0);
 const [isMounted, setIsMounted] = useState(false);

 useEffect(() => {
 // Deterministic daily index based on day of year
 const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
 setQuoteIndex(dayOfYear % quotes.length);
 setIsMounted(true);
 }, [quotes.length]);

 const dailyQuote = isMounted ? quotes[quoteIndex] : quotes[0];

 return (
 <section className="bg-parchment py-24 md:py-36 px-6 lg:px-12">
 <div className="container mx-auto max-w-6xl">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">

 {/* Left — Blockquote */}
 <motion.div
 initial={{ opacity: 0, x: -30 }}
 whileInView={{ opacity: 1, x: 0 }}
 viewport={{ once: true, margin: "-100px" }}
 transition={{ duration: 0.9, ease: "easeOut" }}
 className="relative"
 >
 {/* Vertical gold rule */}
 <div className="absolute left-0 top-0 bottom-0 w-px bg-gold/40" />
 <div className="pl-8">
 <p className="text-sm md:text-base tracking-widest uppercase font-bold text-gold/80 mb-6">
 Guiding Principle
 </p>
 <blockquote 
 className={`${locale === "ml" ? "text-3xl md:text-5xl lg:text-6xl leading-relaxed" : "text-5xl md:text-6xl lg:text-7xl leading-tight"} font-serif text-ink italic mb-6 transition-opacity duration-500 break-words`} 
 style={{ opacity: isMounted ? 1 : 0.4 }}
 >
 &ldquo;{dailyQuote.text}&rdquo;
 </blockquote>
 <p className="text-base font-semibold tracking-wide-xl uppercase text-mist transition-opacity duration-500" style={{ opacity: isMounted ? 1 : 0.4 }}>
 — {dailyQuote.author}
 </p>
 </div>
 </motion.div>

 {/* Right — Firm description */}
 <motion.div
 initial={{ opacity: 0, x: 30 }}
 whileInView={{ opacity: 1, x: 0 }}
 viewport={{ once: true, margin: "-100px" }}
 transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
 >
 <p className="text-sm md:text-base tracking-widest uppercase font-bold text-gold/80 mb-6">
 The Firm
 </p>
 <h2 className={`${locale === "ml" ? "text-3xl md:text-4xl lg:text-5xl leading-relaxed" : "text-4xl md:text-5xl lg:text-6xl leading-tight"} font-serif text-ink mb-8 break-words`}>
 {t("heading")}
 </h2>
 <p className="text-slate/85 font-sans leading-relaxed mb-6 text-xl md:text-2xl">
 {t("body1")}
 </p>
 <p className="text-slate/85 font-sans leading-relaxed mb-10 text-xl md:text-2xl">
 {t("body2")}
 </p>

 <a
 href={`/${locale}/about`}
 className="group inline-flex items-center gap-4 text-base md:text-lg font-bold tracking-widest uppercase text-ink hover:text-gold transition-colors"
 >
 <span>{t("cta")}</span>
 <span className="w-12 h-12 rounded-full border border-ink/20 group-hover:border-gold/50 flex items-center justify-center transition-colors">
 <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
 </span>
 </a>
 </motion.div>
 </div>
 </div>
 </section>
 );
}
