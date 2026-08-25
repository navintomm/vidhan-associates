"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-ink flex flex-col items-center justify-center p-6 text-center">
      <h2 className="text-3xl font-serif text-parchment mb-4">Something went wrong!</h2>
      <p className="text-parchment/60 font-sans mb-8 max-w-md">
        {error.message || "An unexpected error occurred while loading this page."}
      </p>
      <button
        onClick={() => reset()}
        className="px-6 py-3 border border-gold/40 text-gold text-sm tracking-wide-xl uppercase hover:bg-gold/5 transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
