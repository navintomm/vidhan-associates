"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { ArrowUp } from "lucide-react";

const navItems = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "practiceAreas", href: "/practice-areas" },
  { key: "caseExperience", href: "/case-experience" },
  { key: "blog", href: "/blog" },
  { key: "careers", href: "/careers" },
  { key: "contact", href: "/contact" },
];

export default function BottomNav({ locale }: { locale: string }) {
  const t = useTranslations("nav");
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setScrollProgress((scrollTop / scrollHeight) * 100);
      }
    };
    
    // Initial calculation
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
      <div className="container mx-auto px-12 py-3 flex items-center justify-between">
        <div className="flex items-center gap-10">
          {navItems.map((item) => (
            <a
              key={item.key}
              href={`/${locale}${item.href === "/" ? "" : item.href}`}
              className="text-[11px] tracking-wide-xl uppercase text-mist hover:text-gold transition-colors duration-300"
            >
              {t(item.key)}
            </a>
          ))}
        </div>

        <button
          onClick={scrollToTop}
          className="relative w-12 h-12 rounded-full flex items-center justify-center text-parchment/70 hover:text-gold transition-colors group"
          aria-label="Back to top"
        >
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 48 48">
            {/* Background circle */}
            <circle
              cx="24"
              cy="24"
              r={radius}
              stroke="currentColor"
              strokeWidth="1.5"
              fill="transparent"
              className="text-parchment/20 group-hover:text-gold/30 transition-colors"
            />
            {/* Progress circle */}
            <circle
              cx="24"
              cy="24"
              r={radius}
              stroke="#ffffff"
              strokeWidth="2"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </svg>
          <ArrowUp size={20} className="relative z-10" />
        </button>
      </div>
    </nav>
  );
}
