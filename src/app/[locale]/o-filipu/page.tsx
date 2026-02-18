import { getTranslations } from "next-intl/server";
import Navigation from "@/components/Navigation";
import BiographyPage from "@/components/BiographyPage";
import Footer from "@/components/Footer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about.bio" });

  return {
    title: t("pageTitle"),
    description: t("pageDescription"),
  };
}

export default function OFilipuPage() {
  return (
    <>
      <Navigation />
      <main id="main-content">
        <BiographyPage />
      </main>
      <Footer />
    </>
  );
}
