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
  const [phase, setPhase] = useState<"initial" | "slide" | "expand" | "done">(
    "initial",
  );

  useEffect(() => {
    setPhase("initial");

    const slideTimeout = setTimeout(() => setPhase("slide"), 100);
    const expandTimeout = setTimeout(() => setPhase("expand"), 900);
    const doneTimeout = setTimeout(() => setPhase("done"), 2000);

    return () => {
      clearTimeout(slideTimeout);
      clearTimeout(expandTimeout);
      clearTimeout(doneTimeout);
    };
  }, [text, initials]);

  if (phase === "slide") {
    return (
      <div
      className="overflow-hidden w-[250px] h-20 flex items-center justify-center"
      >
        <SlideInTitle text={initials} className="h-20 cursor w-full cursor-pointer text-center text-4xl font-bold whitespace-nowrap transition-all duration-300 ease-in-out hover:font-black hover:text-teal-400 hover:underline  " />
      </div>
    );
  }

  if (phase === "expand") {
    return (
      <div className="w-[250px] flex items-center justify-center h-20">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "250px" }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          style={{ transformOrigin: "center" }}
          className="relative flex items-center justify-center h-20 overflow-hidden"
        >
          <h1 className="text-4xl w-full absolute top-0 left-1/2 text-left -translate-x-1/2 font-bold overflow-hidden whitespace-nowrap ">
            {text}
          </h1>
        </motion.div>
      </div>

    );
  }

  return (
    <div
      className="overflow-hidden w-[250px] h-20 flex items-center justify-center"
      
    >
      <h1 className="h-20 cursor w-full cursor-pointer text-left text-4xl font-bold whitespace-nowrap transition-all duration-300 ease-in-out hover:font-black hover:text-teal-400 hover:underline  ">
        {text}
      </h1>
    </div>
  );
}
