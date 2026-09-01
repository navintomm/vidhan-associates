"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowRight } from "lucide-react";

const navLinks = [
 { key: "home", href: "/" },
 { key: "about", href: "/about" },
 { key: "practiceAreas", href: "/practice-areas" },
 { key: "caseExperience", href: "/case-experience" },
 { key: "blog", href: "/blog" },
 { key: "careers", href: "/careers" },
 { key: "team", href: "/team" },
 { key: "contact", href: "/contact" },
];

export default function Header({ locale }: { locale: string }) {
 const [isOpen, setIsOpen] = useState(false);
 const [scrolled, setScrolled] = useState(false);
 const pathname = usePathname();
 const router = useRouter();
 const tNav = useTranslations("nav");
 const tHeader = useTranslations("header");
 const [isMounted, setIsMounted] = useState(false);

 useEffect(() => {
 setIsMounted(true);
 }, []);

 useEffect(() => {
 const onScroll = () => setScrolled(window.scrollY > 80);
 window.addEventListener("scroll", onScroll, { passive: true });
 onScroll();
 return () => window.removeEventListener("scroll", onScroll);
 }, []);

 const isHome = pathname === "/" || pathname === "/en" || pathname === "/ml" || pathname === "/en/" || pathname === "/ml/";

 const toggleLanguage = () => {
 const nextLocale = locale === "en" ? "ml" : "en";
 const newPath = pathname.replace(`/${locale}`, `/${nextLocale}`);
 router.push(newPath);
 };

 const menuVariants: Variants = {
 closed: {
 opacity: 0,
 transition: { duration: 0.3, when: "afterChildren" },
 },
 open: {
 opacity: 1,
 transition: { duration: 0.3, when: "beforeChildren", staggerChildren: 0.07 },
 },
 };

 const linkVariants: Variants = {
 closed: { opacity: 0, y: 20 },
 open: { opacity: 1, y: 0 },
 };

 return (
 <>
 <header
 className={`fixed top-0 w-full z-[9999] transition-all duration-500 ${
 scrolled ? "bg-parchment/80 backdrop-blur-md shadow-sm" : "bg-transparent"
 }`}
 >
 {/* Top row — Nav links centered across full width */}
 <div className={`hidden lg:flex items-center justify-center gap-6 xl:gap-10 px-6 transition-all duration-500 ${scrolled ? 'pt-2 pb-1' : 'pt-5 pb-3'}`}>
 {navLinks.map((link) => (
 <Link
 key={link.key}
 href={`/${locale}${link.href === "/" ? "" : link.href}`}
 className="text-xs xl:text-sm font-medium tracking-[0.2em] uppercase text-ink/80 hover:text-gold transition-colors duration-300"
 >
 {tNav(link.key)}
 </Link>
 ))}
 </div>

 {/* Bottom row — Logo (hidden on home hero) + Actions */}
 <div className={`container mx-auto px-6 lg:px-12 flex items-center justify-between transition-all duration-500 ${scrolled ? 'pb-2' : 'pb-4'}`}>
 {/* Logo */}
 <div className={`flex items-center transition-opacity duration-500 ${isHome && !scrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
 <Link href={`/${locale}`} className="flex items-center">
 <Image
 src="/logo.png.png"
 alt="Vidhan Law Chambers Logo"
 width={scrolled ? 100 : 130}
 height={scrolled ? 35 : 46}
 className="object-contain transition-all duration-500"
 priority
 />
 </Link>
 </div>

 {/* Actions */}
 <div className="flex items-center gap-3 ml-auto">
 {/* Language Switcher */}
 <div className="relative flex items-center justify-center">
 <button
 onClick={toggleLanguage}
 className={`text-[10px] md:text-xs font-medium tracking-widest uppercase text-ink/60 hover:text-gold transition-colors border border-ink/20 hover:border-gold/50 rounded-full ${scrolled ? 'px-3 py-1' : 'px-4 py-1.5'}`}
 >
 {locale === "en" ? "MAL" : "ENG"}
 </button>
 
 <AnimatePresence>
 {locale === "en" && isMounted && (
 <motion.div
 initial={{ opacity: 0, y: -5 }}
 animate={{ opacity: 1, y: 0 }}
 exit={{ opacity: 0, y: -5 }}
 transition={{ delay: 1 }}
 className="absolute top-full left-1/2 -translate-x-1/2 mt-2 pointer-events-none drop-shadow-md z-[10001]"
 >
 <motion.div
 animate={{ y: [0, 4, 0] }}
 transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
 className="relative bg-gold text-ink text-[11px] font-semibold whitespace-nowrap px-3 py-1.5 rounded-[4px]"
 >
 {/* Tooltip triangle — gold */}
 <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[6px] border-b-gold"></div>
 മലയാളത്തിൽ വായിക്കുക
 </motion.div>
 </motion.div>
 )}
 </AnimatePresence>
 </div>

 <Link
 href={`/${locale}/contact`}
 className={`hidden md:flex group items-center gap-3 bg-[#1C1C1E] rounded-full transition-all hover:bg-black ${scrolled ? 'pl-4 pr-1 py-1' : 'pl-5 pr-1.5 py-1.5'}`}
 >
 <span className="text-white text-[10px] md:text-xs font-semibold tracking-widest uppercase">Consult</span>
 <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#E52525] flex items-center justify-center transition-transform duration-300 group-active:scale-90 shrink-0">
 <ArrowRight size={14} className="text-white -rotate-45 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-active:translate-y-1 group-active:-translate-x-1" />
 </div>
 </Link>

 <button
 onClick={() => setIsOpen(!isOpen)}
 className={`lg:hidden rounded-full border border-ink/20 hover:border-gold/50 flex items-center justify-center text-ink/70 hover:text-gold transition-colors ${scrolled ? 'w-8 h-8' : 'w-10 h-10'}`}
 >
 {isOpen ? <X size={16} /> : <Menu size={16} />}
 </button>
 </div>
 </div>

 </header>

 {/* Full-Screen Mobile Menu Overlay */}
 <AnimatePresence>
 {isOpen && (
 <motion.div
 initial="closed"
 animate="open"
 exit="closed"
 variants={menuVariants}
 className="fixed inset-0 bg-parchment z-[10000] flex flex-col items-center justify-center"
 >
 {/* Close Button (top-right) */}
 <button
 onClick={() => setIsOpen(false)}
 className="absolute top-6 right-6 w-10 h-10 rounded-full border border-ink/20 flex items-center justify-center text-ink/70 hover:text-gold transition-colors"
 >
 <X size={18} />
 </button>

 <nav className="flex flex-col items-center gap-8">
 {navLinks.map((link) => (
 <motion.div key={link.key} variants={linkVariants}>
 <Link
 href={`/${locale}${link.href === "/" ? "" : link.href}`}
 className="text-3xl md:text-4xl font-serif text-ink hover:text-gold transition-colors tracking-wide"
 onClick={() => setIsOpen(false)}
 >
 {tNav(link.key)}
 </Link>
 </motion.div>
 ))}
 </nav>

 <motion.div variants={linkVariants} className="mt-10">
 <Link
 href={`/${locale}/contact`}
 onClick={() => setIsOpen(false)}
 className="border border-gold text-gold hover:bg-gold hover:text-ink transition-colors px-8 py-4 tracking-wide-xl uppercase text-sm inline-block"
 >
 {tHeader("cta")}
 </Link>
 </motion.div>

 </motion.div>
 )}
 </AnimatePresence>
 </>
 );
}
