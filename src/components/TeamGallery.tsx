"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Link as LinkIcon, Mail } from "lucide-react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";

const IMAGES: Record<string, string> = {
 "rohit-s-madasseril": "/images/team/rohit.jpg",
 "rones-v-anil": "/images/team/rones.png",
 "sreejith-vk": "/images/team/sreejith.png",
};

export default function TeamGallery() {
 const [activeMember, setActiveMember] = useState<string | null>(null);
 
 const t = useTranslations("teamGallery");
 const locale = useLocale();
 type TeamMember = {
 id: string;
 name: string;
 role: string;
 bio: string;
 email?: string;
 };
 const rawMembers = t.raw("members") as Array<TeamMember>;
 
 const members = rawMembers.map((m) => ({
 ...m,
 image: IMAGES[m.id],
 }));

 // Lock body scroll when modal is active
 useEffect(() => {
 if (activeMember) {
 document.body.style.overflow = "hidden";
 } else {
 document.body.style.overflow = "";
 }
 return () => { document.body.style.overflow = ""; };
 }, [activeMember]);

 const activeData = members.find(m => m.id === activeMember);

 return (
 <div className="w-full relative min-h-screen pb-32">
 
 {/* Grid Layout */}
 <div className="container mx-auto px-4 md:px-6 lg:px-12">
 <div className="grid grid-cols-3 gap-3 md:gap-8 lg:gap-16">
 {members.map((member) => (
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
 <div className="absolute inset-0 bg-parchment/0 group-hover:bg-parchment/20 transition-colors duration-500 z-10 pointer-events-none" />
 
 <Image 
 src={member.image}
 alt={member.name}
 fill
 sizes="(max-width: 768px) 33vw, 25vw"
 className="object-cover transition-transform duration-700 group-hover:scale-105"
 crossOrigin="anonymous"
 />
 </motion.div>

 {/* Text Information */}
 <motion.div layoutId={`text-${member.id}`} className="flex flex-col">
 <h3 className={`${locale === "ml" ? "text-xs md:text-xl" : "text-sm md:text-2xl"} font-serif text-ink group-hover:text-gold transition-colors truncate break-words whitespace-normal`}>
 {member.name}
 </h3>
 <p className="text-[0.6rem] md:text-sm tracking-wider md:tracking-widest uppercase text-ink/50 mt-1 md:mt-2 truncate">
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
 className="fixed inset-0 z-[10000] flex items-center justify-center bg-parchment md:bg-parchment/95 p-0 md:p-6 lg:p-12 overflow-y-auto perspective-[2000px]"
 onClick={() => setActiveMember(null)}
 >
 {/* Close Button */}
 <button 
 className="absolute top-4 right-4 md:top-8 md:right-8 z-50 w-12 h-12 rounded-full border border-ink/20 flex items-center justify-center text-ink hover:text-gold hover:border-gold/50 transition-colors bg-parchment shadow-xl"
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
 className="relative w-full min-h-screen md:min-h-0 max-w-6xl mx-auto flex flex-col md:flex-row gap-0 md:gap-8 lg:gap-16 my-auto pt-0 bg-parchment md:bg-transparent"
 style={{ transformStyle: "preserve-3d" }}
 onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
 >
 {/* Image Side */}
 <motion.div 
 layoutId={`image-${activeData.id}`}
 className="w-full h-[55vh] md:h-auto md:w-1/2 flex-shrink-0 relative md:aspect-[3/4] overflow-hidden shadow-none md:shadow-2xl bg-slate/10"
 >
 <Image 
 src={activeData.image}
 alt={activeData.name}
 fill
 sizes="(max-width: 768px) 100vw, 50vw"
 className="object-cover"
 crossOrigin="anonymous"
 />
 </motion.div>

 {/* Details Side */}
 <motion.div 
 layoutId={`text-${activeData.id}`}
 className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-0 pb-24 md:pb-0"
 >
 <h2 className={`${locale === "ml" ? "text-2xl md:text-4xl lg:text-5xl" : "text-4xl md:text-5xl lg:text-7xl"} font-serif text-ink leading-tight mb-2 break-words`}>
 {activeData.name}
 </h2>
 <p className="text-sm md:text-base tracking-[0.2em] uppercase text-gold mb-8">
 {activeData.role}
 </p>
 
 {/* Divider */}
 <div className="w-16 h-px bg-gold/50 mb-8" />
 
 <p className="text-base md:text-lg text-ink/70 font-sans leading-relaxed mb-12 max-w-lg">
 {activeData.bio}
 </p>

 {/* Contact Links */}
 <div className="flex gap-6">
 {activeData.email && (
 <a href={`mailto:${activeData.email}`} className="w-12 h-12 rounded-full border border-ink/20 flex items-center justify-center text-ink hover:text-gold hover:border-gold/50 transition-colors" title={`Email ${activeData.name}`}>
 <Mail size={20} />
 </a>
 )}
 </div>
 </motion.div>
 </motion.div>
 </motion.div>
 )}
 </AnimatePresence>
 </div>
 );
}
