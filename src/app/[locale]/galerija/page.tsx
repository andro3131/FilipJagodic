import { getTranslations } from "next-intl/server";
import Navigation from "@/components/Navigation";
import GalleryAll from "@/components/GalleryAll";
import Footer from "@/components/Footer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "gallery" });

  return {
    title: t("pageTitle"),
    description: t("pageDescription"),
  };
}

export default function GalerijaPage() {
  return (
    <>
      <Navigation />
      <main id="main-content">
        <GalleryAll />
      </main>
      <Footer />
    </>
  );
}
