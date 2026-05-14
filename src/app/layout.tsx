import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { PageTransition } from "@/components/PageTransition";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://minzabynj.com"),
  title: {
    default: "Minza By Nazia Junaid — Bespoke Pakistani Couture",
    template: "%s · Minza By Nazia Junaid",
  },
  description:
    "Three decades of craft. Bespoke Pakistani bridal, formal, and contemporary couture, hand-made in Karachi and shipped worldwide.",
  openGraph: {
    title: "Minza By Nazia Junaid",
    description:
      "Bespoke Pakistani couture from Karachi, made to measure and shipped worldwide.",
    url: "https://minzabynj.com",
    siteName: "Minza By Nazia Junaid",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Minza By Nazia Junaid" },
  alternates: { canonical: "https://minzabynj.com" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-cream text-charcoal">
        <Header />
        <main className="flex-1 pt-16 md:pt-20">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <WhatsAppButton variant="floating" />
      </body>
    </html>
  );
}
