"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { ArrowUp } from "lucide-react";

export default function BottomNav({ locale: _locale }: { locale: string }) {
  const tQuotes = useTranslations("home.firmIntro");
  const [scrollProgress, setScrollProgress] = useState(0);

  const quotes = tQuotes.raw("quotes") as Array<{ text: string; author: string }>;
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setQuoteIndex(Math.floor(Math.random() * quotes.length));
    setIsMounted(true);
  }, [quotes.length]);

  const dailyQuote = isMounted ? quotes[quoteIndex] : quotes[0];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setScrollProgress((scrollTop / scrollHeight) * 100);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <nav className="fixed bottom-0 w-full z-40 bg-ink/90 backdrop-blur-sm border-t border-gold/10 hidden lg:block">
      <div className="container mx-auto px-12 py-4 flex items-center justify-between">

        {/* Legal Quote */}
        <div
          className="flex-1 max-w-2xl transition-opacity duration-700"
          style={{ opacity: isMounted ? 1 : 0 }}
        >
          <p className="text-base lg:text-lg text-parchment/70 italic font-serif leading-snug">
            &ldquo;{dailyQuote.text}&rdquo;
          </p>
          <p className="text-xs text-gold/60 mt-1.5 tracking-widest uppercase">
            — {dailyQuote.author}
          </p>
        </div>

        {/* Scroll to Top */}
        <button
          onClick={scrollToTop}
          className="relative w-12 h-12 rounded-full flex items-center justify-center text-parchment/70 hover:text-gold transition-colors group ml-8 flex-shrink-0"
          aria-label="Back to top"
        >
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 48 48">
            <circle
              cx="24"
              cy="24"
              r={radius}
              stroke="currentColor"
              strokeWidth="1.5"
              fill="transparent"
              className="text-parchment/20 group-hover:text-gold/30 transition-colors"
            />
            <circle
              cx="24"
              cy="24"
              r={radius}
              stroke="currentColor"
              strokeWidth="2"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="text-gold/60 transition-colors"
            />
          </svg>
          <ArrowUp size={20} className="relative z-10" />
        </button>
      </div>
    </nav>
  );
}
