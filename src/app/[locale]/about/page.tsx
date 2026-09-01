"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Landmark } from "lucide-react";
import SectionDivider from "@/components/SectionDivider";
import AboutStatement from "@/components/AboutStatement";

export default function AboutPage() {
 const tLegacy = useTranslations("about.legacy");
 const tStory = useTranslations("about.story");
 const tValues = useTranslations("about.values");

 const values = (tValues.raw("items") as Array<{
 title: string;
 description: string;
 }>);
 
 const courts = (tLegacy.raw("courts") as string[]);

 return (
 <div className="bg-parchment">
 {/* ===== 1. LEGACY & VISION (Replaces Old Hero) ===== */}
 <section className="bg-parchment pt-32 md:pt-48 pb-24 px-6 lg:px-12">
 <div className="container mx-auto max-w-6xl">
 <div className="grid md:grid-cols-[1.2fr_1fr] gap-12 md:gap-20 items-start">
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.8 }}
 >
 <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-ink leading-tight mb-8" style={{ whiteSpace: "pre-line" }}>
 {tLegacy("heading")}
 </h1>
 <div className="space-y-6 text-slate/80 font-sans leading-relaxed text-lg md:text-xl">
 <p>{tLegacy("body1")}</p>
 <p>{tLegacy("body2")}</p>
 </div>
 </motion.div>

 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.8, delay: 0.15 }}
 className="bg-parchment rounded-xl p-8 md:p-12 shadow-xl border border-gold/10"
 >
 <div className="flex items-center gap-3 mb-8">
 <Landmark className="text-gold w-7 h-7" />
 <h2 className="text-2xl md:text-3xl font-serif text-gold">{tLegacy("courtsLabel")}</h2>
 </div>
 <ul className="space-y-5">
 {courts.map((court, i) => (
 <li key={i} className="text-ink/90 font-sans text-base md:text-lg leading-relaxed">
 {court}
 </li>
 ))}
 </ul>
 </motion.div>
 </div>
 </div>
 </section>

 {/* ===== 1.5 STATEMENT TRANSITION ===== */}
 <AboutStatement />

 {/* ===== 2. FIRM STORY (Restored to Original) ===== */}
 <section className="bg-parchment py-24 md:py-36 px-6 lg:px-12">
 <div className="container mx-auto max-w-6xl">
 <motion.p
 initial={{ opacity: 0 }}
 whileInView={{ opacity: 1 }}
 viewport={{ once: true }}
 transition={{ duration: 0.6 }}
 className="text-xs md:text-sm tracking-wide-2xl uppercase text-gold/60 mb-8"
 >
 {tStory("label")}
 </motion.p>

 <div className="grid md:grid-cols-2 gap-16 items-start">
 <motion.h2
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.8 }}
 className="text-4xl md:text-5xl lg:text-6xl font-serif text-ink leading-tight"
 style={{ whiteSpace: "pre-line" }}
 >
 {tStory("heading")}
 </motion.h2>

 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.8, delay: 0.15 }}
 className="space-y-6 text-slate/70 font-sans leading-relaxed text-lg md:text-xl"
 >
 <p>{tStory("body1")}</p>
 <p>{tStory("body2")}</p>
 <p className="italic text-slate/50 font-serif text-xl md:text-2xl border-l-2 border-gold/30 pl-6">
 {tStory("body3")}
 </p>
 </motion.div>
 </div>
 </div>
 </section>

 {/* ===== 3. VALUES ===== */}
 <section className="bg-parchment py-24 md:py-32 px-6 lg:px-12 border-t border-gold/10">
 <div className="container mx-auto max-w-6xl">
 <p className="text-xs md:text-sm tracking-wide-2xl uppercase text-gold/70 mb-20 text-center">
 {tValues("label")}
 </p>

 <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
 {values.map((v, i) => (
 <motion.div
 key={i}
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.7, delay: i * 0.12 }}
 className={`py-8 px-6 md:px-10 ${i < values.length - 1 ? "md:border-r border-gold/10" : ""} border-b md:border-b-0 border-gold/10 last:border-b-0`}
 >
 {/* Number indicator */}
 <p className="text-lg md:text-xl font-serif tracking-widest text-gold/80 mb-6">
 {String(i + 1).padStart(2, "0")}
 </p>
 <h3 className="text-2xl md:text-3xl font-serif text-ink mb-5">{v.title}</h3>
 <p className="text-sm md:text-base text-ink/60 font-serif leading-relaxed md:leading-loose">
 {v.description}
 </p>
 </motion.div>
 ))}
 </div>
 </div>
 </section>

 <SectionDivider />

 <div className="bg-parchment pb-14 lg:pb-20" />
 </div>
 );
}
