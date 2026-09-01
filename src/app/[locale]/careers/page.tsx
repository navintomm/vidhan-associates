"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { GraduationCap, Briefcase, Send, CheckCircle2, Mail, Users } from "lucide-react";
import SectionDivider from "@/components/SectionDivider";

export default function CareersPage() {
 const tHero = useTranslations("careers.hero");
 const tOpportunities = useTranslations("careers.opportunities");
 const tApply = useTranslations("careers.apply");

 const roles = (tOpportunities.raw("roles") as Array<{
 title: string;
 location: string;
 description: string;
 requirementsTitle: string;
 requirements: string[];
 offerTitle: string;
 offers: string[];
 }>);
 
 const instructions = (tApply.raw("instructions") as string[]);

 return (
 <div className="bg-parchment min-h-screen">
 {/* ===== HERO ===== */}
 <section className="relative w-full pt-32 pb-16 md:pt-48 md:pb-24 flex items-center justify-center bg-parchment">
 <div className="relative z-10 text-center px-6">
 <motion.h1
 initial={{ opacity: 0, y: 30 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.9, delay: 0.2 }}
 className="text-6xl md:text-8xl font-serif text-ink leading-tight max-w-4xl mx-auto mb-6"
 >
 {tHero("title")}
 </motion.h1>
 <motion.p
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.7, delay: 0.4 }}
 className="text-xl md:text-2xl text-ink/75 max-w-2xl mx-auto font-sans leading-relaxed"
 >
 {tHero("description")}
 </motion.p>
 </div>
 </section>

 {/* ===== OPPORTUNITIES ===== */}
 <section className="py-24 px-6 lg:px-12 bg-parchment text-ink border-b border-gold/10">
 <div className="container mx-auto max-w-5xl">
 <motion.h2
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.8 }}
 className="text-5xl md:text-6xl font-serif mb-16 text-center"
 >
 {tOpportunities("heading")}
 </motion.h2>

 <div className="space-y-12">
 {roles.map((role, i) => (
 <motion.div
 key={i}
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.7, delay: i * 0.2 }}
 className="bg-white rounded-xl shadow-sm border border-gold/20 p-8 md:p-12"
 >
 <div className="flex flex-col md:flex-row md:items-start gap-5 mb-8 border-b border-gold/10 pb-8">
 <div className="p-3.5 bg-parchment rounded-lg text-gold inline-flex w-fit">
 {i === 0 ? <Users size={32} /> : <Briefcase size={32} />}
 </div>
 <div>
 <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
 <h3 className="text-3xl md:text-4xl font-serif text-ink">{role.title}</h3>
 <span className="text-sm font-sans tracking-wide uppercase bg-gold/10 text-gold px-3.5 py-1.5 rounded-full w-fit font-semibold">
 {role.location}
 </span>
 </div>
 <p className="text-slate/85 font-sans text-xl leading-relaxed">{role.description}</p>
 </div>
 </div>

 <div className="grid md:grid-cols-2 gap-10">
 <div>
 <h4 className="flex items-center gap-2 font-bold font-sans text-ink mb-6 text-xl">
 <CheckCircle2 className="text-gold" size={24} />
 {role.requirementsTitle}
 </h4>
 <ul className="space-y-3.5">
 {role.requirements.map((req, j) => (
 <li key={j} className="text-slate/85 font-sans text-lg flex items-start">
 <span className="text-gold mr-3 mt-1 font-bold">•</span>
 <span className="leading-relaxed">{req}</span>
 </li>
 ))}
 </ul>
 </div>
 <div>
 <h4 className="flex items-center gap-2 font-bold font-sans text-ink mb-6 text-xl">
 <GraduationCap className="text-gold" size={24} />
 {role.offerTitle}
 </h4>
 <ul className="space-y-3.5">
 {role.offers.map((offer, j) => (
 <li key={j} className="text-slate/85 font-sans text-lg flex items-start">
 <span className="text-gold mr-3 mt-1 font-bold">•</span>
 <span className="leading-relaxed">{offer}</span>
 </li>
 ))}
 </ul>
 </div>
 </div>
 </motion.div>
 ))}
 </div>
 </div>
 </section>

 {/* ===== HOW TO APPLY ===== */}
 <section className="py-24 px-6 lg:px-12 bg-parchment text-ink">
 <div className="container mx-auto max-w-4xl text-center">
 <motion.div
 initial={{ opacity: 0, scale: 0.9 }}
 whileInView={{ opacity: 1, scale: 1 }}
 viewport={{ once: true }}
 transition={{ duration: 0.7 }}
 className="flex flex-col items-center"
 >
 <div className="p-5 bg-gold/10 rounded-full mb-8">
 <Send className="w-12 h-12 text-gold" />
 </div>
 <h2 className="text-5xl md:text-6xl font-serif mb-6">{tApply("heading")}</h2>
 <p className="text-xl md:text-2xl text-ink/75 max-w-2xl mx-auto mb-10 leading-relaxed font-sans">
 {tApply("description")}
 </p>

 <div className="bg-gold/5 border border-gold/20 rounded-xl p-8 md:p-10 mb-10 w-full max-w-xl mx-auto">
 <div className="flex flex-col items-center gap-3">
 <a href={`mailto:${tApply("email")}`} className="flex items-center gap-3 text-2xl md:text-3xl font-serif text-gold hover:text-gold/80 transition-colors mb-2 font-medium">
 <Mail size={28} />
 {tApply("email")}
 </a>
 <p className="text-base font-sans text-ink/60">
 {tApply("subjectFormat")}
 </p>
 </div>
 </div>

 <div className="text-left max-w-2xl mx-auto mb-12 space-y-4 font-sans text-ink/85 text-lg">
 {instructions.map((instruction, index) => (
 <div key={index} className="flex items-start gap-3">
 <span className="text-gold mt-1 font-bold">•</span>
 <p dangerouslySetInnerHTML={{ __html: instruction.replace(/\*\*(.*?)\*\*/g, '<strong class="text-ink font-semibold">$1</strong>') }} />
 </div>
 ))}
 </div>

 <p className="text-base font-sans text-ink/50 italic mb-10">
 {tApply("note")}
 </p>

 <a 
 href={`mailto:${tApply("email")}`}
 className="inline-block bg-gold hover:bg-gold/90 text-ink font-bold font-sans uppercase tracking-widest px-10 py-5 rounded-full text-base transition-colors shadow-lg"
 >
 {tApply("cta")}
 </a>
 </motion.div>
 </div>
 </section>

 <SectionDivider />
 </div>
 );
}
