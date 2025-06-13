"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import SlideInTitle from "./slide_in_title";

export default function SlideInFromCenter({
  text,
  initials,
}: {
  text: string;
  initials: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [phase, setPhase] = useState<"initial" | "slide" | "expand" | "done">(
    "initial",
  );

  useEffect(() => {
    if (!isInView) return;

    setPhase("initial");

    const slideTimeout = setTimeout(() => setPhase("slide"), 100);
    const expandTimeout = setTimeout(() => setPhase("expand"), 900);
    const doneTimeout = setTimeout(() => setPhase("done"), 2000);

    return () => {
      clearTimeout(slideTimeout);
      clearTimeout(expandTimeout);
      clearTimeout(doneTimeout);
    };
  }, [isInView, text, initials]);

  return (
    <div
      ref={ref}
      className="flex h-20 w-[250px] items-center justify-center overflow-hidden"
    >
      {phase === "slide" && (
        <SlideInTitle
          text={initials}
          className="cursor h-20 w-full cursor-pointer text-center text-4xl font-bold whitespace-nowrap transition-all duration-300 ease-in-out hover:font-black hover:text-teal-400 hover:underline"
        />
      )}

      {phase === "expand" && (
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "250px" }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          style={{ transformOrigin: "center" }}
          className="relative flex h-20 items-center justify-center overflow-hidden"
        >
          <h1 className="absolute top-0 left-1/2 w-full -translate-x-1/2 overflow-hidden text-4xl font-bold whitespace-nowrap">
            {text}
          </h1>
        </motion.div>
      )}

      {phase === "done" && (
        <h1 className="cursor h-20 w-full cursor-pointer text-left text-4xl font-bold whitespace-nowrap transition-all duration-300 ease-in-out hover:font-black hover:text-teal-400 hover:underline">
          {text}
        </h1>
      )}
    </div>
  );
}
