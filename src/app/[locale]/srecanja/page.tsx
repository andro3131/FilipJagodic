import { getTranslations } from "next-intl/server";
import Navigation from "@/components/Navigation";
import EncountersAll from "@/components/EncountersAll";
import Footer from "@/components/Footer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "encounters" });

  return {
    title: t("pageTitle"),
    description: t("pageDescription"),
  };
}

export default function SrecanjaPage() {
  return (
    <>
      <Navigation />
      <main id="main-content">
        <EncountersAll />
      </main>
      <Footer />
    </>
  );
}
