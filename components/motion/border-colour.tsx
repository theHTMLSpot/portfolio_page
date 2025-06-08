"use client";

import { useState } from "react";
import TypingTitle from "./typing_title";

export default function BorderColorTitle({ text }: { text: string }) {
  const [hovering, setHovering] = useState(false);

  return (
    <div className="relative w-fit overflow-visible p-1">
      <h1
        className={`text-stroke-1 text-stroke-gray-500 text-background absolute top-0 left-0 -z-10 text-2xl font-bold whitespace-nowrap opacity-0 transition-all duration-300 ease-in-out md:text-3xl xl:text-4xl ${
          hovering ? "translate-x-[-5px] translate-y-[-8px] opacity-100" : ""
        }`}
      >
        {text}
      </h1>

      <h1 className="text-background text-stroke-1 text-stroke-teal text-2xl font-bold whitespace-nowrap md:text-3xl xl:text-4xl">
        {text}
      </h1>

      <TypingTitle
        duration={1}
        text={text}
        cursor={false}
        backspaceOnChange={false}
        waitBeforeBackspace={Number.MAX_SAFE_INTEGER}
        className={`absolute text-2xl font-bold whitespace-nowrap transition-all duration-300 ease-in-out md:text-3xl xl:text-4xl ${
          hovering ? "top-2 left-2" : "top-1 left-1.5"
        }`}
        onMouseEnter={() => setHovering(true)}
        onMouseExit={() => setHovering(false)}
      />
    </div>
  );
}
