"use client";

import { useState, useEffect } from "react";
import { project } from "@/types/project";
import { Container } from "@/components/components";

import ProjectListing from "@/components/project_listing";

import SlideInTitle from "@/components/motion/slide_in_title";

async function fetchProjects(
  setProjects: React.Dispatch<React.SetStateAction<project[]>>,
) {
  const res = await fetch("/data/projects.json");
  const data = await res.json();
  setProjects(data);
}

export default function ProjectsSection({ howMany }: { howMany?: string }) {
  const [projects, setProjects] = useState<project[]>([]);

  if (howMany === undefined) {
    howMany = "all";
  }

  useEffect(() => {
    try {
      fetchProjects(setProjects);
    } catch (error) {
      console.log(error);
    }
  }, [projects]);

  if (howMany === "all") {
    howMany = projects.length.toString();
  }

  if (projects.length > parseInt(howMany)) {
    projects.splice(parseInt(howMany));
  }

  return (
    <Container className="w-screen p-30">
      <SlideInTitle text="Projects" />
      <Container className="my-10 grid h-full grid-cols-1 gap-16 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <ProjectListing key={project.title} project={project} />
        ))}
      </Container>
    </Container>
  );
}
