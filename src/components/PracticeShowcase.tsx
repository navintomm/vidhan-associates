"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const WORDS = [
  { letter: "V", word: "ision" },
  { letter: "I", word: "ntegrity" },
  { letter: "D", word: "edication" },
  { letter: "H", word: "onor" },
  { letter: "A", word: "ccountability" },
  { letter: "N", word: "obility" }
];

const STATE_STYLES = {
  initial: {
    transform: 'translateX(-50%) translateY(60px) scale(0.92) rotateY(-6deg)',
    opacity: 0,
    zIndex: 3,
    transition: 'all 2.5s cubic-bezier(0.25, 1, 0.5, 1)'
  },
  center_intro: {
    transform: 'translateX(-50%) translateY(0px) scale(1) rotateY(0deg)',
    opacity: 1,
    zIndex: 3,
    transition: 'all 2.5s cubic-bezier(0.25, 1, 0.5, 1)' 
  },
  center: {
    transform: 'translateX(-50%) translateY(0px) scale(1) rotateY(0deg)',
    opacity: 1,
    zIndex: 3,
    transition: 'all 1.6s cubic-bezier(0.76, 0, 0.24, 1)'
  },
  right_teleport: {
    transform: 'translateX(calc(-50% + 75vw)) translateY(0px) scale(0.65) rotateY(6deg)',
    opacity: 0,
    zIndex: 1,
    transition: 'none'
  },
  left: {
    transform: 'translateX(calc(-50% - 40vw)) translateY(0px) scale(0.78) rotateY(-5deg)',
    opacity: 0.65,
    zIndex: 2,
    transition: 'all 1.6s cubic-bezier(0.76, 0, 0.24, 1)'
  },
  outside: {
    transform: 'translateX(calc(-50% - 75vw)) translateY(0px) scale(0.6) rotateY(0deg)',
    opacity: 0,
    zIndex: 1,
    transition: 'all 1.6s cubic-bezier(0.76, 0, 0.24, 1)'
  }
};

export default function PracticeShowcase() {
  const [step, setStep] = useState(-1);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Initial entrance delay
    const introTimeout = setTimeout(() => {
      setStep(0);
    }, 100);

    // Wait for entrance (2.5s) + hold (2.5s) = 5000ms
    const firstTransitionTimeout = setTimeout(() => {
      setStep(1);
      
      // Start loop: transition (1.6s) + hold (2.5s) = 4100ms
      intervalRef.current = setInterval(() => {
        setStep(prev => prev + 1);
      }, 4100);

    }, 5000);

    return () => {
      clearTimeout(introTimeout);
      clearTimeout(firstTransitionTimeout);
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
  }, []);

  return (
    <section className="relative bg-ink overflow-hidden h-[80vh] md:h-screen w-full flex items-center justify-center">
      
      {/* BACKGROUND WATERMARK */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
        <h2 className="text-[15vw] lg:text-[18vw] font-serif uppercase tracking-widest text-parchment/[0.02] whitespace-nowrap select-none">
          VIDHAN
        </h2>
      </div>

      {/* 3D PILLARS LAYER */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none" style={{ perspective: '1400px' }}>
        {WORDS.map((item, i) => {
          const activeIndex = step >= 0 ? step % 6 : 0;
          let stateKey = 'right_teleport';
          
          if (step === -1) {
            stateKey = i === 0 ? 'initial' : 'right_teleport';
          } else if (i === activeIndex) {
            stateKey = step === 0 ? 'center_intro' : 'center';
          } else if (i === (activeIndex - 1 + 6) % 6) {
            stateKey = 'left';
          } else if (i === (activeIndex - 2 + 6) % 6) {
            stateKey = 'outside';
          }

          const style = STATE_STYLES[stateKey as keyof typeof STATE_STYLES];
          
          return (
            <div 
              key={i} 
              className="absolute bottom-[-10vh] md:bottom-[-5vh] h-[65vh] md:h-[70vh] lg:h-[80vh] flex flex-col justify-end items-center"
              style={{
                left: '50%',
                ...style
              }}
            >
              {/* Text hovering exactly on top of pillar, center aligned */}
              <div className="absolute bottom-[100%] left-1/2 -translate-x-1/2 mb-4 whitespace-nowrap text-center z-40">
                <h3 className="text-4xl md:text-5xl lg:text-7xl font-serif text-parchment drop-shadow-xl tracking-wider">
                  <span className="text-amber-500">{item.letter}</span>
                  {item.word}
                </h3>
              </div>

              {/* The Pillar Base */}
              <Image
                src="/images/icons/ashoka-pillar-transparent.png"
                alt="Ashoka Pillar"
                width={800}
                height={1420}
                className="w-auto h-full object-contain object-bottom relative z-10"
              />
            </div>
          )
        })}
      </div>

    </section>
  );
}
