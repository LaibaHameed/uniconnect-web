import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import FeaturedSocieties from "@/components/home/FeaturedSocieties";
import UpcomingEvents from "@/components/home/UpcomingEvents";
import CTASection from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-blue-50">
      <HeroSection />
      <FeaturesSection />
      <FeaturedSocieties />
      <UpcomingEvents />
      <CTASection />
    </div>
  );
}
