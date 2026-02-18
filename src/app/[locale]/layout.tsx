import { Playfair_Display, Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";
import SmoothScroll from "@/components/SmoothScroll";

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

type Locale = (typeof routing.locales)[number];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("title"),
    description: t("description"),
    keywords: [
      "Filip Jagodič",
      "glasbenik",
      "absolutni posluh",
      "glasba",
      "klaviature",
    ],
    icons: {
      icon: "/favicon.svg",
    },
    openGraph: {
      title: t("title"),
      description: t("ogDescription"),
      type: "website",
      locale: locale === "sl" ? "sl_SI" : "en_US",
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = (await import(`../../../messages/${locale}.json`)).default;

  return (
    <html lang={locale}>
      <body
        className={`${playfair.variable} ${inter.variable} antialiased grain`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <SmoothScroll />
          <a
            href="#main-content"
            className="fixed -top-full left-4 z-[10000] rounded-lg bg-accent px-4 py-2 text-black font-semibold focus:top-4 transition-all duration-200"
          >
            {locale === "sl" ? "Preskoči na vsebino" : "Skip to content"}
          </a>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
