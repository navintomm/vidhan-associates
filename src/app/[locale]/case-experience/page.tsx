"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { FileText, ChevronRight, Briefcase } from "lucide-react";
import SectionDivider from "@/components/SectionDivider";

export default function CaseExperiencePage() {
 const tHero = useTranslations("experience.hero");
 const tMethodology = useTranslations("experience.methodology");
 const tMatters = useTranslations("experience.matters");

 const methodSteps = tMethodology.raw("steps") as Array<{ title: string; description: string }>;
 const matters = tMatters.raw("items") as Array<{ title: string; description: string }>;

 return (
 <div className="bg-parchment min-h-screen">
 {/* HERO SECTION */}
 <section className="bg-parchment pt-32 md:pt-48 pb-24 px-6 lg:px-12">
 <div className="container mx-auto max-w-5xl">
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.8 }}
 className="text-center"
 >
 <p className="text-sm md:text-base font-bold tracking-widest uppercase text-gold/80 mb-6">
 {tHero("label")}
 </p>
 <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-ink mb-8">
 {tHero("title")}
 </h1>
 <p className="text-xl md:text-2xl font-sans text-ink/75 leading-relaxed max-w-3xl mx-auto">
 {tHero("intro")}
 </p>
 </motion.div>
 </div>
 </section>

 {/* METHODOLOGY SECTION */}
 <section className="py-24 md:py-32 px-6 lg:px-12 bg-parchment">
 <div className="container mx-auto max-w-5xl">
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.8 }}
 className="mb-16 md:mb-24"
 >
 <div className="flex items-center gap-4 mb-6">
 <FileText className="text-gold w-9 h-9" />
 <h2 className="text-4xl md:text-6xl font-serif text-ink">{tMethodology("heading")}</h2>
 </div>
 <p className="text-xl md:text-2xl font-sans text-slate/85 leading-relaxed max-w-3xl">
 {tMethodology("description")}
 </p>
 </motion.div>

 <div className="space-y-8 md:space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gold/30 before:to-transparent">
 {methodSteps.map((step, index) => (
 <motion.div 
 key={index}
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.5, delay: index * 0.1 }}
 className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
 >
 <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-ink bg-gold text-ink shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 font-serif font-bold text-base">
 {index + 1}
 </div>
 
 <div className="w-[calc(100%-4.5rem)] md:w-[calc(50%-3rem)] p-8 md:p-10 rounded-xl bg-white shadow-sm border border-gold/10 hover:shadow-md transition-shadow">
 <h3 className="font-serif text-2xl md:text-3xl text-ink mb-3">{step.title}</h3>
 <p className="font-sans text-slate/85 leading-relaxed text-base md:text-lg">
 {step.description}
 </p>
 </div>
 </motion.div>
 ))}
 </div>
 </div>
 </section>

 <SectionDivider />

 {/* REPRESENTATIVE MATTERS SECTION */}
 <section className="py-24 md:py-32 px-6 lg:px-12 bg-parchment text-ink">
 <div className="container mx-auto max-w-6xl">
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.8 }}
 className="text-center mb-16 md:mb-20"
 >
 <Briefcase className="text-gold w-12 h-12 mx-auto mb-6" />
 <h2 className="text-4xl md:text-6xl font-serif text-ink mb-6">{tMatters("heading")}</h2>
 <p className="text-base md:text-lg font-sans text-ink/60 italic">
 {tMatters("confidentialityNote")}
 </p>
 </motion.div>

 <div className="grid md:grid-cols-2 gap-8 md:gap-12">
 {matters.map((matter, index) => (
 <motion.div
 key={index}
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.5, delay: index * 0.1 }}
 className="p-8 md:p-10 rounded-xl bg-white shadow-sm border border-gold/10 hover:shadow-md transition-shadow"
 >
 <div className="flex items-start gap-4 mb-4">
 <ChevronRight className="text-gold w-7 h-7 shrink-0 mt-1" />
 <h3 className="font-serif text-2xl md:text-3xl text-gold/90 leading-snug">
 {matter.title}
 </h3>
 </div>
 <div className="pl-11">
 <p className="font-sans text-ink/80 leading-relaxed whitespace-pre-line text-base md:text-lg">
 {matter.description}
 </p>
 </div>
 </motion.div>
 ))}
 </div>
 </div>
 </section>

 <div className="bg-parchment pb-14 lg:pb-20" />
 </div>
 );
}
