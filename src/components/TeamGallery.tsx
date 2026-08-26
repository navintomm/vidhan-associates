"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Link as LinkIcon, Mail } from "lucide-react";

// Mock Team Data with professional Unsplash portraits
const TEAM_MEMBERS = [
  {
    id: "navin-babu",
    name: "Navin Tom Babu",
    role: "Managing Partner",
    bio: "Navin brings over two decades of experience in corporate litigation and constitutional law. As the founding partner, he has argued landmark cases before the Supreme Court and advises multinational corporations on complex regulatory frameworks.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000",
  },
  {
    id: "sarah-mathew",
    name: "Sarah Mathew",
    role: "Senior Partner, Corporate Law",
    bio: "Specializing in mergers, acquisitions, and corporate governance, Sarah has guided numerous Fortune 500 companies through intricate structural transitions. She is recognized for her sharp negotiation skills and strategic foresight.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000",
  },
  {
    id: "arjun-menon",
    name: "Arjun Menon",
    role: "Partner, Criminal Defense",
    bio: "A formidable presence in the courtroom, Arjun leads our criminal defense wing. He has a track record of successfully defending high-profile clients in white-collar criminal proceedings and complex fraud investigations.",
    image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1000",
  },
  {
    id: "riya-sharma",
    name: "Riya Sharma",
    role: "Partner, Intellectual Property",
    bio: "Riya is a leading expert in IP law, helping tech startups and established brands protect their innovations. She manages global trademark portfolios and leads high-stakes patent infringement litigations.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1000",
  },
  {
    id: "vikram-singh",
    name: "Vikram Singh",
    role: "Senior Associate, Real Estate",
    bio: "Vikram advises real estate developers, investors, and funds on property acquisitions, zoning laws, and large-scale commercial leasing. His meticulous approach ensures seamless transactions for our clients.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000",
  },
  {
    id: "ananya-rao",
    name: "Ananya Rao",
    role: "Senior Associate, Family Law",
    bio: "Ananya heads the family law practice, handling sensitive matters including divorce, child custody, and high-net-worth alimony disputes. She is known for her empathetic yet fiercely protective representation.",
    image: "https://images.unsplash.com/photo-1598550874175-4d0ef436c909?q=80&w=1000",
  },
  {
    id: "david-john",
    name: "David John",
    role: "Associate, Taxation",
    bio: "David specializes in direct and indirect taxation, helping corporations optimize their tax structures and representing them in disputes before tax tribunals and high courts.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000",
  },
  {
    id: "priya-nair",
    name: "Priya Nair",
    role: "Associate, Arbitration",
    bio: "An expert in alternate dispute resolution, Priya has successfully mediated and arbitrated complex commercial disputes, saving clients years of litigation costs and public exposure.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000",
  },
  {
    id: "karthik-krishnan",
    name: "Karthik Krishnan",
    role: "Associate, Technology Law",
    bio: "Karthik focuses on data privacy, cybersecurity, and tech compliance. He advises startups on navigating the rapidly evolving digital legal landscape in India and abroad.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1000",
  },
];

