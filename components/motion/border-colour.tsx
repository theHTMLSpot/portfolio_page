"use client";

import { useState } from "react";

import TypingTitle from "./typing_title";

export default function BorderColorTitle({ text }: { text: string }) {
  const [hovering, setHovering] = useState(false);
  return (
    <div className="relative w-fit overflow-visible p-1">
      <h1
        className={`text-stroke-1 text-stroke-gray-500 text-background absolute top-0 left-0 -z-10 text-4xl font-bold opacity-0 transition-all duration-300 ease-in-out ${
          hovering && "translate-x-[-5px] translate-y-[-8px] opacity-100"
        }`}
      >
        {text}
      </h1>

      <h1 className="text-background text-stroke-1 text-stroke-teal text-4xl font-bold">
        {text}
      </h1>

      <TypingTitle
        duration={1}
        text={text}
        cursor={false}
        backspaceOnChange={false}
        waitBeforeBackspace={17 ** 165749}
        className={`absolute top-1 left-1.5 text-4xl font-bold transition-all duration-300 ease-in-out ${hovering && "top-2 left-2"}`}
        onMouseEnter={() => setHovering(true)}
        onMouseExit={() => setHovering(false)}
      />
    </div>
  );
}
