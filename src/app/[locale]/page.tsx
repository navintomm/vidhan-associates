import HomeHero from "@/components/HomeHero";
import FirmIntro from "@/components/FirmIntro";
import SectionDivider from "@/components/SectionDivider";
import PracticeShowcase from "@/components/PracticeShowcase";
import FirmNumbers from "@/components/FirmNumbers";
import InsightsCarousel from "@/components/InsightsCarousel";
import LandingSplash from "@/components/LandingSplash";

export default function Home({ params: { locale } }: { params: { locale: string } }) {

 return (
 <div>
 <LandingSplash />

 {/* 1. Dark cinematic hero */}
 <div className="bg-parchment">
 <HomeHero locale={locale} />
 </div>

 {/* 2. Firm intro — parchment break */}
 <FirmIntro locale={locale} />

 {/* 3. Gold divider */}
 <div className="bg-parchment">
 <SectionDivider />

 {/* 4. Practice areas — pinned scrollytelling */}
 <PracticeShowcase />

 {/* 5. Stats counters */}
 <FirmNumbers />

 {/* 6. Blog / perspectives strip */}
 <InsightsCarousel locale={locale} />

 {/* Bottom padding for BottomNav */}
 <div className="pb-14 lg:pb-20" />
 </div>
 </div>
 );
}
