"use client";

import { useState, useEffect } from "react";
import { project } from "@/types/project";
import { Container } from "@/components/components";

import ProjectListing from "@/components/project_listing";
import SlideInTitle from "@/components/motion/slide_in_title";

import { motion } from "motion/react";

async function fetchProjects(): Promise<project[]> {
  const res = await fetch("/data/projects.json");
  return await res.json();
}

export default function ProjectsSection({ howMany }: { howMany?: string }) {
  const [projects, setProjects] = useState<project[]>([]);
  const [isTabletOrLarger, setIsTabletOrLarger] = useState(false);

  useEffect(() => {
    fetchProjects()
      .then(setProjects)
      .catch((error) => console.error("Failed to fetch projects:", error));
  }, []);

  useEffect(() => {
    const checkSize = () => {
      setIsTabletOrLarger(window.innerWidth >= 768); // Tailwind md: breakpoint
    };

    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  const projectCount =
    howMany === undefined || howMany === "all"
      ? projects.length
      : parseInt(howMany);

  const visibleProjects = projects.slice(0, projectCount);

  const projectGrid = (
    <div className="my-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {visibleProjects.map((project) => (
        <ProjectListing key={project.title} project={project} />
      ))}
    </div>
  );

  return (
    <Container className="w-full px-4 py-16 pt-30 sm:px-10 md:px-16 lg:px-24 xl:px-32">
      <SlideInTitle text="Projects" />
      {isTabletOrLarger ? (
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-200px", amount: 0.1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        >
          {projectGrid}
        </motion.div>
      ) : (
        projectGrid
      )}
    </Container>
  );
}
