import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import WeeklyTracker from "../components/WeeklyTracker";
import Features from "../components/Features";
import Community from "../components/Community";
import ToolsCalculators from "../components/ToolsCalculators";
import HealthBlog from "../components/HealthBlog";
import Testimonials from "../components/Testimonials";
import EmergencyResources from "../components/EmergencyResources";
import Footer from "../components/Footer";

function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <WeeklyTracker />
        <Features />
        <Community />
        <ToolsCalculators />
        <HealthBlog />
        <Testimonials />
        <EmergencyResources />
      </main>
      <Footer />
    </div>
  );
}

export default LandingPage;
