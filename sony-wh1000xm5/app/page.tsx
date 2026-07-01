import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import TechSpecs from "@/components/TechSpecs";
import Scrollytelling from "@/components/Scrollytelling";
import Pricing from "@/components/Pricing";
import NewsletterForm from "@/components/NewsletterForm";
import Chatbot from "@/components/Chatbot";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <TechSpecs />
        <Scrollytelling />
        <Pricing />
        <NewsletterForm />
        <Chatbot />
      </main>
      <Footer />
    </>
  );
}
