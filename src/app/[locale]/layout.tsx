import type { Metadata } from "next";
import { Fraunces, Noto_Serif_Malayalam, IBM_Plex_Sans, Noto_Sans_Malayalam } from "next/font/google";
import { getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import "../globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import WhatsAppButton from "@/components/WhatsAppButton";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

const fraunces = Fraunces({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-fraunces" });
const ibmPlexSans = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-ibm-plex-sans" });

const notoSerifMalayalam = Noto_Serif_Malayalam({ subsets: ["malayalam"], weight: ["400", "600"], variable: "--font-noto-serif-malayalam" });
const notoSansMalayalam = Noto_Sans_Malayalam({ subsets: ["malayalam"], weight: ["400", "500", "600", "700"], variable: "--font-noto-sans-malayalam" });

export const metadata: Metadata = {
  title: "Vidhan Associates — Advocates",
  description: "An independent legal practice providing strategic counsel across Kerala and beyond.",
};

export default async function LocaleLayout({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();

  const isMalayalam = locale === 'ml';

  const headingFont = isMalayalam ? notoSerifMalayalam.variable : fraunces.variable;
  const bodyFont = isMalayalam ? notoSansMalayalam.variable : ibmPlexSans.variable;

  return (
    <html lang={locale}>
      <body className={`${headingFont} ${bodyFont} font-sans antialiased bg-parchment text-slate`}>
        <NextIntlClientProvider messages={messages}>
          <SmoothScrollProvider>
            <Header locale={locale} />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer locale={locale} />
            <BottomNav locale={locale} />
            <WhatsAppButton />
          </SmoothScrollProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
