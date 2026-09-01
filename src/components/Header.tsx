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
 scrolled ? "bg-parchment/95 backdrop-blur-md shadow-sm" : "bg-transparent"
 }`}
 >
 <div className={`container mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between transition-all duration-500 ${scrolled ? 'py-2.5' : 'py-4 lg:py-5'}`}>
 {/* 1. Left — Logo */}
 <Link href={`/${locale}`} className="flex items-center shrink-0">
 <Image
 src="/logo.png.png"
 alt="Vidhan Law Chambers Logo"
 width={scrolled ? 110 : 135}
 height={scrolled ? 38 : 48}
 className="object-contain transition-all duration-500"
 priority
 />
 </Link>

 {/* 2. Center — Nav links in same parallel line */}
 <nav className="hidden lg:flex items-center gap-5 xl:gap-7 2xl:gap-9 mx-2">
 {navLinks.map((link) => (
 <Link
 key={link.key}
 href={`/${locale}${link.href === "/" ? "" : link.href}`}
 className="text-xs xl:text-sm 2xl:text-base font-bold tracking-[0.14em] xl:tracking-[0.18em] uppercase text-ink hover:text-gold transition-colors duration-300 whitespace-nowrap"
 >
 {tNav(link.key)}
 </Link>
 ))}
 </nav>

 {/* 3. Right — Actions (Consult + MAL + Mobile Menu) */}
 <div className="flex items-center gap-3 sm:gap-4 shrink-0">
 <Link
 href={`/${locale}/contact`}
 className={`hidden md:inline-flex group items-center gap-2.5 text-xs sm:text-sm font-bold tracking-widest uppercase text-ink hover:text-gold transition-all border border-ink/30 hover:border-gold bg-white/70 backdrop-blur-sm rounded-full ${scrolled ? 'px-4 py-1.5' : 'px-6 py-2.5'} shadow-sm`}
 >
 <span>Consult</span>
 <span className="relative w-4 h-4 overflow-hidden flex items-center justify-center">
 <ArrowRight size={13} className="absolute transition-transform duration-500 ease-in-out group-hover:translate-x-6 group-active:translate-x-6" />
 <ArrowRight size={13} className="absolute -translate-x-6 transition-transform duration-500 ease-in-out group-hover:translate-x-0 group-active:translate-x-0" />
 </span>
 </Link>

 {/* Language Switcher */}
 <div className="relative inline-block w-max shrink-0">
 <button
 onClick={toggleLanguage}
 className={`text-xs sm:text-sm font-bold tracking-widest uppercase text-ink hover:text-gold transition-all border border-ink/30 hover:border-gold bg-white/70 backdrop-blur-sm rounded-full ${scrolled ? 'px-4 py-1.5' : 'px-5 py-2.5'} shadow-sm`}
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
 className="absolute top-full right-0 mt-2 pointer-events-none drop-shadow-md z-[10001]"
 >
 <motion.div
 animate={{ y: [0, 4, 0] }}
 transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
 className="relative bg-gold text-ink text-xs font-bold whitespace-nowrap px-3.5 py-2 rounded-[4px] shadow-sm"
 >
 {/* Tooltip triangle — gold */}
 <div className="absolute -top-1.5 right-4 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[6px] border-b-gold"></div>
 മലയാളത്തിൽ വായിക്കുക
 </motion.div>
 </motion.div>
 )}
 </AnimatePresence>
 </div>

 <button
 onClick={() => setIsOpen(!isOpen)}
 className={`lg:hidden rounded-full border border-ink/30 hover:border-gold flex items-center justify-center text-ink hover:text-gold transition-colors ${scrolled ? 'w-8 h-8' : 'w-10 h-10'}`}
 aria-label="Toggle Menu"
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
