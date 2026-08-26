"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function LandingSplash() {
  const [step, setStep] = useState<"disclaimer" | "splash" | "done">("disclaimer");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Removed localStorage caching so the disclaimer is strictly shown on every reload
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === "splash") {
      // Auto-dismiss the splash screen instantly after the animation ends (3 seconds)
      timer = setTimeout(() => {
        setStep("done");
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [step]);

  if (!isMounted) {
    // Return a solid black screen during Server-Side Rendering to prevent the home page from flashing
    return <div className="fixed inset-0 z-[10000] bg-ink" />;
  }

  return (
    <AnimatePresence>
      {step !== "done" && (
        <motion.div
          key="master-wrapper"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[10000] bg-ink flex items-center justify-center overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {step === "disclaimer" && (
              <motion.div
                key="disclaimer-modal"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 md:p-8"
              >
                <div className="bg-white text-ink max-w-3xl w-full rounded-sm shadow-2xl flex flex-col max-h-full overflow-hidden">

                  {/* Fixed Header */}
                  <div className="px-6 pt-6 pb-4 md:px-12 md:pt-10 md:pb-6 shrink-0 bg-white z-10 border-b border-gold/20">
                    <h2 className="text-2xl md:text-3xl font-serif">Disclaimer</h2>
                  </div>

                  {/* Scrollable Content */}
                  <div className="px-6 py-4 md:px-12 md:py-6 text-sm md:text-base text-ink/80 leading-relaxed font-sans space-y-4 overflow-y-auto flex-grow relative">
                    <p>
                      As per the rules of the Bar Council of India, advocates are not permitted to solicit work or advertise in any manner. By clicking on the &quot;I AGREE&quot; button below, the user acknowledges the following:
                    </p>

                    <ul className="list-disc pl-5 space-y-2">
                      <li>There has been no advertisement, personal communication, solicitation, invitation or inducement of any sort whatsoever from us or any of our members to solicit any work through this website;</li>
                      <li>The user wishes to gain more information about us for his/her own information and use;</li>
                      <li>The information about us is provided to the user only on his/her specific request and any information obtained or materials downloaded from this website is completely at the user&apos;s volition and any transmission, receipt or use of this site would not create any lawyer-client relationship.</li>
                    </ul>

                    <p>
                      The information provided under this website is solely available at your request for informational purposes only, should not be interpreted as soliciting or advertisement. We are not liable for any consequence of any action taken by the user relying on material / information provided under this website. In cases where the user has any legal issues, he/she in all cases must seek independent legal advice.
                    </p>
                  </div>

                  {/* Fixed Footer */}
                  <div className="px-6 py-5 md:px-12 md:py-8 shrink-0 flex justify-end bg-white border-t border-ink/5 z-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                    <button
                      onClick={() => {
                        setStep("splash");
                      }}
                      className="bg-ink text-white px-6 md:px-10 py-3 md:py-4 text-xs md:text-sm tracking-widest font-bold uppercase hover:bg-ink/90 transition-colors rounded-sm w-full md:w-auto"
                    >
                      I Agree
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {step === "splash" && (
              <motion.div
                key="landing-splash"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0 }}
                className="absolute inset-0 flex items-center justify-center overflow-hidden"
              >
                {/* Main Cinematic 3D Fly-Through Wrapper */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{
                    scale: [0.8, 1, 1, 40],
                    opacity: [0, 1, 1, 0]
                  }}
                  transition={{
                    duration: 3,
                    times: [0, 0.2, 0.5, 1],
                    ease: ["easeOut", "linear", "circIn"]
                  }}
                  style={{ willChange: "transform, opacity" }}
                  className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none origin-center"
                >
                  {/* Ambient Background Glow */}
                  <div className="absolute inset-0 bg-gold/5 blur-[100px] z-0 rounded-full" />

                  {/* Lighting Sweep */}
                  <motion.div
                    initial={{ x: "-100%", opacity: 0 }}
                    animate={{ x: "200%", opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 2, ease: "linear", delay: 0.2 }}
                    className="absolute inset-0 w-[50%] bg-gradient-to-r from-transparent via-amber-100/15 to-transparent mix-blend-overlay z-40 pointer-events-none"
                    style={{ transform: "skewX(-30deg)" }}
                  />

                  {/* Scale of Justice (Normal size) */}
                  <div className="relative z-30 flex items-center justify-center h-full w-[160px] lg:w-[320px] mx-auto">
                    <Image
                      src="/images/icons/scale-of-justice-transparent.png"
                      alt="Scale of Justice"
                      width={500}
                      height={500}
                      className="w-full h-auto object-contain drop-shadow-2xl relative z-10"
                      priority
                    />
                  </div>
                </motion.div>

                {/* Skip Button */}
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  onClick={() => setStep("done")}
                  className="absolute bottom-12 text-xs tracking-widest text-parchment/30 uppercase hover:text-parchment transition-colors z-50"
                >
                  Skip Intro
                </motion.button>

              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
