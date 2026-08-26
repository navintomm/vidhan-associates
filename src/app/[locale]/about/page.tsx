"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowDown } from "lucide-react";
import SectionDivider from "@/components/SectionDivider";
import AboutStatement from "@/components/AboutStatement";

export default function AboutPage() {
  const tHero = useTranslations("about.hero");
  const tStory = useTranslations("about.story");
  const tValues = useTranslations("about.values");

  const values = (tValues.raw("items") as Array<{
    title: string;
    description: string;
  }>);

  return (
    <div>
      {/* ===== 1. HERO ===== */}
      <section className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-ink">
        {/* Background image */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: "url('/images/hero-justice.jpg')" }}
        />
        <div className="absolute inset-0 z-0 bg-ink/60" />

        {/* Content */}
        <div className="relative z-10 text-center px-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xs md:text-sm tracking-wide-2xl uppercase text-gold/60 mb-8"
          >
            {tHero("label")}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-serif text-parchment leading-tight max-w-4xl mx-auto"
            style={{ whiteSpace: "pre-line" }}
          >
            {tHero("title")}
          </motion.h1>
        </div>

        {/* Scroll Down cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <p className="text-[11px] tracking-wide-2xl uppercase text-parchment/30">
            {tHero("scrollDown")}
          </p>
          <ArrowDown size={14} className="text-parchment/30 animate-bounce" />
        </motion.div>
      </section>

      {/* ===== 1.5 STATEMENT TRANSITION ===== */}
      <AboutStatement />

      {/* ===== 2. FIRM STORY ===== */}
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
      <section className="bg-ink py-24 md:py-32 px-6 lg:px-12 border-t border-gold/10">
        <div className="container mx-auto max-w-6xl">
          <p className="text-xs md:text-sm tracking-wide-2xl uppercase text-gold/50 mb-16 text-center">
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
                className={`py-12 px-10 ${i < values.length - 1 ? "md:border-r border-gold/10" : ""} border-b md:border-b-0 border-gold/10 last:border-b-0`}
              >
                {/* Number indicator */}
                <p className="text-xs md:text-sm tracking-wide-xl uppercase text-gold/30 mb-6">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="text-2xl md:text-3xl font-serif text-parchment mb-4">{v.title}</h3>
                <p className="text-base md:text-lg text-parchment/50 font-sans leading-relaxed">
                  {v.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />



      <div className="bg-ink pb-14 lg:pb-20" />
    </div>
  );
}
