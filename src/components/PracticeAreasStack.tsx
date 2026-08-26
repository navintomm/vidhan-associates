"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Scale, Briefcase, Landmark, User, Fingerprint } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const MOCK_CASES = [
  {
    id: "corp-01",
    category: "Corporate Litigation",
    title: "Navigating a High-Stakes Merger Dispute",
    description: "Represented a leading technology conglomerate in a complex, multi-jurisdictional hostile takeover defense, safeguarding shareholder value and corporate integrity.",
    challenge: "The hostile bidder accumulated a significant minority stake covertly, launching a sudden tender offer filled with coercive tactics aimed at panicking retail investors and pressuring institutional holders.",
    strategy: "We immediately instituted a 'poison pill' shareholder rights plan while simultaneously filing injunctions across three distinct jurisdictions to stall the tender offer on the basis of anti-trust violations and incomplete disclosures.",
    outcome: "The bidder was forced to withdraw their offer entirely. Our client successfully negotiated a friendly merger with a 'white knight' suitor six months later, resulting in a 40% premium for shareholders.",
    image: "/images/cases/case_corporate_1787754118570.jpg",
    icon: Briefcase
  },
  {
    id: "re-02",
    category: "Real Estate & Property",
    title: "Resolving a Century-Old Title Defect",
    description: "Successfully cleared the title on a prime commercial waterfront property plagued by overlapping claims from the 1920s.",
    challenge: "The property title was clouded by a complex web of unrecorded deeds, intestate successions spanning four generations, and a boundary dispute with the municipal corporation regarding reclaimed land.",
    strategy: "Conducted exhaustive genealogical research to identify and negotiate quitclaim deeds with over 40 distant heirs. We simultaneously filed a quiet title action and leveraged historical survey maps to definitively prove the boundary line against the municipality.",
    outcome: "Obtained a clear, marketable title within 14 months, allowing the client to proceed with a $250M luxury residential development project without any encumbrances.",
    image: "/images/cases/case_realestate_1787754137293.jpg",
    icon: Landmark
  },
  {
    id: "crim-03",
    category: "Criminal Defense",
    title: "Vindicating the Accused in Corporate Fraud",
    description: "Defended a C-level executive falsely accused of orchestrating a multi-million dollar accounting fraud scheme.",
    challenge: "The prosecution relied heavily on thousands of internal emails taken out of context and the testimony of a cooperating witness who was the actual architect of the fraud, seeking leniency.",
    strategy: "We engaged forensic accountants to trace the true origin of the manipulated ledger entries, proving our client was deliberately bypassed in the authorization chain. During cross-examination, we systematically dismantled the cooperating witness's credibility.",
    outcome: "Full acquittal on all 12 counts of fraud and conspiracy. The client's professional reputation was fully restored, and they later pursued a successful civil defamation claim against the accusers.",
    image: "/images/cases/case_criminal_1787754154520.jpg",
    icon: Scale
  },
  {
    id: "fam-04",
    category: "Family Law & Wealth Preservation",
    title: "Complex High-Net-Worth Asset Division",
    description: "Navigated a highly contentious divorce involving international assets, complex trusts, and valuation of closely-held businesses.",
    challenge: "The opposing party attempted to conceal assets in offshore jurisdictions and intentionally depressed the valuation of the primary marital business to minimize the equitable distribution payout.",
    strategy: "Deployed international asset tracing experts to uncover hidden accounts in the Cayman Islands. We challenged the opposing valuation expert's methodology in court, presenting our own rigorous DCF analysis that exposed their deliberate omissions.",
    outcome: "Secured a highly favorable settlement that included a 55% share of the marital estate for our client, full ownership of the primary residence, and an ironclad alimony agreement.",
    image: "/images/cases/case_family_1787754172004.jpg",
    icon: User
  },
  {
    id: "ip-05",
    category: "Intellectual Property",
    title: "Defending a Disruptive Patent Portfolio",
    description: "Protected a biotech startup's core patents against invalidity claims from an established pharmaceutical giant.",
    challenge: "The pharmaceutical giant filed multiple Inter Partes Review (IPR) petitions, claiming the startup's groundbreaking gene-editing technique was 'obvious' in light of prior art, seeking to clear the way for their own competing product.",
    strategy: "We meticulously differentiated the chemical mechanisms of our client's invention from all cited prior art. We gathered compelling secondary considerations of non-obviousness, including overwhelming commercial success and unexpected results.",
    outcome: "The Patent Trial and Appeal Board (PTAB) upheld all claims of the patents. The pharmaceutical giant subsequently settled, entering into a lucrative cross-licensing agreement with our client.",
    image: "/images/cases/case_ip_1787754189522.jpg",
    icon: Fingerprint
  }
];

