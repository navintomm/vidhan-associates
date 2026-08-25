import HomeHero from "@/components/HomeHero";
import FirmIntro from "@/components/FirmIntro";
import SectionDivider from "@/components/SectionDivider";
import PracticeShowcase from "@/components/PracticeShowcase";
import FirmNumbers from "@/components/FirmNumbers";
import LegalPerspectives from "@/components/LegalPerspectives";

export default function Home({ params: { locale } }: { params: { locale: string } }) {
  return (
    <div>
      {/* 1. Dark cinematic hero */}
      <div className="bg-ink">
        <HomeHero locale={locale} />
      </div>

      {/* 2. Firm intro — parchment break */}
      <FirmIntro locale={locale} />

      {/* 3. Gold divider */}
      <div className="bg-ink">
        <SectionDivider />

        {/* 4. Practice areas — pinned scrollytelling */}
        <PracticeShowcase />

        {/* 5. Stats counters */}
        <FirmNumbers />

        {/* 6. Blog / perspectives strip */}
        <LegalPerspectives locale={locale} />

        {/* Bottom padding for BottomNav */}
        <div className="pb-14 lg:pb-20" />
      </div>
    </div>
  );
}
