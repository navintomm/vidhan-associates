"use client";

import { ArrowUp } from "lucide-react";

export default function Footer({ locale }: { locale: string }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-ink text-parchment pt-20 pb-10 lg:pb-20 px-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-slate/50 pb-12 mb-8">
        
        {/* Brand */}
        <div className="col-span-1 md:col-span-1">
          <a href={`/${locale}`} className="text-3xl font-serif text-parchment mb-4 block">
            Vidhan<span className="text-gold">.</span>
          </a>
          <p className="text-mist text-sm max-w-xs mt-4">
            Professional legal advocacy and consultation.
          </p>
        </div>

        {/* Contact details */}
        <div className="col-span-1">
          <h4 className="text-sm tracking-widest uppercase text-gold mb-6">Contact</h4>
          <ul className="space-y-4 text-mist text-sm">
            <li>+91 98765 43210</li>
            <li>consult@vidhan.test</li>
            <li>Kochi, Kerala</li>
          </ul>
        </div>

        {/* Quick Links */}
        <div className="col-span-1">
          <h4 className="text-sm tracking-widest uppercase text-gold mb-6">Quick Links</h4>
          <ul className="space-y-4 text-mist text-sm">
            <li><a href={`/${locale}/practice-areas`} className="hover:text-parchment transition-colors">Practice Areas</a></li>
            <li><a href={`/${locale}/case-experience`} className="hover:text-parchment transition-colors">Case Experience</a></li>
            <li><a href={`/${locale}/careers`} className="hover:text-parchment transition-colors">Careers</a></li>
          </ul>
        </div>

        {/* CTA */}
        <div className="col-span-1">
          <h4 className="text-sm tracking-widest uppercase text-gold mb-6">Consultation</h4>
          <p className="text-mist text-sm mb-6">Schedule an appointment or reach out via WhatsApp.</p>
          <a 
            href={`/${locale}/contact`}
            className="bg-seal hover:bg-seal/90 transition-colors text-parchment px-6 py-3 rounded text-sm tracking-widest uppercase inline-block"
          >
            Book a Consultation
          </a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between text-xs text-mist">
        <p>&copy; {new Date().getFullYear()} Vidhan Associates. All rights reserved.</p>
        <button 
          onClick={scrollToTop}
          className="mt-6 md:mt-0 flex items-center gap-2 hover:text-gold transition-colors"
        >
          Back to Top <ArrowUp size={14} />
        </button>
      </div>
    </footer>
  );
}
