export default function BlogPage() {
  return (
    <div className="min-h-[80vh] bg-ink pt-32 md:pt-48 pb-24 flex flex-col items-center justify-center px-6 text-center">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-parchment mb-6 leading-tight">
          Legal Insights Blog
        </h1>
        <p className="text-lg md:text-xl font-serif text-parchment/70 mb-12">
          Case studies, legal updates, and articles coming soon.
        </p>
        
        <div className="inline-block border border-gold/20 bg-gold/5 rounded-full px-6 py-3 shadow-sm">
          <p className="text-xs md:text-sm tracking-widest uppercase text-gold/80">
            Content will be populated from admin panel.
          </p>
        </div>
      </div>
    </div>
  );
}
