import HeroSection from "@/constants/hero_section";
import AboutSection from "@/constants/about_section";
import TechnologiesSection from "@/constants/technologies_section";
import ProjectsSection from "@/constants/projects_section";

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <TechnologiesSection limit="3" />
      
      <ProjectsSection howMany={"3"} />
    </>
  );
}
