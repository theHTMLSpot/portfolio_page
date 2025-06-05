"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SlideInTitle from "./slide_in_title";

export default function SlideInFromCenter({
  text,
  initials,
}: {
  text: string;
  initials: string;
}) {
  const [phase, setPhase] = useState<"initial" | "slide" | "expand">("initial");

  useEffect(() => {
    setPhase("initial");

    const slideTimeout = setTimeout(() => setPhase("slide"), 100);
    const expandTimeout = setTimeout(() => setPhase("expand"), 900);

    return () => {
      clearTimeout(slideTimeout);
      clearTimeout(expandTimeout);
    };
  }, [text, initials]);

  if (phase === "slide") {
    return (
      <div className="flex w-60 items-center overflow-hidden">
        <SlideInTitle text={initials} className="w-full text-center" />
      </div>
    );
  }

  if (phase === "expand") {
    return (
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.1, ease: "easeOut" }}
        style={{ transformOrigin: "center" }}
        className="w-60 overflow-hidden whitespace-nowrap"
      >
        <h1 className="overflow-clip text-left text-4xl font-bold whitespace-nowrap">
          {text}
        </h1>
      </motion.div>
    );
  }

  return (
    <div
      className="overflow-hidden"
      style={{ width: "auto", textAlign: "left" }}
    >
      <h1 className="text-4xl font-bold whitespace-nowrap">{text}</h1>
    </div>
  );
}
