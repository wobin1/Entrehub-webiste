import Navigation from '@/components/navigation';
import HeroSection from '@/components/hero-section';
import AboutSection from '@/components/about-section';
import ServicesSection from '@/components/services-section';
import WorkSection from '@/components/work-section';
import TeamSection from '@/components/team-section';
import CTASection from '@/components/cta-section';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <>
      <Navigation />
      <main id="main-content" tabIndex={-1} className="min-h-screen focus:outline-none">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <WorkSection />
        {/* <TeamSection /> */}
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
