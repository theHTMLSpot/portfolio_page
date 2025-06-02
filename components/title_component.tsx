import React, { JSX } from "react";
import { Title } from "@/types/ui_types";

export default function TitleComponent({
  level,
  className = "",
  children,
}: Title) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return React.createElement(
    Tag,
    {
      className: `w-full max-w-xl py-1 text-foreground ${className}`,
    },
    children,
  );
}
