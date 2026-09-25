"use client";

import { ArrowUp } from "lucide-react";
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
 
 {/* LEFT COLUMN: Navigation & Info */}
 <div className="flex flex-col justify-between h-full">
 {/* Developer Credit */}
 <div className="flex flex-col gap-2 mt-8 lg:mt-16">
  <p className="text-xs md:text-sm font-bold tracking-widest uppercase text-gold">Digital Architecture</p>
  <a 
  href="https://linkedin.com/in/navintombabu" 
  target="_blank"
  rel="noopener noreferrer"
  className="text-2xl lg:text-3xl tracking-[0.1em] font-serif text-ink hover:text-gold transition-colors w-fit font-medium group"
  >
  Navin Tom Babu
  <span className="block h-px w-0 bg-gold group-hover:w-full transition-all duration-500 mt-2"></span>
  </a>
  <p className="text-sm font-sans text-ink/50 mt-1">Full-Stack Engineer & Designer</p>
 </div>

 {/* Firm Info & Copyright */}
 <div className="mt-24 lg:mt-auto pb-8 lg:pb-32 max-w-sm md:max-w-md">
 <p className="text-base md:text-lg text-ink/75 font-sans leading-relaxed mb-8">
 {t("info.description")}
 </p>
 <div className="flex items-center gap-3 text-sm text-ink/50 font-sans">
 <p>{t("info.copyright", { year: new Date().getFullYear() })}</p>
 </div>
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
 <div className="border-t border-ink/20 py-6">
 <p className="text-xs md:text-sm font-bold tracking-widest uppercase text-gold mb-2 break-words">{t("contact.phoneTitle")}</p>
 <p className="text-lg md:text-xl font-sans tracking-wide mb-1 break-words">{t("contact.phone1")}</p>
 <p className="text-lg md:text-xl font-sans tracking-wide mb-1 break-words">{t("contact.phone2")}</p>
 <p className="text-lg md:text-xl font-sans tracking-wide break-words">{t("contact.phone3")}</p>
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
