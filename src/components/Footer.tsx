"use client";

import { ArrowUp } from "lucide-react";

export default function Footer({ locale }: { locale: string }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-ink text-parchment relative overflow-hidden min-h-screen flex flex-col justify-between pt-24 px-8 lg:px-16">
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 flex-grow relative z-10">
        
        {/* LEFT COLUMN: Navigation & Info */}
        <div className="flex flex-col justify-between h-full">
          {/* Navigation */}
          <nav className="flex flex-col gap-6 mt-8">
            {['HOME', 'ABOUT', 'PRACTICE AREAS', 'CASE EXPERIENCE', 'INSIGHTS', 'TEAM', 'CAREERS', 'CONTACT'].map((item) => (
              <a 
                key={item}
                href={
                  item === 'HOME' ? `/${locale}` : 
                  `/${locale}/${item.toLowerCase().replace(' ', '-')}`
                }
                className="text-lg lg:text-xl tracking-[0.3em] font-serif hover:text-gold transition-colors w-fit"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Firm Info & Copyright */}
          <div className="mt-24 lg:mt-auto pb-8 max-w-xs">
            <p className="text-xs text-parchment/60 font-sans leading-relaxed mb-8">
              Law, strategy, and timing. An independent legal and advisory platform offering integrated, strategic counsel to our clients at their most critical decisions.
            </p>
            <p className="text-[10px] text-parchment/40">
              &copy; {new Date().getFullYear()} Vidhan Associates. All rights reserved.
            </p>
          </div>
        </div>

        {/* CENTER COLUMN: Back to Top */}
        <div className="flex flex-col items-center justify-between h-full relative order-last lg:order-none w-full">
          <button 
            onClick={scrollToTop}
            className="flex flex-col items-center gap-4 hover:text-gold transition-colors group z-20 mb-12 lg:mt-32 lg:mb-0"
          >
            <ArrowUp size={24} strokeWidth={1} className="group-hover:-translate-y-2 transition-transform" />
            <span className="text-xs tracking-[0.3em] uppercase">BACK TO TOP</span>
          </button>

          {/* Massive Scale Image anchored to bottom */}
          <div className="relative lg:absolute lg:bottom-0 lg:left-1/2 lg:-translate-x-1/2 w-[70%] md:w-[60%] lg:w-[130%] pointer-events-none flex items-end justify-center">
            <img 
              src="/images/icons/scale-of-justice-transparent.png" 
              alt="Scale of Justice"
              className="w-full h-auto object-contain drop-shadow-2xl opacity-90 lg:translate-y-[5%]"
            />
          </div>
        </div>

        {/* RIGHT COLUMN: Contact & Socials */}
        <div className="flex flex-col justify-between h-full lg:pl-16">
          
          {/* Contact Details */}
          <div className="flex flex-col mt-8">
            <div className="border-t border-parchment/20 py-6">
              <p className="text-[10px] tracking-widest uppercase text-parchment/50 mb-2">E-MAIL ADDRESS</p>
              <a href="mailto:consult@vidhan.test" className="text-sm tracking-widest hover:text-gold transition-colors">CONSULT@VIDHAN.TEST</a>
            </div>
            <div className="border-t border-parchment/20 py-6">
              <p className="text-[10px] tracking-widest uppercase text-parchment/50 mb-2">PHONE NUMBER</p>
              <p className="text-sm tracking-widest">+91 98765 43210</p>
            </div>
            <div className="border-t border-b border-parchment/20 py-6">
              <p className="text-[10px] tracking-widest uppercase text-parchment/50 mb-2">LOCATION</p>
              <p className="text-sm tracking-widest">KOCHI / KERALA</p>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex flex-col mt-16 lg:mt-auto pb-4 lg:pb-12">
            <div className="border-t border-parchment/20 py-6">
              <a href="#" className="text-sm tracking-widest uppercase hover:text-gold transition-colors">LINKEDIN</a>
            </div>
            <div className="border-t border-b border-parchment/20 py-6">
              <a href="#" className="text-sm tracking-widest uppercase hover:text-gold transition-colors">X.COM</a>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
}
