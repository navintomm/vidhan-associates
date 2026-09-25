"use client";

import { ArrowUp, Code2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Footer({ locale }: { locale: string }) {
 const t = useTranslations("footer");

 const scrollToTop = () => {
 window.scrollTo({ top: 0, behavior: "smooth" });
 };

 return (
 <footer className="bg-parchment text-ink relative overflow-hidden min-h-screen flex flex-col justify-between pt-24 px-8 lg:px-16">
 
 <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 flex-grow relative z-10">
 
 {/* LEFT COLUMN: Firm Info & Developer Credit */}
 <div className="flex flex-col h-full">
 
 {/* Brand/Logo Area (Top) */}
 <div className="mt-8 mb-auto">
 <h2 className="text-3xl md:text-4xl font-serif tracking-widest uppercase text-ink mb-6">
 Vidhan<br/>
 <span className="text-xl md:text-2xl text-gold">Law Chambers</span>
 </h2>
 <p className="text-base md:text-lg text-ink/75 font-sans leading-relaxed max-w-sm">
 {t("info.description")}
 </p>
 </div>

 {/* Copyright & Developer Credit (Bottom) */}
 <div className="pb-8 lg:pb-32 mt-24 flex flex-col gap-6">
 <div className="flex items-center gap-3 text-sm text-ink/50 font-sans">
 <p>{t("info.copyright", { year: new Date().getFullYear() })}</p>
 </div>
 
 {/* Premium Developer Badge */}
 <a 
 href="https://www.linkedin.com/in/navin-tom-babu-523165303" 
 target="_blank"
 rel="noopener noreferrer"
 className="group flex items-center gap-4 w-fit p-2 pr-6 rounded-full border border-ink/10 hover:border-gold/40 bg-white/40 hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md"
 >
 <div className="w-10 h-10 rounded-full bg-ink flex items-center justify-center text-parchment group-hover:bg-gold transition-colors">
 <Code2 size={18} strokeWidth={1.5} />
 </div>
 <div className="flex flex-col">
 <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-ink/40 group-hover:text-gold transition-colors">Engineered By</span>
 <span className="text-sm font-serif font-medium text-ink tracking-wide">Navin Tom Babu</span>
 </div>
 </a>
 </div>

 </div>

 {/* CENTER COLUMN: Back to Top */}
 <div className="flex flex-col items-center justify-between h-full relative order-last lg:order-none w-full">
 <button 
 onClick={scrollToTop}
 className="flex flex-col items-center gap-4 hover:text-gold transition-colors group z-20 mb-12 lg:mt-32 lg:mb-0"
 >
 <ArrowUp size={28} strokeWidth={1.5} className="group-hover:-translate-y-2 transition-transform" />
 <span className="text-sm md:text-base font-bold tracking-[0.25em] uppercase">{t("backToTop")}</span>
 </button>

 {/* Massive Scale Image anchored to bottom */}
 <div className="relative lg:absolute lg:bottom-0 lg:left-1/2 lg:-translate-x-1/2 w-[70%] md:w-[60%] lg:w-[130%] pointer-events-none flex items-end justify-center">
 <Image 
 src="/images/icons/scale-of-justice-transparent.png" 
 alt="Scale of Justice"
 width={1000}
 height={1000}
 className="w-full h-auto object-contain drop-shadow-2xl opacity-90 lg:translate-y-[5%]"
 />
 </div>
 </div>

 {/* RIGHT COLUMN: Contact & Socials */}
 <div className="flex flex-col justify-between h-full lg:pl-16">
 
 {/* Contact Details */}
 <div className="flex flex-col mt-8">
 <div className="border-t border-ink/20 py-6 flex flex-col items-start">
 <p className="text-xs md:text-sm font-bold tracking-widest uppercase text-gold mb-2 break-words w-full">{t("contact.phoneTitle")}</p>
 <a href="https://wa.me/917907139328" target="_blank" rel="noopener noreferrer" className="text-lg md:text-xl font-sans tracking-wide mb-1 break-words hover:text-gold transition-colors block w-fit">{t("contact.phone1")}</a>
 <a href="https://wa.me/919633749958" target="_blank" rel="noopener noreferrer" className="text-lg md:text-xl font-sans tracking-wide mb-1 break-words hover:text-gold transition-colors block w-fit">{t("contact.phone2")}</a>
 <a href="https://wa.me/918606723820" target="_blank" rel="noopener noreferrer" className="text-lg md:text-xl font-sans tracking-wide break-words hover:text-gold transition-colors block w-fit">{t("contact.phone3")}</a>
 </div>
 <div className="border-t border-ink/20 py-6">
 <p className="text-xs md:text-sm font-bold tracking-widest uppercase text-gold mb-2 break-words">Email Address</p>
 <a href="mailto:vidhanlawchamberskerala@gmail.com" className="text-base md:text-lg font-sans tracking-wide break-words hover:text-gold transition-colors">vidhanlawchamberskerala@gmail.com</a>
 </div>
 <div className="border-t border-ink/20 py-6">
 <p className="text-xs md:text-sm font-bold tracking-widest uppercase text-gold mb-2 break-words">{t("contact.ernakulamTitle")}</p>
 <p className="text-base md:text-lg font-sans leading-relaxed break-words">{t("contact.ernakulamAddress")}</p>
 </div>
 <div className="border-t border-b border-ink/20 py-6">
 <p className="text-xs md:text-sm font-bold tracking-widest uppercase text-gold mb-2 break-words">{t("contact.thrissurTitle")}</p>
 <p className="text-base md:text-lg font-sans leading-relaxed break-words">{t("contact.thrissurAddress")}</p>
 </div>
 </div>

 {/* Social Links */}
 <div className="flex flex-col mt-16 lg:mt-auto pb-4 lg:pb-32">
 <div className="border-t border-ink/20 py-6">
 <a href="#" className="text-lg md:text-xl font-serif tracking-widest uppercase hover:text-gold transition-colors font-medium">{t("social.linkedin")}</a>
 </div>
 <div className="border-t border-b border-ink/20 py-6">
 <a href="#" className="text-lg md:text-xl font-serif tracking-widest uppercase hover:text-gold transition-colors font-medium">{t("social.x")}</a>
 </div>
 </div>

 </div>

 </div>
 </footer>
 );
}
