"use client";

import { useState } from "react";
import { Input } from "@/types/input_with_hover_label";

export default function InputWithHoverLabel({ ...props }: Readonly<Input>) {
  const [isHovered, setIsHovered] = useState(false);

  const { name, label, onChange, type, value } = props;

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    if (value === "") setIsHovered(false);
  };

  return (
    <div
      className="relative flex w-full flex-col gap-1 pt-5"
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
    >
      <label
        htmlFor={name}
        className={`pointer-events-none absolute text-sm font-semibold transition-all duration-200 ${
          isHovered || value !== ""
            ? "top-2.5 left-2 bg-[#0a0a0a] text-white"
            : "top-[50%] left-2 text-gray-400"
        }`}
      >
        {label}
      </label>
      <input
        {...props}
        value={value}
        type={type}
        onChange={onChange}
        className="w-full rounded-md border border-gray-600 bg-gray-800 p-5 text-white"
      />
    </div>
  );
}
