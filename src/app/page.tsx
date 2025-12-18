import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  HeroSection,
  LogoSlider,
  FeaturesSection,
  CTASection,
} from "@/components/sections";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header variant="default" />
      <HeroSection />
      <LogoSlider />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </main>
  );
}
