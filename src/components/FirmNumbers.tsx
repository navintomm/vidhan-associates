"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "@/lib/gsap";


function CountUp({
  target,
  suffix,
  duration = 2,
}: {
  target: number;
  suffix: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.matchMedia();
    ctx.add("(prefers-reduced-motion: no-preference)", () => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !triggered.current) {
            triggered.current = true;
            const obj = { val: 0 };
            gsap.to(obj, {
              val: target,
              duration,
              ease: "power2.out",
              onUpdate: () => {
                if (ref.current) {
                  ref.current.textContent = Math.round(obj.val) + suffix;
                }
              },
            });
          }
        },
        { threshold: 0.3 }
      );
      if (ref.current) observer.observe(ref.current);
      return () => observer.disconnect();
    });

    // Fallback for reduced-motion: just show the final value immediately
    ctx.add("(prefers-reduced-motion: reduce)", () => {
      if (ref.current) ref.current.textContent = target + suffix;
    });

    return () => ctx.revert();
  }, [target, suffix, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      0{suffix}
    </span>
  );
}

export default function FirmNumbers() {
  const t = useTranslations("home.firmNumbers");

  const statData = [
    { value: parseInt(t("years.value")), suffix: t("years.suffix"), label: t("years.label") },
    { value: parseInt(t("cases.value")), suffix: t("cases.suffix"), label: t("cases.label") },
    { value: parseInt(t("clients.value")), suffix: t("clients.suffix"), label: t("clients.label") },
    { value: parseInt(t("areas.value")), suffix: t("areas.suffix"), label: t("areas.label") },
  ];

  return (
    <section className="bg-ink py-24 md:py-32 px-6 lg:px-12 border-t border-gold/10">
      <div className="container mx-auto max-w-5xl">
        {/* Section label */}
        <p className="text-xs md:text-sm tracking-wide-2xl uppercase text-gold/50 text-center mb-16">
          {t("label")}
        </p>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
          {statData.map((stat, i) => (
            <div
              key={i}
              className={`flex flex-col items-center py-8 ${
                i < statData.length - 1 ? "md:border-r border-gold/10" : ""
              } ${i < 2 ? "border-b md:border-b-0 border-gold/10" : ""}`}
            >
              <span className="text-6xl md:text-7xl font-serif text-parchment leading-none mb-4">
                <CountUp target={stat.value} suffix={stat.suffix} />
              </span>
              <span className="text-xs md:text-sm tracking-wide-xl uppercase text-mist text-center">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
