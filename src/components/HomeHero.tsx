"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function HomeHero({ locale }: { locale: string }) {
 const t = useTranslations("home.hero");

  return (
    <section className="relative w-full h-screen overflow-hidden flex items-end pb-20 md:pb-28 bg-parchment">

      {/* ===== Background Image (Lady Justice Statue shifted to right to leave left side clear) ===== */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-[85%_center] md:bg-[90%_center] lg:bg-[93%_center] bg-no-repeat"
        style={{ backgroundImage: "url('/new hero icon.png')" }}
      />
      {/* Light wash to ensure crisp text contrast */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-parchment/10" />

      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 lg:px-12 w-full h-full flex flex-col pt-28 md:pt-32 pb-16 md:pb-24 justify-between">

        {/* Top — Motto */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="w-full flex flex-col items-center justify-center text-center mt-2 md:mt-4"
        >
          <span className="text-gold/70 tracking-[0.4em] uppercase text-xs md:text-sm font-sans mb-1 font-semibold">
            The
          </span>
          <p className="text-gold tracking-[0.35em] md:tracking-[0.45em] uppercase text-2xl md:text-3xl lg:text-4xl font-sans font-black drop-shadow-sm">
            Pursuit of Justice
          </p>
        </motion.div>

        {/* Center-Left — Gold Vidhan Logo (Kept strictly on left to avoid overlapping the statue) */}
        <div className="my-auto flex flex-col justify-center items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.3 }}
            className="w-full max-w-[340px] sm:max-w-[400px] md:max-w-[460px] lg:max-w-[500px] flex flex-col items-start"
          >
            <div className="w-full flex flex-col items-center">
              <Image
                src="/logo.png.png"
                alt="Vidhan Law Chambers"
                width={550}
                height={220}
                className="w-full h-auto object-contain drop-shadow-md"
                priority
              />
              <p className="mt-4 text-gold tracking-[0.25em] uppercase text-[11px] md:text-xs font-bold text-center">
                Advocates and Legal Consultants
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom-Right — Schedule a Consultation CTA (Prominent, Bold & High-Contrast) */}
        <div className="flex flex-col md:flex-row md:items-end justify-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.7 }}
            className="flex-shrink-0"
          >
            <Link
              href={`/${locale}/contact`}
              className="group inline-flex items-center gap-4 bg-white/95 hover:bg-gold text-ink transition-all duration-300 pl-6 md:pl-8 pr-2.5 md:pr-3 py-2.5 md:py-3 rounded-full border-2 border-gold/50 hover:border-gold shadow-lg hover:shadow-2xl hover:scale-[1.02] backdrop-blur-sm"
            >
              <span className="text-xs md:text-sm lg:text-base tracking-[0.2em] uppercase font-black">
                Schedule a Consultation
              </span>
              <span className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-ink text-gold flex items-center justify-center transition-colors relative overflow-hidden shrink-0 shadow-md">
                <ArrowRight size={18} className="absolute transition-transform duration-500 ease-in-out group-hover:translate-x-12 group-active:translate-x-12 text-gold" />
                <ArrowRight size={18} className="absolute -translate-x-12 transition-transform duration-500 ease-in-out group-hover:translate-x-0 group-active:translate-x-0 text-gold" />
              </span>
            </Link>
          </motion.div>
        </div>
      </div>

    </section>
  );
}
