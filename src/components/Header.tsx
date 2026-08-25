"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";

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
  const tQuotes = useTranslations("home.firmIntro");

  const quotes = tQuotes.raw("quotes") as Array<{ text: string; author: string }>;
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    setQuoteIndex(dayOfYear % quotes.length);
    setIsMounted(true);
  }, [quotes.length]);

  const dailyQuote = isMounted ? quotes[quoteIndex] : quotes[0];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
        scrolled ? "bg-ink/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12 py-5 grid grid-cols-3 items-center">
        {/* Left — Legal Quote */}
        <div className="hidden lg:block max-w-xs transition-opacity duration-500" style={{ opacity: isMounted ? 1 : 0.4 }}>
          <p className="text-sm lg:text-base text-parchment/60 italic font-serif leading-snug">
            &ldquo;{dailyQuote.text}&rdquo;
          </p>
          <p className="text-xs text-parchment/40 mt-1">
            — {dailyQuote.author}
          </p>
        </div>

        {/* Center — Logo */}
        <div className="col-span-2 lg:col-span-1 flex justify-start lg:justify-center">
          <a href={`/${locale}`} className="text-2xl lg:text-3xl font-serif text-parchment tracking-tight">
            Vidhan<span className="text-gold">.</span>
          </a>
        </div>

        {/* Right — Actions */}
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={toggleLanguage}
            className="text-xs font-medium tracking-wide-xl uppercase text-parchment/60 hover:text-gold transition-colors border border-parchment/20 hover:border-gold/50 rounded-full px-3 py-1.5"
          >
            {locale === "en" ? "MAL" : "ENG"}
          </button>

          <a
            href={`/${locale}/contact`}
            className="hidden md:inline-block text-xs tracking-wide-xl uppercase text-parchment/80 hover:text-gold transition-colors border border-parchment/20 hover:border-gold/50 rounded-full px-5 py-2"
          >
            {tHeader("cta")}
          </a>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-10 h-10 rounded-full border border-parchment/20 hover:border-gold/50 flex items-center justify-center text-parchment/70 hover:text-gold transition-colors"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Quote — appears below the header when not scrolled */}
      <div className={`lg:hidden absolute top-full left-0 w-full px-6 pt-2 pb-4 transition-all duration-500 pointer-events-none ${scrolled ? 'opacity-0 -translate-y-4' : 'opacity-100 translate-y-0'}`}>
        <p className="text-sm text-parchment/60 italic font-serif leading-snug text-center">
          &ldquo;{dailyQuote.text}&rdquo;
        </p>
        <p className="text-[10px] text-parchment/40 mt-1 uppercase tracking-widest text-center">
          — {dailyQuote.author}
        </p>
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
            className="fixed inset-0 bg-ink z-[10000] flex flex-col items-center justify-center"
          >
            {/* Close Button (top-right) */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full border border-parchment/20 flex items-center justify-center text-parchment/70 hover:text-gold transition-colors"
            >
              <X size={18} />
            </button>

            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link) => (
                <motion.a
                  key={link.key}
                  variants={linkVariants}
                  href={`/${locale}${link.href === "/" ? "" : link.href}`}
                  className="text-3xl md:text-4xl font-serif text-parchment hover:text-gold transition-colors tracking-wide"
                  onClick={() => setIsOpen(false)}
                >
                  {tNav(link.key)}
                </motion.a>
              ))}
            </nav>

            <motion.div variants={linkVariants} className="mt-10">
              <a
                href={`/${locale}/contact`}
                onClick={() => setIsOpen(false)}
                className="border border-gold text-gold hover:bg-gold hover:text-ink transition-colors px-8 py-4 tracking-wide-xl uppercase text-sm"
              >
                {tHeader("cta")}
              </a>
            </motion.div>

            <motion.div variants={linkVariants} className="mt-12 text-center max-w-xs px-4">
              <p className="text-sm text-parchment/60 italic font-serif leading-snug">
                &ldquo;{dailyQuote.text}&rdquo;
              </p>
              <p className="text-[10px] text-parchment/40 mt-2 uppercase tracking-widest">
                — {dailyQuote.author}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
