import { Input } from "@/types/ui_types";
import React from "react";

export default function InputComponent({
  type,
  placeholder,
  className = "",
  onChange,
}: Input) {
  if (type === "textarea") {
    return (
      <textarea
        placeholder={placeholder}
        className={`border-foreground rounded-lg border-2 p-2 ${className}`}
        onChange={onChange}
      />
    );
  }
  if (type === "dropdown") {
    return (
      <select
        title={placeholder}
        className={`border-foreground rounded-lg border-2 p-2 ${className}`}
        onChange={onChange}
      />
    );
  }
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`border-foreground rounded-lg border-2 p-2 ${className}`}
      onChange={onChange}
    />
  );
}
