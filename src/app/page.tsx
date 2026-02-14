import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Encounters from "@/components/Encounters";
import Gallery from "@/components/Gallery";
import Music from "@/components/Music";
import Collections from "@/components/Collections";
import Links from "@/components/Links";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main id="main-content">
        <Hero />
        <About />
        <Encounters />
        <Gallery />
        <Music />
        <Collections />
        <Links />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
