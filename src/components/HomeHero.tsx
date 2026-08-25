"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * HERO_MODE: Toggle between "image" and "video" hero backgrounds.
 * - "image": Uses /images/hero-justice.jpg with Ken Burns animation
 * - "video": Uses /videos/hero.mp4 with autoplay loop
 */
const HERO_MODE: "image" | "video" = "image";

export default function HomeHero({ locale }: { locale: string }) {
  const t = useTranslations("home.hero");

  return (
    <section className="relative w-full h-screen overflow-hidden flex items-end pb-24 md:pb-32">

      {/* ===== Background Layer ===== */}
      {HERO_MODE === "video" ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
          poster="/hero-justice.png"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
      ) : (
        <div
          className="absolute inset-0 z-0 bg-cover bg-center animate-ken-burns"
          style={{ backgroundImage: "url('/hero-justice.png')" }}
        />
      )}

      {/* ===== Gradient Overlay =====
        Left third (~40%): slightly lighter — the image is already dark there (window beam).
        Right two-thirds (~60%): darker — mutes the busy statue/bookshelf detail.
        Full-width ink base ensures consistent text contrast everywhere.
      */}
      <div className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: `linear-gradient(
            to right,
            rgba(18, 20, 26, 0.55) 0%,
            rgba(18, 20, 26, 0.60) 35%,
            rgba(18, 20, 26, 0.72) 55%,
            rgba(18, 20, 26, 0.78) 100%
          )`,
        }}
      />

      {/* ===== Content — Asymmetric Layout ===== */}
      <div className="relative z-20 container mx-auto px-6 lg:px-12 w-full">
        {/* Gold Hairline */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "12rem" }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          className="h-px bg-gold/40 mb-10"
        />

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
          {/* Left — Title & Description (anchored left, ~55-60% width) */}
          <div className="md:w-[58%] max-w-2xl">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: "easeOut", delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-7xl font-serif text-parchment leading-tight mb-6"
            >
              {t("title")}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
              className="text-base md:text-lg text-parchment/60 font-sans leading-relaxed max-w-lg"
            >
              {t("description")}
            </motion.p>
          </div>

          {/* Right — CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.7 }}
            className="flex-shrink-0"
          >
            <Link
              href={`/${locale}/contact`}
              className="group inline-flex items-center gap-4 text-parchment/80 hover:text-gold transition-colors"
            >
              <span className="text-sm tracking-wide-xl uppercase">{t("cta")}</span>
              <span className="w-12 h-12 rounded-full border border-parchment/30 group-hover:border-gold/60 flex items-center justify-center transition-colors">
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>
          </motion.div>
        </div>
      </div>

    </section>
  );
}
