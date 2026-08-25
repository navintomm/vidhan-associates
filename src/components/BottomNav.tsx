"use client";

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
          className="w-8 h-8 rounded-full border border-parchment/20 hover:border-gold/50 flex items-center justify-center text-parchment/50 hover:text-gold transition-colors"
        >
          <ArrowUp size={14} />
        </button>
      </div>
    </nav>
  );
}
