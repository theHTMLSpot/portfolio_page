"use client";

import { Title } from "@/components/components";
import React, { useEffect, useRef, useState } from "react";

export default function TypingTitle({
  text,
  className,
  cursor = true,
  backspaceOnChange = false,
  duration = 2,
  waitBeforeBackspace = 1000,
  onMouseEnter,
  onMouseExit,
}: {
  text: string;
  className?: string;
  cursor?: boolean;
  backspaceOnChange?: boolean;
  duration?: number;
  waitBeforeBackspace?: number;
  onMouseEnter?: () => void;
  onMouseExit?: () => void;
}) {
  const [displayedText, setDisplayedText] = useState("");
  const textRef = useRef(""); // ✅ latest text value

  useEffect(() => {
    let typingTimeout: NodeJS.Timeout;
    let backspaceTimeout: NodeJS.Timeout;
    let pauseTimeout: NodeJS.Timeout;

    const typeSpeed = text.length > 0 ? (duration * 1000) / text.length : 100;
    const backspaceSpeed = 50;

    const backspaceText = () => {
      const backspaceNextChar = () => {
        textRef.current = textRef.current.slice(0, -1);
        setDisplayedText(textRef.current);
        if (textRef.current.length > 0) {
          backspaceTimeout = setTimeout(backspaceNextChar, backspaceSpeed);
        } else {
          pauseTimeout = setTimeout(() => {
            typeText();
          }, 1000); // pause before typing new word
        }
      };

      backspaceNextChar();
    };

    const typeText = () => {
      let currentIndex = 0;

      const typeNextChar = () => {
        const nextChar = text[currentIndex];
        if (nextChar !== undefined) {
          textRef.current = text.slice(0, currentIndex + 1);
          setDisplayedText(textRef.current);
          currentIndex++;
          typingTimeout = setTimeout(typeNextChar, typeSpeed);
        } else if (backspaceOnChange) {
          pauseTimeout = setTimeout(() => {
            setTimeout(() => {}, waitBeforeBackspace);
            backspaceText();
          }, waitBeforeBackspace);
        }
      };

      typeNextChar();
    };

    // Reset and start animation
    setDisplayedText("");
    textRef.current = "";
    typeText();

    return () => {
      clearTimeout(typingTimeout);
      clearTimeout(backspaceTimeout);
      clearTimeout(pauseTimeout);
    };
  }, [text, duration, backspaceOnChange]);

  return (
    <div
      className={`z-0 flex h-full ${className}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseExit}
    >
      <Title level={1} className="h-full font-bold text-current">
        {displayedText}
        {cursor && <span className="ml-1 animate-pulse text-current">|</span>}
      </Title>
    </div>
  );
}
