"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";

export default function FirmIntro({ locale }: { locale: string }) {
  const t = useTranslations("home.firmIntro");

  return (
    <section className="bg-parchment py-24 md:py-36 px-6 lg:px-12">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">

          {/* Left — Blockquote */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="relative"
          >
            {/* Vertical gold rule */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-gold/40" />
            <div className="pl-8">
              <p className="text-[11px] tracking-wide-2xl uppercase text-gold/60 mb-6">
                Guiding Principle
              </p>
              <blockquote className="text-3xl md:text-4xl font-serif text-ink leading-snug italic mb-6">
                &ldquo;{t("quote")}&rdquo;
              </blockquote>
              <p className="text-xs tracking-wide-xl uppercase text-mist">
                — {t("quoteAuthor")}
              </p>
            </div>
          </motion.div>

          {/* Right — Firm description */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
          >
            <p className="text-[11px] tracking-wide-2xl uppercase text-gold/60 mb-6">
              The Firm
            </p>
            <h2 className="text-2xl md:text-3xl font-serif text-ink leading-tight mb-8">
              {t("heading")}
            </h2>
            <p className="text-slate/70 font-sans leading-relaxed mb-5 text-base">
              {t("body1")}
            </p>
            <p className="text-slate/70 font-sans leading-relaxed mb-10 text-base">
              {t("body2")}
            </p>

            <a
              href={`/${locale}/about`}
              className="group inline-flex items-center gap-3 text-xs tracking-wide-xl uppercase text-ink hover:text-gold transition-colors"
            >
              <span>{t("cta")}</span>
              <span className="w-8 h-8 rounded-full border border-ink/20 group-hover:border-gold/50 flex items-center justify-center transition-colors">
                <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
              </span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
