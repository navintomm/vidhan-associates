"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { X, ArrowDown } from "lucide-react";
import SectionDivider from "@/components/SectionDivider";

// Initials-based avatar colours per advocate
const avatarColors = ["bg-slate", "bg-seal/80", "bg-gold/30"];

function getInitials(name: string): string {
  return name
    .replace(/Adv\.\s*/i, "")
    .replace(/\[.*?\]/g, "A")
    .split(" ")
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function AboutPage() {
  const tHero = useTranslations("about.hero");
  const tStory = useTranslations("about.story");
  const tValues = useTranslations("about.values");
  const tTeam = useTranslations("about.team");

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const members = (tTeam.raw("members") as Array<{
    name: string;
    role: string;
    specialisation: string;
    education: string;
    bio: string;
  }>);

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
            className="text-[10px] tracking-wide-2xl uppercase text-gold/60 mb-8"
          >
            {tHero("label")}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="text-4xl md:text-6xl lg:text-7xl font-serif text-parchment leading-tight max-w-3xl mx-auto"
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
          <p className="text-[9px] tracking-wide-2xl uppercase text-parchment/30">
            {tHero("scrollDown")}
          </p>
          <ArrowDown size={14} className="text-parchment/30 animate-bounce" />
        </motion.div>
      </section>

      {/* ===== 2. FIRM STORY ===== */}
      <section className="bg-parchment py-24 md:py-36 px-6 lg:px-12">
        <div className="container mx-auto max-w-5xl">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[10px] tracking-wide-2xl uppercase text-gold/60 mb-8"
          >
            {tStory("label")}
          </motion.p>

          <div className="grid md:grid-cols-2 gap-16 items-start">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-4xl font-serif text-ink leading-tight"
              style={{ whiteSpace: "pre-line" }}
            >
              {tStory("heading")}
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="space-y-5 text-slate/70 font-sans leading-relaxed"
            >
              <p>{tStory("body1")}</p>
              <p>{tStory("body2")}</p>
              <p className="italic text-slate/50 font-serif text-lg border-l-2 border-gold/30 pl-4">
                {tStory("body3")}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== 3. VALUES ===== */}
      <section className="bg-ink py-24 md:py-32 px-6 lg:px-12 border-t border-gold/10">
        <div className="container mx-auto max-w-5xl">
          <p className="text-[10px] tracking-wide-2xl uppercase text-gold/50 mb-16 text-center">
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
                className={`py-10 px-8 ${i < values.length - 1 ? "md:border-r border-gold/10" : ""} border-b md:border-b-0 border-gold/10 last:border-b-0`}
              >
                {/* Number indicator */}
                <p className="text-[10px] tracking-wide-xl uppercase text-gold/30 mb-6">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="text-xl font-serif text-parchment mb-4">{v.title}</h3>
                <p className="text-sm text-parchment/50 font-sans leading-relaxed">
                  {v.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ===== 4. TEAM GRID ===== */}
      <section className="bg-ink py-24 md:py-32 px-6 lg:px-12 border-t border-gold/10">
        <div className="container mx-auto max-w-5xl">
          <p className="text-[10px] tracking-wide-2xl uppercase text-gold/50 mb-6">
            {tTeam("label")}
          </p>
          <h2 className="text-3xl md:text-4xl font-serif text-parchment mb-16 leading-tight">
            {tTeam("heading")}
          </h2>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {members.map((member, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                onClick={() => setActiveIndex(i)}
                className="group text-left border border-gold/10 hover:border-gold/30 transition-colors p-6 flex flex-col gap-4"
              >
                {/* Avatar */}
                <div
                  className={`w-14 h-14 rounded-full ${avatarColors[i]} flex items-center justify-center flex-shrink-0`}
                >
                  <span className="text-lg font-serif text-parchment/80">
                    {getInitials(member.name)}
                  </span>
                </div>

                {/* Info */}
                <div>
                  <h3 className="font-serif text-parchment group-hover:text-gold transition-colors text-base leading-snug mb-1">
                    {member.name}
                  </h3>
                  <p className="text-[10px] tracking-wide uppercase text-gold/50">{member.role}</p>
                </div>

                <p className="text-xs text-parchment/40 font-sans leading-relaxed">
                  {member.specialisation}
                </p>

                {/* Read more hint */}
                <p className="text-[9px] tracking-wide-xl uppercase text-gold/30 group-hover:text-gold/60 transition-colors mt-auto">
                  View Profile →
                </p>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Side Drawer / Modal ===== */}
      <AnimatePresence>
        {activeIndex !== null && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveIndex(null)}
              className="fixed inset-0 bg-ink/70 backdrop-blur-sm z-40"
            />

            {/* Drawer panel */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", ease: "easeInOut", duration: 0.35 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-ink border-l border-gold/15 z-50 overflow-y-auto p-10 flex flex-col"
            >
              {/* Close */}
              <button
                onClick={() => setActiveIndex(null)}
                className="absolute top-6 right-6 w-9 h-9 rounded-full border border-parchment/20 hover:border-gold/40 flex items-center justify-center text-parchment/60 hover:text-gold transition-colors"
              >
                <X size={15} />
              </button>

              {/* Avatar */}
              <div
                className={`w-20 h-20 rounded-full ${avatarColors[activeIndex]} flex items-center justify-center mb-8 flex-shrink-0`}
              >
                <span className="text-2xl font-serif text-parchment/80">
                  {getInitials(members[activeIndex].name)}
                </span>
              </div>

              <p className="text-[10px] tracking-wide-2xl uppercase text-gold/50 mb-3">
                {members[activeIndex].role}
              </p>
              <h2 className="text-2xl font-serif text-parchment mb-2 leading-snug">
                {members[activeIndex].name}
              </h2>

              {/* Gold hairline */}
              <div className="h-px bg-gold/20 my-6" />

              <p className="text-xs tracking-wide uppercase text-mist mb-2">Specialisation</p>
              <p className="text-sm text-parchment/70 font-sans mb-6">
                {members[activeIndex].specialisation}
              </p>

              <p className="text-xs tracking-wide uppercase text-mist mb-2">Education</p>
              <p className="text-sm text-parchment/70 font-sans mb-8">
                {members[activeIndex].education}
              </p>

              <p className="text-xs tracking-wide uppercase text-mist mb-3">Profile</p>
              <p className="text-sm text-parchment/60 font-sans leading-relaxed">
                {members[activeIndex].bio}
              </p>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="bg-ink pb-14 lg:pb-20" />
    </div>
  );
}
