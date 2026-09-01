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
      <div className="relative z-20 container mx-auto px-6 lg:px-12 w-full h-full flex flex-col pt-28 md:pt-32 pb-16 md:pb-24 justify-between">

        {/* Top — Motto (Changed to Black / text-ink) */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="w-full flex flex-col items-center justify-center text-center mt-2 md:mt-4"
        >
          <span className="text-ink/60 tracking-[0.4em] uppercase text-sm md:text-base font-sans mb-1 font-bold">
            The
          </span>
          <p className="text-ink tracking-[0.35em] md:tracking-[0.45em] uppercase text-3xl md:text-4xl lg:text-5xl font-sans font-black">
            Pursuit of Justice
          </p>
        </motion.div>

        {/* Center-Left — Gold Vidhan Logo (Isolated on Left) */}
        <div className="my-auto flex flex-col justify-center items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.3 }}
            className="w-full max-w-[340px] sm:max-w-[400px] md:max-w-[480px] lg:max-w-[540px] flex flex-col items-start"
          >
            <div className="w-full flex flex-col items-center">
              <Image
                src="/logo.png.png"
                alt="Vidhan Law Chambers"
                width={540}
                height={210}
                className="w-full h-auto object-contain drop-shadow-md"
                priority
              />
              <p className="mt-4 text-gold tracking-[0.25em] uppercase text-xs md:text-sm font-bold text-center">
                Advocates and Legal Consultants
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom-Right — Schedule a Consultation CTA */}
        <div className="flex flex-col md:flex-row md:items-end justify-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.7 }}
            className="flex-shrink-0"
          >
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
