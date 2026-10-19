
import HeroSection from '@/components/herosection';
import AboutSection from '@/components/aboutsection';
import RecentWorks from '@/components/recentworks';
import ExperienceSection from '@/components/whoami';
import ContactSection from '@/components/contact';
import Footer from '@/components/footer';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <RecentWorks />
      <ExperienceSection/>
      <ContactSection/>
      <Footer/>
    </>
  );
}
