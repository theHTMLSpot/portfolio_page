"use client";

import Image from "next/image";
import { Container, Link, Title } from "@/components/components";
import React, { useState } from "react";

const frontendTechnologies: Record<string, string> = {
  React: "/icons/react.svg",
  "Next.js": "/icons/next.svg",
  "Tailwind CSS": "/icons/tailwind-css.svg",
  HTML: "/icons/html.svg",
};

const backendTechnologies: Record<string, string> = {
  "Node.js": "/icons/nodejs-3.svg",
  FastAPI: "/icons/fastapi-1.svg",
  Flask: "/icons/flask.svg",
  Django: "/icons/django-community.svg",
  SQLite: "/icons/sqlite.svg",
  SQLAlchemy: "/icons/sqlalchemy.svg",
};

const otherTechnologies: Record<string, string> = {
  Git: "/icons/git.svg",
  Docker: "/icons/docker.svg",
  "C++": "/icons/cpp.svg",
  "C#": "/icons/cs.svg",
  golang: "/icons/go.svg",
  C: "/icons/c.svg",
  Java: "/icons/java.svg",
  Rust: "/icons/rust.svg",
  Blender: "/icons/blender.svg",
  Unity: "/icons/unity.svg",
  "Unreal Engine": "/icons/unreal.svg",
  Figma: "/icons/figma.svg",
  Godot: "/icons/godot.svg",
};

const experience: Record<string, number> = {
  React: 24,
  "Next.js": 12,
  "Tailwind CSS": 6,
  HTML: 48,
  "Node.js": 24,
  FastAPI: 18,
  Flask: 2,
  Django: 2,
  SQLite: 12,
  SQLAlchemy: 12,
  Git: 36,
  Docker: 6,
  "C++": 24,
  "C#": 12,
  golang: 6,
  C: 12,
  Java: 1,
  Rust: 1,
  Blender: 12,
  Unity: 6,
  "Unreal Engine": 1,
  Figma: 6,
  Godot: 6,
};

function getLimitedTechnologies(
  backend: Record<string, string>,
  frontend: Record<string, string>,
  other: Record<string, string>,
  limit?: string
) {
  const perCategoryLimit = limit === "all" ? Infinity : 3;

  const frontendTechs = Object.fromEntries(
    Object.entries(frontend).slice(0, perCategoryLimit)
  );
  const backendTechs = Object.fromEntries(
    Object.entries(backend).slice(0, perCategoryLimit)
  );
  const otherTechs = Object.fromEntries(
    Object.entries(other).slice(0, perCategoryLimit)
  );

  return { frontendTechs, backendTechs, otherTechs };
}

function shouldBeHighlighted(
  name: string,
  section: "Frontend" | "Backend" | "Other",
  hovering: string | null
) {
  if (!hovering) return false;
  const groups: Record<string, Record<string, string>> = {
    Frontend: frontendTechnologies,
    Backend: backendTechnologies,
    Other: otherTechnologies,
  };
  return hovering === section && name in groups[section];
}

function shouldBeDeemphasized(
  name: string,
  section: "Frontend" | "Backend" | "Other",
  hovering: string | null
) {
  if (!hovering) return false;

  const groups: Record<string, Record<string, string>> = {
    Frontend: frontendTechnologies,
    Backend: backendTechnologies,
    Other: otherTechnologies,
  };

  return hovering !== section && name in groups[section];
}

export default function TechnologiesSection({ limit = "all" }: { limit?: string }) {
  const [visibleTooltip, setVisibleTooltip] = useState<string | null>(null);
  const [hovering, setHovering] = useState<string | null>(null);

  const { frontendTechs, backendTechs, otherTechs } = getLimitedTechnologies(
    backendTechnologies,
    frontendTechnologies,
    otherTechnologies,
    limit
  );

  return (
    <Container className="m-10 flex h-full w-screen flex-col gap-16 p-20">
      <Title level={1} className="text-4xl font-bold">
        Technologies
      </Title>

      {[
        { title: "Frontend", techs: frontendTechs },
        { title: "Backend", techs: backendTechs },
        { title: "Other", techs: otherTechs },
      ].map(({ title, techs }) => (
        <Container key={title} className="flex w-full flex-col gap-6">
          <h2
            className="w-fit cursor-pointer text-2xl font-medium text-teal-100 transition-all duration-300 hover:text-teal-200"
            onMouseEnter={() => setHovering(title)}
            onMouseLeave={() => setHovering(null)}
          >
            {title}
          </h2>
          <Container className="flex flex-wrap gap-10">
            {Object.entries(techs).map(([name, src]) => (
              <div
                key={name}
                className={`relative flex h-45 w-40 cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-teal-950 bg-gray-800 p-5 transition-all duration-300 hover:translate-y-[-1rem] hover:scale-110 hover:shadow-lg hover:shadow-teal-900/40 ${shouldBeHighlighted(name, title as any, hovering) ? "scale-110" : shouldBeDeemphasized(name,title as any, hovering) ? "scale-90": "scale-100"}`}
                onMouseEnter={() => setVisibleTooltip(name)}
                onMouseLeave={() => setVisibleTooltip(null)}
              >
                <div
                  className={`absolute -top-16 left-1/2 z-10 -translate-x-1/2 rounded bg-black px-2 py-1 text-xs text-gray-400 transition-all duration-500 ease-in-out hover:text-white ${visibleTooltip === name ? "opacity-100" : "opacity-0"}`}
                >
                  {experience[name]} months of experience
                </div>

                <Container className="grid flex-1 place-items-center">
                  <Image src={src} alt={name} width={50} height={50} />
                </Container>
                <span className="text-foreground text-sm">{name}</span>
              </div>
            ))}
          </Container>
        </Container>
      ))}

      {limit === "all" ? null : (
        <Link
          href="/technologies"
          className="text-white transition-all duration-300 hover:text-teal-500"
        >
          View all
        </Link>
      )}
    </Container>
  );
}
