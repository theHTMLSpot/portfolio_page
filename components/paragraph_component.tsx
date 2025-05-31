import { Paragraph } from "@/types/ui_types";
import React from "react";

export default function ParagraphComponent({
  className = "",
  children,
}: Paragraph) {
  return <p className={`text-foreground ${className}`}>{children}</p>;
}
