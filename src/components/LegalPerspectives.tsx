"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";

// Placeholder article images — monochromatic legal imagery using CSS gradients
const cardAccents = [
  "from-slate/40 to-ink",
  "from-seal/30 to-ink",
  "from-gold/20 to-ink",
  "from-slate/40 to-ink",
];

export default function LegalPerspectives({ locale }: { locale: string }) {
  const t = useTranslations("home.perspectives");
  const stripRef = useRef<HTMLDivElement>(null);

  const posts = t.raw("posts") as Array<{
    category: string;
    title: string;
    date: string;
  }>;

  return (
    <section className="bg-ink py-24 md:py-32 border-t border-gold/10 overflow-hidden">
      {/* Section Header */}
      <div className="container mx-auto px-6 lg:px-12 mb-14">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="text-[10px] tracking-wide-2xl uppercase text-gold/50 mb-4">
              {t("label")}
            </p>
            <h2 className="text-3xl md:text-4xl font-serif text-parchment leading-tight">
              {t("sublabel")}
            </h2>
          </div>
          <a
            href={`/${locale}/blog`}
            className="group inline-flex items-center gap-3 text-xs tracking-wide-xl uppercase text-parchment/50 hover:text-gold transition-colors flex-shrink-0"
          >
            <span>{t("viewAll")}</span>
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

        {/* Gold hairline */}
        <div className="mt-10 h-px bg-gold/15" />
      </div>

      {/* Horizontal Scroll Strip */}
      <div
        ref={stripRef}
        className="flex gap-6 px-6 lg:px-12 overflow-x-auto scroll-smooth pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {posts.map((post, i) => (
          <motion.article
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="group flex-shrink-0 w-72 md:w-80 cursor-pointer"
          >
            {/* Card Image Placeholder */}
            <div
              className={`relative w-full h-44 mb-5 overflow-hidden bg-gradient-to-b ${cardAccents[i]} border border-gold/10`}
            >
              {/* Decorative wax-seal emblem centered */}
              <div className="absolute inset-0 flex items-center justify-center opacity-20">
                <svg width="48" height="48" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M8 0L10 6L16 8L10 10L8 16L6 10L0 8L6 6L8 0Z"
                    fill="#A9812D"
                  />
                </svg>
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/5 transition-colors duration-500" />
              {/* Gold bottom line on hover */}
              <div className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full bg-gold/50 transition-all duration-500" />
            </div>

            {/* Card Content */}
            <p className="text-[9px] tracking-wide-2xl uppercase text-gold/60 mb-3">
              {post.category}
            </p>
            <h3 className="text-base font-serif text-parchment/90 leading-snug mb-3 group-hover:text-gold transition-colors duration-300">
              {post.title}
            </h3>
            <p className="text-[10px] tracking-wide text-mist">
              {post.date}
            </p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
