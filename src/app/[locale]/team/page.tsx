import TeamGallery from "@/components/TeamGallery";
export default async function TeamPage() {
  // We can't use useTranslations in an async Server Component directly in next-intl v3 without getTranslations
  // but since we aren't doing deep localization here, let's just use getTranslations.
  const { getTranslations } = await import('next-intl/server');
  const t = await getTranslations("nav");

  return (
    <main className="min-h-screen bg-ink pt-32">
      {/* Header Section */}
      <div className="container mx-auto px-6 lg:px-12 mb-16">
        <h1 className="text-5xl md:text-6xl lg:text-8xl font-serif text-parchment leading-tight mb-6">
          {t("team")}
        </h1>
        <div className="w-24 h-px bg-gold/50" />
      </div>

      {/* Grid Gallery with Interactive Modal */}
      <TeamGallery />
    </main>
  );
}
