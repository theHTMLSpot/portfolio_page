import { Label } from "@/types/ui_types";
import React from "react";

export default function LabelComponent({
  htmlFor,
  className = "",
  children,
}: Label) {
  return (
    <label htmlFor={htmlFor} className={`text-foreground ${className}`}>
      {children}
    </label>
  );
}
