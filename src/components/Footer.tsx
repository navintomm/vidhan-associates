"use client";

import { ArrowUp } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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
              <Link 
                key={item}
                href={
                  item === 'HOME' ? `/${locale}` : 
                  `/${locale}/${item.toLowerCase().replace(' ', '-')}`
                }
                className="text-xl lg:text-2xl tracking-[0.3em] font-serif hover:text-gold transition-colors w-fit"
              >
                {item}
              </Link>
            ))}
          </nav>

          {/* Firm Info & Copyright */}
          <div className="mt-24 lg:mt-auto pb-8 lg:pb-32 max-w-xs">
            <p className="text-sm text-parchment/60 font-sans leading-relaxed mb-8">
              Law, strategy, and timing. An independent legal and advisory platform offering integrated, strategic counsel to our clients at their most critical decisions.
            </p>
            <div className="flex items-center gap-3 text-xs text-parchment/40">
              <p>&copy; {new Date().getFullYear()} Vidhan Law Chambers. All rights reserved.</p>
            </div>
          </div>
        </div>

        {/* CENTER COLUMN: Back to Top */}
        <div className="flex flex-col items-center justify-between h-full relative order-last lg:order-none w-full">
          <button 
            onClick={scrollToTop}
            className="flex flex-col items-center gap-4 hover:text-gold transition-colors group z-20 mb-12 lg:mt-32 lg:mb-0"
          >
            <ArrowUp size={24} strokeWidth={1} className="group-hover:-translate-y-2 transition-transform" />
            <span className="text-sm tracking-[0.3em] uppercase">BACK TO TOP</span>
          </button>

          {/* Massive Scale Image anchored to bottom */}
          <div className="relative lg:absolute lg:bottom-0 lg:left-1/2 lg:-translate-x-1/2 w-[70%] md:w-[60%] lg:w-[130%] pointer-events-none flex items-end justify-center">
            <Image 
              src="/images/icons/scale-of-justice-transparent.png" 
              alt="Scale of Justice"
              width={1000}
              height={1000}
              className="w-full h-auto object-contain drop-shadow-2xl opacity-90 lg:translate-y-[5%]"
            />
          </div>
        </div>

        {/* RIGHT COLUMN: Contact & Socials */}
        <div className="flex flex-col justify-between h-full lg:pl-16">
          
          {/* Contact Details */}
          <div className="flex flex-col mt-8">
            <div className="border-t border-parchment/20 py-6">
              <p className="text-xs tracking-widest uppercase text-parchment/50 mb-2">PHONE NUMBERS</p>
              <p className="text-base tracking-widest mb-1">+91 7907139328 (Adv. Rohit)</p>
              <p className="text-base tracking-widest mb-1">+91 9633749958 (Adv. Antony)</p>
              <p className="text-base tracking-widest">+91 8606723820 (Adv. Rones)</p>
            </div>
            <div className="border-t border-parchment/20 py-6">
              <p className="text-xs tracking-widest uppercase text-parchment/50 mb-2">ERNAKULAM OFFICE</p>
              <p className="text-base tracking-widest leading-relaxed">New Emerald Building, Power House Road, Near High Court of Kerala, Kochi - 682018</p>
            </div>
            <div className="border-t border-b border-parchment/20 py-6">
              <p className="text-xs tracking-widest uppercase text-parchment/50 mb-2">THRISSUR OFFICE</p>
              <p className="text-base tracking-widest leading-relaxed">S21, 1st Floor, Alukkas Castle, Ayyanthole P.O., Thrissur - 680003</p>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex flex-col mt-16 lg:mt-auto pb-4 lg:pb-32">
            <div className="border-t border-parchment/20 py-6">
              <a href="#" className="text-base tracking-widest uppercase hover:text-gold transition-colors">LINKEDIN</a>
            </div>
            <div className="border-t border-b border-parchment/20 py-6">
              <a href="#" className="text-base tracking-widest uppercase hover:text-gold transition-colors">X.COM</a>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
}