export default function PracticeAreasStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCase, setActiveCase] = useState<string | null>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("all", () => {
      if (!containerRef.current) return;

      const cards = gsap.utils.toArray<HTMLElement>(".case-card");
      
      // Initial Setup: Stack them with scale and Y offsets
      gsap.set(cards, {
        scale: (i) => 1 - (i * 0.05),
        y: (i) => i * 40,
        zIndex: (i) => cards.length - i,
        transformOrigin: "bottom center"
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${window.innerHeight * (cards.length * 0.8)}`, // Total scroll distance
          anticipatePin: 1
        }
      });

      // Create the Bumble-swipe staggered animation
      cards.forEach((card, index) => {
        // The last card doesn't swipe away
        if (index === cards.length - 1) return;

        const label = `swipe-${index}`;
        
        // 1. Swipe away the current top card
        tl.to(card, {
          xPercent: -120, // Swipe left
          rotationZ: -15, // Tilt
          opacity: 0,     // Fade out
          ease: "power2.inOut",
        }, label);

        // 2. Bring all cards beneath it forward
        for(let j = index + 1; j < cards.length; j++) {
          const nextCard = cards[j];
          // Determine its new position in the visual stack
          const stackPos = j - (index + 1); // 0 for the one immediately below, 1 for the next, etc.
          
          tl.to(nextCard, {
            scale: 1 - (stackPos * 0.05),
            y: stackPos * 40,
            ease: "power2.inOut",
          }, label);
        }
      });

      return () => {
        tl.kill();
      };
    });

    return () => mm.revert();
  }, []);

  // Lock body scroll when modal is active
  useEffect(() => {
    if (activeCase) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [activeCase]);

  const activeData = MOCK_CASES.find(c => c.id === activeCase);

  return (
    <>
      {/* Scrollable Pinned Container */}
      <div ref={containerRef} className="h-screen w-full bg-ink flex flex-col items-center justify-center relative overflow-hidden pt-24 pb-12">
        
        {/* Background Texture/Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <h2 className="text-[12vw] font-serif uppercase tracking-widest text-parchment/[0.02] whitespace-nowrap select-none">
            PRACTICE AREAS
          </h2>
        </div>

        {/* Header Text */}
        <div className="absolute top-32 left-8 md:left-16 z-20 pointer-events-none">
          <p className="text-gold tracking-[0.3em] uppercase text-sm mb-4">Our Expertise</p>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif text-parchment leading-tight">
            Practice <br/>Areas
          </h1>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none opacity-50">
          <span className="text-xs tracking-widest uppercase text-parchment mb-2">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-parchment to-transparent" />
        </div>

        {/* The Card Stack */}
        <div className="relative w-full max-w-md md:max-w-2xl h-[60vh] md:h-[70vh] z-10 flex items-center justify-center perspective-[1000px]">
          {MOCK_CASES.map((item) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.id} 
                className="case-card absolute inset-0 w-full h-full flex items-center justify-center p-4 cursor-pointer"
                onClick={() => setActiveCase(item.id)}
              >
                {/* Framer Motion Shared Element Wrapper */}
                <motion.div 
                  layoutId={`case-${item.id}`}
                  className="w-full h-full relative rounded-2xl overflow-hidden border border-gold/20 shadow-2xl bg-ink group"
                >
                  <Image 
                    src={item.image} 
                    alt={item.title}
                    fill
                    className="object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-transparent" />
                  
                  {/* Card Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                    <div className="w-12 h-12 rounded-full bg-gold/10 backdrop-blur-md flex items-center justify-center border border-gold/30 text-gold mb-6 group-hover:scale-110 transition-transform duration-500">
                      <Icon size={24} />
                    </div>
                    <p className="text-sm tracking-[0.2em] uppercase text-gold mb-2">{item.category}</p>
                    <h3 className="text-2xl md:text-3xl font-serif text-parchment leading-snug mb-4">
                      {item.title}
                    </h3>
                    <p className="text-parchment/70 font-sans line-clamp-2 md:line-clamp-3">
                      {item.description}
                    </p>
                    
                    <div className="mt-8 flex items-center gap-2 text-xs uppercase tracking-widest text-parchment group-hover:text-gold transition-colors">
                      <span>View Details</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Expanded Modal */}
      <AnimatePresence>
        {activeData && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-12 pointer-events-none">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-ink/95 backdrop-blur-lg pointer-events-auto"
              onClick={() => setActiveCase(null)}
            />

            {/* Modal Content */}
            <motion.div 
              layoutId={`case-${activeData.id}`}
              className="relative z-10 w-full max-w-6xl h-full md:h-[80vh] bg-ink rounded-2xl md:rounded-[2rem] overflow-hidden border border-gold/30 shadow-2xl flex flex-col md:flex-row pointer-events-auto"
            >
              {/* Close Button */}
              <button 
                onClick={() => setActiveCase(null)}
                className="absolute top-4 right-4 md:top-8 md:right-8 z-50 w-12 h-12 rounded-full bg-ink/50 backdrop-blur-md border border-gold/30 flex items-center justify-center text-parchment hover:text-gold transition-colors"
              >
                <X size={24} />
              </button>

              {/* Left Image Pane */}
              <div className="w-full md:w-1/2 h-[40vh] md:h-full relative overflow-hidden flex-shrink-0">
                <Image 
                  src={activeData.image} 
                  alt={activeData.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink to-transparent md:bg-gradient-to-r md:from-transparent md:to-ink" />
              </div>

              {/* Right Content Pane */}
              <div className="w-full md:w-1/2 h-full flex flex-col p-8 md:p-16 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center border border-gold/30 text-gold mb-8 flex-shrink-0">
                  <activeData.icon size={32} />
                </div>
                
                <p className="text-sm tracking-[0.2em] uppercase text-gold mb-4">{activeData.category}</p>
                <h2 className="text-3xl md:text-5xl font-serif text-parchment leading-tight mb-8">
                  {activeData.title}
                </h2>
                
                <div className="w-16 h-px bg-gold/50 mb-8" />
                
                <div className="space-y-8 pb-12">
                  <div>
                    <h4 className="text-lg font-serif text-gold mb-3">The Challenge</h4>
                    <p className="text-parchment/80 font-sans leading-relaxed">{activeData.challenge}</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-serif text-gold mb-3">The Strategy</h4>
                    <p className="text-parchment/80 font-sans leading-relaxed">{activeData.strategy}</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-serif text-gold mb-3">The Outcome</h4>
                    <p className="text-parchment/80 font-sans leading-relaxed">{activeData.outcome}</p>
                  </div>
                </div>
              </div>
              
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
