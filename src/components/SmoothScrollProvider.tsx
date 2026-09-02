"use client";

import { ReactLenis, useLenis } from 'lenis/react';
import { ScrollTrigger } from '@/lib/gsap';

function ScrollTriggerSync() {
  useLenis(() => {
    ScrollTrigger.update();
  });
  return null;
}

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
 return (
 <ReactLenis root>
 <ScrollTriggerSync />
 {children}
 </ReactLenis>
 );
}
