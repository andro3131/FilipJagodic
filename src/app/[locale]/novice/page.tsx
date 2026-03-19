import { getTranslations } from "next-intl/server";
import Navigation from "@/components/Navigation";
import NewsAll from "@/components/NewsAll";
import Footer from "@/components/Footer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "news" });

  return {
    title: t("pageTitle"),
    description: t("pageDescription"),
  };
}

export default function NovicePage() {
  return (
    <>
      <Navigation />
      <main id="main-content">
        <NewsAll />
      </main>
      <Footer />
    </>
  );
}
