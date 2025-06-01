"use client";

import Image from "next/image";
import { Container, Title } from "@/components/components";
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

export default function TechnologiesSection() {
  const [visibleTooltip, setVisibleTooltip] = useState<string | null>(null);

  return (
    <Container className="m-10 flex h-full w-screen flex-col gap-16 p-20">
      <Title level={1} className="text-4xl font-bold">
        Technologies
      </Title>

      {[
        { title: "Frontend", techs: frontendTechnologies },
        { title: "Backend", techs: backendTechnologies },
      ].map(({ title, techs }) => (
        <Container key={title} className="flex w-full flex-col gap-6">
          <Title level={2} className="text-xl font-medium text-teal-100">
            {title}
          </Title>
          <Container className="flex flex-wrap gap-10">
            {Object.entries(techs).map(([name, src]) => (
              <div
                key={name}
                className="relative flex h-45 w-40 cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-teal-950 bg-gray-800 p-5 transition-all duration-300 hover:translate-y-[-1rem] hover:scale-110"
                onMouseEnter={() => setVisibleTooltip(name)}
                onMouseLeave={() => setVisibleTooltip(null)}
              >
                {visibleTooltip === name && (
                  <div className="absolute -top-16 left-1/2 z-10 -translate-x-1/2 rounded bg-black px-2 py-1 text-xs text-white">
                    {experience[name]} months of experience
                  </div>
                )}
                <Container className="grid flex-1 place-items-center">
                  <Image src={src} alt={name} width={50} height={50} />
                </Container>
                <span className="text-foreground text-sm">{name}</span>
              </div>
            ))}
          </Container>
        </Container>
      ))}
    </Container>
  );
}
