"use client";

import Image from "next/image";
import { Container, Link, Title } from "@/components/components";
import React, { useState } from "react";

const frontendTechnologies: Record<string, string> = {
  React: "/react.svg",
  "Next.js": "/next.svg",
  "Tailwind CSS": "/tailwind-css.svg",
  HTML: "/html.svg",
};

const backendTechnologies: Record<string, string> = {
  "Node.js": "/nodejs-3.svg",
  FastAPI: "/fastapi-1.svg",
  Flask: "/flask.svg",
  Django: "/django-community.svg",
  SQLite: "/sqlite.svg",
  SQLAlchemy: "/sqlalchemy.svg",
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
};

export default function TechnologiesSection({
  limit = "all",
}: {
  limit?: string;
}) {
  const [visibleTooltip, setVisibleTooltip] = useState<string | null>(null);
  const [hoveringFrontend, setHoveringFrontend] = useState(false);
  const [hoveringBackend, setHoveringBackend] = useState(false);

  const handleHover = (frontend: boolean) => {
    setHoveringFrontend(frontend);
    setHoveringBackend(!frontend);
  };
  const handleMouseLeave = () => {
    setHoveringFrontend(false);
    setHoveringBackend(false);
  };
  function getLimitedTechnologies(
    backendTechnologies: Record<string, string>,
    frontendTechnologies: Record<string, string>,
    limit?: string,
  ): {
    frontendTechs: Record<string, string>;
    backendTechs: Record<string, string>;
  } {
    const backendTechsLength = Object.keys(backendTechnologies).length;
    const frontendTechsLength = Object.keys(frontendTechnologies).length;
    const totalTechs = backendTechsLength + frontendTechsLength;

    let limitNum: number;

    if (limit === "all") {
      limitNum = totalTechs;
    } else {
      limitNum = parseInt(limit ?? "", 10);
      if (isNaN(limitNum) || limitNum <= 0) {
        console.error(
          "Invalid limit provided. Defaulting to all technologies.",
        );
        limitNum = totalTechs;
      }
    }

    const frontendTechs = Object.fromEntries(
      Object.entries(frontendTechnologies).slice(
        0,
        Math.min(limitNum, frontendTechsLength),
      ),
    );

    const backendTechs = Object.fromEntries(
      Object.entries(backendTechnologies).slice(
        0,
        Math.min(limitNum, backendTechsLength),
      ),
    );

    return { frontendTechs, backendTechs };
  }
  const { frontendTechs, backendTechs } = getLimitedTechnologies(
    backendTechnologies,
    frontendTechnologies,
    limit,
  );
  return (
    <Container className="m-10 flex h-full w-screen flex-col gap-16 p-20">
      <Title level={1} className="text-4xl font-bold">
        Technologies
      </Title>

      {[
        { title: "Frontend", techs: frontendTechs },
        { title: "Backend", techs: backendTechs },
      ].map(({ title, techs }) => (
        <Container key={title} className="flex w-full flex-col gap-6">
          <h2
            className="w-fit cursor-pointer text-2xl font-medium text-teal-100 transition-all duration-300 hover:text-teal-200"
            onMouseEnter={() => handleHover(title === "Frontend")}
            onMouseLeave={handleMouseLeave}
          >
            {title}
          </h2>
          <Container className="flex flex-wrap gap-10">
            {Object.entries(techs).map(([name, src]) => (
              <div
                key={name}
                className={`relative flex h-45 w-40 cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-teal-950 bg-gray-800 p-5 transition-all duration-300 hover:translate-y-[-1rem] hover:scale-110 hover:shadow-lg hover:shadow-teal-900/40 ${hoveringFrontend && name in frontendTechnologies ? "scale-110" : ""} ${hoveringBackend && name in frontendTechnologies ? "scale-90" : ""} ${hoveringBackend && name in backendTechnologies ? "scale-110" : ""} ${hoveringFrontend && name in backendTechnologies ? "scale-90" : ""}`}
                onMouseEnter={() => setVisibleTooltip(name)}
                onMouseLeave={() => setVisibleTooltip(null)}
              >
                <div
                  className={`absolute -top-16 left-1/2 z-10 -translate-x-1/2 rounded bg-black px-2 py-1 text-xs text-gray-400 opacity-0 hover:text-white ${visibleTooltip === name ? "opacity-100" : ""} transition-all duration-500 ease-in-out`}
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
