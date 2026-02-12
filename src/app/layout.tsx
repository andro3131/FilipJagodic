import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Filip Jagodič — Glasba presega vse meje",
  description:
    "Filip Jagodič je izjemen glasbenik z absolutnim posluhom, ki presega vse ovire. Spoznajte njegovo neverjetno zgodbo in glasbo.",
  keywords: [
    "Filip Jagodič",
    "glasbenik",
    "absolutni posluh",
    "glasba",
    "klaviature",
  ],
  openGraph: {
    title: "Filip Jagodič — Glasba presega vse meje",
    description: "Spoznajte izjemnega glasbenika z absolutnim posluhom.",
    type: "website",
    locale: "sl_SI",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sl" className="scroll-smooth">
      <body
        className={`${playfair.variable} ${inter.variable} antialiased grain`}
      >
        <a
          href="#main-content"
          className="fixed -top-full left-4 z-[10000] rounded-lg bg-gold px-4 py-2 text-black font-semibold focus:top-4 transition-all duration-200"
        >
          Preskoči na vsebino
        </a>
        {children}
      </body>
    </html>
  );
}
