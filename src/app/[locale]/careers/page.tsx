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
      <section className="relative w-full pt-32 pb-16 md:pt-48 md:pb-24 flex items-center justify-center bg-ink">
        <div className="relative z-10 text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="text-5xl md:text-7xl font-serif text-parchment leading-tight max-w-4xl mx-auto mb-6"
          >
            {tHero("title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-lg md:text-xl text-parchment/70 max-w-2xl mx-auto font-sans leading-relaxed"
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
            className="text-4xl md:text-5xl font-serif mb-16 text-center"
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
                className="bg-white rounded-xl shadow-sm border border-gold/20 p-8 md:p-10"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4 mb-8 border-b border-gold/10 pb-8">
                  <div className="p-3 bg-parchment rounded-lg text-gold inline-flex w-fit">
                    {i === 0 ? <Users size={28} /> : <Briefcase size={28} />}
                  </div>
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
                      <h3 className="text-2xl md:text-3xl font-serif text-ink">{role.title}</h3>
                      <span className="text-xs font-sans tracking-wide uppercase bg-gold/10 text-gold px-3 py-1 rounded-full w-fit">
                        {role.location}
                      </span>
                    </div>
                    <p className="text-slate text-lg leading-relaxed">{role.description}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-10">
                  <div>
                    <h4 className="flex items-center gap-2 font-bold font-sans text-ink mb-6 text-lg">
                      <CheckCircle2 className="text-gold" size={20} />
                      {role.requirementsTitle}
                    </h4>
                    <ul className="space-y-3">
                      {role.requirements.map((req, j) => (
                        <li key={j} className="text-slate flex items-start">
                          <span className="text-gold mr-3 mt-1">•</span>
                          <span className="leading-relaxed">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="flex items-center gap-2 font-bold font-sans text-ink mb-6 text-lg">
                      <GraduationCap className="text-gold" size={20} />
                      {role.offerTitle}
                    </h4>
                    <ul className="space-y-3">
                      {role.offers.map((offer, j) => (
                        <li key={j} className="text-slate flex items-start">
                          <span className="text-gold mr-3 mt-1">•</span>
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
      <section className="py-24 px-6 lg:px-12 bg-ink text-parchment">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center"
          >
            <div className="p-4 bg-gold/10 rounded-full mb-8">
              <Send className="w-10 h-10 text-gold" />
            </div>
            <h2 className="text-4xl md:text-5xl font-serif mb-6">{tApply("heading")}</h2>
            <p className="text-lg text-parchment/70 max-w-2xl mx-auto mb-10 leading-relaxed">
              {tApply("description")}
            </p>

            <div className="bg-gold/5 border border-gold/20 rounded-xl p-8 mb-10 w-full max-w-xl mx-auto">
              <div className="flex flex-col items-center gap-2">
                <a href={`mailto:${tApply("email")}`} className="flex items-center gap-3 text-xl md:text-2xl font-serif text-gold hover:text-gold/80 transition-colors mb-2">
                  <Mail size={24} />
                  {tApply("email")}
                </a>
                <p className="text-sm font-sans text-parchment/50">
                  {tApply("subjectFormat")}
                </p>
              </div>
            </div>

            <div className="text-left max-w-2xl mx-auto mb-12 space-y-4 font-sans text-parchment/80">
              {instructions.map((instruction, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="text-gold mt-1">•</span>
                  <p dangerouslySetInnerHTML={{ __html: instruction.replace(/\*\*(.*?)\*\*/g, '<strong class="text-parchment">$1</strong>') }} />
                </div>
              ))}
            </div>

            <p className="text-sm font-sans text-parchment/40 italic mb-10">
              {tApply("note")}
            </p>

            <a 
              href={`mailto:${tApply("email")}`}
              className="inline-block bg-gold hover:bg-gold/90 text-ink font-bold font-sans uppercase tracking-wide px-8 py-4 rounded transition-colors"
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