export default function TeamGallery() {
  const [activeMember, setActiveMember] = useState<string | null>(null);

  // Lock body scroll when modal is active
  useEffect(() => {
    if (activeMember) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [activeMember]);

  const activeData = TEAM_MEMBERS.find(m => m.id === activeMember);

  return (
    <div className="w-full relative min-h-screen pb-32">
      
      {/* Grid Layout */}
      <div className="container mx-auto px-4 md:px-6 lg:px-12">
        <div className="grid grid-cols-3 gap-3 md:gap-8 lg:gap-16">
          {TEAM_MEMBERS.map((member) => (
            <div 
              key={member.id}
              className="group cursor-pointer flex flex-col"
              onClick={() => setActiveMember(member.id)}
            >
              {/* Image Container with 3:4 Aspect Ratio */}
              <motion.div 
                layoutId={`image-${member.id}`}
                className="relative w-full aspect-[3/4] overflow-hidden mb-3 md:mb-6 bg-slate/10"
              >
                {/* Gold border reveal on hover */}
                <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/50 transition-colors duration-500 z-20 pointer-events-none" />
                
                {/* Dark overlay on hover */}
                <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/20 transition-colors duration-500 z-10 pointer-events-none" />
                
                <img 
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  crossOrigin="anonymous"
                />
              </motion.div>

              {/* Text Information */}
              <motion.div layoutId={`text-${member.id}`} className="flex flex-col">
                <h3 className="text-sm md:text-2xl font-serif text-parchment group-hover:text-gold transition-colors truncate">
                  {member.name}
                </h3>
                <p className="text-[0.6rem] md:text-sm tracking-wider md:tracking-widest uppercase text-parchment/50 mt-1 md:mt-2 truncate">
                  {member.role}
                </p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Full-Screen Modal Interaction */}
      <AnimatePresence>
        {activeData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-ink md:bg-ink/95 p-0 md:p-6 lg:p-12 overflow-y-auto perspective-[2000px]"
            onClick={() => setActiveMember(null)}
          >
            {/* Close Button */}
            <button 
              className="absolute top-4 right-4 md:top-8 md:right-8 z-50 w-12 h-12 rounded-full border border-parchment/20 flex items-center justify-center text-parchment hover:text-gold hover:border-gold/50 transition-colors bg-ink shadow-xl"
              onClick={(e) => { e.stopPropagation(); setActiveMember(null); }}
            >
              <X size={24} />
            </button>

            {/* Modal Content */}
            <motion.div 
              initial={{ rotateY: 360, scale: 0.5, opacity: 0, z: -500 }}
              animate={{ rotateY: 0, scale: 1, opacity: 1, z: 0 }}
              exit={{ rotateY: -360, scale: 0.5, opacity: 0, z: -500 }}
              transition={{ duration: 1.3, ease: "circOut" }}
              className="relative w-full min-h-screen md:min-h-0 max-w-6xl mx-auto flex flex-col md:flex-row gap-0 md:gap-8 lg:gap-16 my-auto pt-0 bg-ink md:bg-transparent"
              style={{ transformStyle: "preserve-3d" }}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
              {/* Image Side */}
              <motion.div 
                layoutId={`image-${activeData.id}`}
                className="w-full h-[55vh] md:h-auto md:w-1/2 flex-shrink-0 relative md:aspect-[3/4] overflow-hidden shadow-none md:shadow-2xl bg-slate/10"
              >
                <img 
                  src={activeData.image}
                  alt={activeData.name}
                  className="w-full h-full object-cover"
                  crossOrigin="anonymous"
                />
              </motion.div>

              {/* Details Side */}
              <motion.div 
                layoutId={`text-${activeData.id}`}
                className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-0 pb-24 md:pb-0"
              >
                <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif text-parchment leading-tight mb-2">
                  {activeData.name}
                </h2>
                <p className="text-sm md:text-base tracking-[0.2em] uppercase text-gold mb-8">
                  {activeData.role}
                </p>
                
                {/* Divider */}
                <div className="w-16 h-px bg-gold/50 mb-8" />
                
                <p className="text-base md:text-lg text-parchment/70 font-sans leading-relaxed mb-12 max-w-lg">
                  {activeData.bio}
                </p>

                {/* Contact Links */}
                <div className="flex gap-6">
                  <a href="#" className="w-12 h-12 rounded-full border border-parchment/20 flex items-center justify-center text-parchment hover:text-gold hover:border-gold/50 transition-colors">
                    <LinkIcon size={20} />
                  </a>
                  <a href="#" className="w-12 h-12 rounded-full border border-parchment/20 flex items-center justify-center text-parchment hover:text-gold hover:border-gold/50 transition-colors">
                    <Mail size={20} />
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
