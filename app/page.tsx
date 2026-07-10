import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TechnologiesSection from "@/components/TechnologiesSection";
import MaterialsSection from "@/components/MaterialsSection";
import CtaBanner from "@/components/CtaBanner";
import UploadPortal from "@/components/UploadPortal";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TechnologiesSection />
        <MaterialsSection />
        <CtaBanner />
        <UploadPortal />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
