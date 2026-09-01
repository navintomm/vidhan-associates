"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function HomeHero({ locale }: { locale: string }) {
 const t = useTranslations("home.hero");

 return (
 <section className="relative w-full h-screen overflow-hidden flex items-end pb-24 md:pb-32 bg-parchment">

 {/* Background � subtle gold radial glow for warmth on white */}
 <div className="absolute inset-0 z-0 pointer-events-none"
 style={{
 backgroundImage: `radial-gradient(ellipse 80% 60% at 70% 50%, rgba(230,175,46,0.07) 0%, transparent 70%)`,
 }}
 />

 {/* Content */}
 <div className="relative z-20 container mx-auto px-6 lg:px-12 w-full h-full flex flex-col pt-32 pb-24 md:pb-32">

 {/* Top � Motto */}
 <motion.div
 initial={{ opacity: 0, y: -20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
 className="w-full flex flex-col items-center justify-center text-center"
 >
 <span className="text-gold/50 tracking-[0.4em] uppercase text-xs md:text-sm font-sans mb-1">
 The
 </span>
 <p className="text-gold tracking-[0.4em] uppercase text-xl md:text-3xl font-sans font-light">
 Pursuit of Justice
 </p>
 </motion.div>

 {/* Center � Logo */}
 <div className="flex-grow flex flex-col justify-center">
 <motion.div
 initial={{ opacity: 0, y: 40 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.9, ease: "easeOut", delay: 0.3 }}
 className="w-full flex flex-col justify-start"
 >
 <div className="w-full max-w-[400px] md:max-w-[500px] -ml-2 flex flex-col items-center">
 <Image
 src="/logo.png.png"
 alt="Vidhan Law Chambers"
 width={600}
 height={240}
 className="w-full h-auto object-contain"
 priority
 />
 <p className="mt-4 text-gold tracking-[0.2em] uppercase text-[10px] md:text-xs font-medium text-center">
 Advocates and Legal Consultants
 </p>
 </div>
 </motion.div>
 </div>

 {/* Bottom � CTA */}
 <div className="flex flex-col md:flex-row md:items-end justify-end gap-10">
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.8, ease: "easeOut", delay: 0.7 }}
 className="flex-shrink-0 pb-8 md:pb-0"
 >
 <Link
 href={`/${locale}/contact`}
 className="group inline-flex items-center gap-4 text-ink/70 hover:text-gold transition-colors"
 >
 <span className="text-base tracking-wide-xl uppercase">{t("cta")}</span>
 <span className="w-14 h-14 rounded-full border border-ink/20 group-hover:border-gold/60 flex items-center justify-center transition-colors">
 <ArrowRight size={20} className="group-hover:translate-x-0.5 transition-transform" />
 </span>
 </Link>
 </motion.div>
 </div>
 </div>

 </section>
 );
}
