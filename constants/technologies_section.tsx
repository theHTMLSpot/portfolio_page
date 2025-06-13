"use client";

import Image from "next/image";
import { Container, Link } from "@/components/components";
import React, { useState, useRef } from "react";
import SlideInFromCenter from "@/components/motion/slide_in_from_center";
import { motion, useInView } from "framer-motion"; // <- corrected import

const technologies = {
  Frontend: {
    React: "/icons/react.svg",
    "Next.js": "/icons/next.svg",
    "Tailwind CSS": "/icons/tailwind-css.svg",
    HTML: "/icons/html.svg",
  },
  Backend: {
    "Node.js": "/icons/nodejs-3.svg",
    FastAPI: "/icons/fastapi-1.svg",
    Flask: "/icons/flask.svg",
    Django: "/icons/django-community.svg",
    SQLite: "/icons/sqlite.svg",
    SQLAlchemy: "/icons/sqlalchemy.svg",
  },
  Other: {
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
  },
};

const experience = {
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

function SectionBlock({
  title,
  techs,
  limit,
  setSeen,
  seen,
  hovering,
  setHovering,
  visibleTooltip,
  setVisibleTooltip,
}: {
  title: string;
  techs: Record<string, string>;
  limit: string;
  setSeen: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  seen: Record<string, boolean>;
  hovering: string | null;
  setHovering: (val: string | null) => void;
  visibleTooltip: string | null;
  setVisibleTooltip: (val: string | null) => void;
}) {
  const ref = useRef(null);
  const [hasMounted, setHasMounted] = React.useState(false);

  // Only enable intersection observer after the component mounts
  React.useEffect(() => {
    setHasMounted(true);
  }, []);

  const inView = useInView(ref, {
    once: true,
    amount: 0.3, // 30% of the component should be visible
    // Only observe once mounted
  });

  React.useEffect(() => {
    if (hasMounted && inView) {
      setSeen((prev) => ({ ...prev, [title.toLowerCase()]: true }));
      console.log(`Setting ${title.toLowerCase()} to true`);
    }
  }, [inView, hasMounted]);

  const limitedTechs =
    limit === "all"
      ? techs
      : Object.fromEntries(Object.entries(techs).slice(0, 3));

  return (
    <motion.div
      ref={ref}
      key={title}
      className="flex min-h-[30vh] w-full flex-col gap-6 py-10"
    >
      <h2
        className="w-fit cursor-pointer text-2xl font-medium text-teal-100 transition-all duration-300 hover:text-teal-200"
        onMouseEnter={() => setHovering(title)}
        onMouseLeave={() => setHovering(null)}
      >
        {title}
      </h2>

      <Container className="min-h-full">
        <Container
          className={`flex flex-wrap gap-10 ${
            seen[title.toLowerCase()] ? "flex" : "hidden"
          }`}
        >
          {Object.entries(limitedTechs).map(([name, src], index) => (
            <motion.div
              initial={{ translateY: 100, opacity: 0 }}
              animate={
                seen[title.toLowerCase()]
                  ? { translateY: 0, opacity: 1 }
                  : { translateY: 100, opacity: 0 } // or leave empty to skip
              }
              transition={{
                translateY: {
                  duration: 0.5,
                  delay: index * 0.2,
                  ease: "easeInOut",
                },
                opacity: {
                  duration: 0.5,
                  delay: index !== 0 ? index * 0.5 : 0.5,
                  ease: "easeInOut",
                },
              }}
              key={name}
              className={`relative flex h-45 w-40 cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-teal-950 bg-gray-800 p-5 transition-all duration-300 hover:translate-y-[-1rem] hover:scale-110 hover:shadow-lg hover:shadow-teal-900/40 ${
                hovering === title
                  ? "scale-110"
                  : hovering &&
                      name in technologies[title as keyof typeof technologies]
                    ? "scale-90"
                    : "scale-100"
              }`}
              onMouseEnter={() => setVisibleTooltip(name)}
              onMouseLeave={() => setVisibleTooltip(null)}
            >
              <div
                className={`absolute -top-16 left-1/2 z-10 -translate-x-1/2 rounded bg-black px-2 py-1 text-xs text-gray-400 transition-all duration-500 ease-in-out hover:text-white ${visibleTooltip === name ? "opacity-100" : "opacity-0"}`}
              >
                {experience[name as keyof typeof experience]} months of
                experience
              </div>
              <Container className="grid flex-1 place-items-center">
                <Image src={src} alt={name} width={50} height={50} />
              </Container>
              <span className="text-foreground text-sm">{name}</span>
            </motion.div>
          ))}
        </Container>
      </Container>
    </motion.div>
  );
}

export default function TechnologiesSection({
  limit = "all",
}: {
  limit?: string;
}) {
  const [visibleTooltip, setVisibleTooltip] = useState<string | null>(null);
  const [hovering, setHovering] = useState<string | null>(null);
  const [seen, setSeen] = useState<Record<string, boolean>>({
    frontend: false,
    backend: false,
    other: false,
  });

  return (
    <Container className="xl:grid-cols-2px-4 m-10 grid grid-cols-1 p-0 py-16 pb-40 sm:px-10 md:p-20 lg:px-20">
      <SlideInFromCenter text="Technologies" initials="TH" />

      {Object.entries(technologies).map(([title, techs]) => (
        <SectionBlock
          key={title}
          title={title}
          techs={techs}
          limit={limit}
          setSeen={setSeen}
          seen={seen}
          hovering={hovering}
          setHovering={setHovering}
          visibleTooltip={visibleTooltip}
          setVisibleTooltip={setVisibleTooltip}
        />
      ))}

      {limit !== "all" && (
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
