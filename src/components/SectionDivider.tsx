export default function SectionDivider() {
 return (
 <div className="flex items-center justify-center py-16 md:py-24">
 <div className="relative w-full max-w-md flex items-center justify-center">
 {/* Left line */}
 <div className="flex-1 h-px bg-gradient-to-r from-transparent to-gold/30" />

 {/* Center emblem — small diamond/seal mark */}
 <div className="mx-4 flex-shrink-0">
 <svg
 width="16"
 height="16"
 viewBox="0 0 16 16"
 fill="none"
 xmlns="http://www.w3.org/2000/svg"
 className="text-gold/50"
 >
 <path
 d="M8 0L10 6L16 8L10 10L8 16L6 10L0 8L6 6L8 0Z"
 fill="currentColor"
 />
 </svg>
 </div>

 {/* Right line */}
 <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gold/30" />
 </div>
 </div>
 );
}
