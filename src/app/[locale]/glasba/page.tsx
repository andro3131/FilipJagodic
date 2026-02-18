import { getTranslations } from "next-intl/server";
import Navigation from "@/components/Navigation";
import MusicAll from "@/components/MusicAll";
import Footer from "@/components/Footer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "music" });

  return {
    title: t("pageTitle"),
    description: t("pageDescription"),
  };
}

export default function GlasbaPage() {
  return (
    <>
      <Navigation />
      <main id="main-content">
        <MusicAll />
      </main>
      <Footer />
    </>
  );
}
