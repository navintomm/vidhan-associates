"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


// Safely register plugins on the client
if (typeof window !== "undefined") {
 gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
