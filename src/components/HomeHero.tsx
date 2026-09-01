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

      {/* ===== Full-Screen Enlarged Lady of Justice Background ===== */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <Image
          src="/new hero icon.png"
          alt="Lady Justice"
          fill
          className="object-cover object-[72%_center] md:object-[80%_center] lg:object-[83%_center] scale-100 md:scale-105"
          priority
        />
        {/* Soft parchment wash on the left to maintain clean logo isolation */}
        <div className="absolute inset-0 bg-gradient-to-r from-parchment/70 via-parchment/20 to-transparent pointer-events-none" />
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 lg:px-12 w-full h-full flex flex-col justify-between pt-36 md:pt-44 pb-16 md:pb-24">

        {/* Main Left-Aligned Headline & CTA */}
        <div className="my-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
            className="flex flex-col items-start"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-0.5 bg-gold" />
              <span className="text-gold tracking-[0.25em] uppercase text-xs md:text-sm font-bold">
                Advocates &amp; Legal Consultants
              </span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-ink leading-[1.06] tracking-tight mb-6">
              The Pursuit <br />
              <span className="italic font-normal text-gold">of Justice</span>
            </h1>

            <p className="text-lg md:text-xl font-sans text-slate/80 leading-relaxed max-w-lg mb-8 md:mb-10">
              Independent legal practice providing strategic counsel and principled advocacy across Kerala and beyond.
            </p>

            <Link
              href={`/${locale}/contact`}
              className="group inline-flex items-center gap-4 bg-white/95 hover:bg-gold text-ink transition-all duration-300 pl-7 md:pl-9 pr-3 md:pr-3.5 py-3 md:py-3.5 rounded-full border-2 border-gold/50 hover:border-gold shadow-lg hover:shadow-2xl hover:scale-[1.02] backdrop-blur-sm"
            >
              <span className="text-sm md:text-base lg:text-lg tracking-[0.18em] uppercase font-black">
                Schedule a Consultation
              </span>
              <span className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-ink text-gold flex items-center justify-center transition-colors relative overflow-hidden shrink-0 shadow-md">
                <ArrowRight size={20} className="absolute transition-transform duration-500 ease-in-out group-hover:translate-x-12 group-active:translate-x-12 text-gold" />
                <ArrowRight size={20} className="absolute -translate-x-12 transition-transform duration-500 ease-in-out group-hover:translate-x-0 group-active:translate-x-0 text-gold" />
              </span>
            </Link>
          </motion.div>
        </div>
      </div>

    </section>
  );
}
