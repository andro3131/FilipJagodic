import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
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
        <Music />
        <Collections />
        <Links />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
