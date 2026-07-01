import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import TechSpecs from "@/components/TechSpecs";
import Scrollytelling from "@/components/Scrollytelling";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <TechSpecs />
        <Scrollytelling />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
