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

  useEffect(() => {
    fetchProjects()
      .then(setProjects)
      .catch((error) => console.error("Failed to fetch projects:", error));
  }, []);

  const projectCount =
    howMany === undefined || howMany === "all"
      ? projects.length
      : parseInt(howMany);

  const visibleProjects = projects.slice(0, projectCount);
  return (
    <Container className="w-full px-4 py-16 pt-30 sm:px-10 md:px-16 lg:px-24 xl:px-32">
      <SlideInTitle text="Projects" />
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-200px", amount: 0.1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        className="my-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {visibleProjects.map((project) => (
          <ProjectListing key={project.title} project={project} />
        ))}
      </motion.div>
    </Container>
  );
}
