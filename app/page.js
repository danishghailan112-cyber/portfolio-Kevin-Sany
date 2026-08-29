import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import PortfolioGallery from "@/components/PortfolioGallery";

export default function Home() {
  return (
    <main className="bg-[var(--color-bg)]">
      <AboutSection />
      <PortfolioGallery />
      <ContactSection />
    </main>
  );
}
