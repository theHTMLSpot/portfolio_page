"use client";

import { Title } from "@/components/components";
import { useEffect, useState } from "react";

export default function TypingTitle({
  text,
  className,
  cursor = true,
  backspaceOnChange = false,
  duration = 2,
}: {
  text: string;
  className?: string;
  cursor?: boolean;
  backspaceOnChange?: boolean;
  duration?: number; // duration in seconds for the typing effect
}) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isBackspacing, setIsBackspacing] = useState(false);

  useEffect(() => {
    let typingTimeout: NodeJS.Timeout;
    let backspaceTimeout: NodeJS.Timeout;
    let pauseTimeout: NodeJS.Timeout;

    // Clear any existing text when text prop changes
    setDisplayedText("");
    setIsTyping(false);
    setIsBackspacing(false);

    const typeSpeed = text.length > 0 ? (duration * 1000) / text.length : 100;
    const backspaceSpeed = 50;

    const typeText = () => {
      setIsTyping(true);
      let currentIndex = 0;

      const typeNextChar = () => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
          typingTimeout = setTimeout(typeNextChar, typeSpeed);
        } else {
          setIsTyping(false);
          // If backspaceOnChange is true, start backspacing after a pause
          if (backspaceOnChange) {
            pauseTimeout = setTimeout(() => {
              backspaceText();
            }, 1000); // 1 second pause before backspacing
          }
        }
      };

      typeNextChar();
    };

    const backspaceText = () => {
      setIsBackspacing(true);
      let currentText = text;

      const backspaceNextChar = () => {
        if (currentText.length > 0) {
          currentText = currentText.slice(0, -1);
          setDisplayedText(currentText);
          backspaceTimeout = setTimeout(backspaceNextChar, backspaceSpeed);
        } else {
          setIsBackspacing(false);
          // Start typing again after backspacing is complete
          setTimeout(() => {
            typeText();
          }, 500);
        }
      };

      backspaceNextChar();
    };

    // Start the typing animation
    typeText();

    // Cleanup function
    return () => {
      clearTimeout(typingTimeout);
      clearTimeout(backspaceTimeout);
      clearTimeout(pauseTimeout);
    };
  }, [text, duration, backspaceOnChange]);

  return (
    <div className={`flex h-full ${className}`}>
      <Title level={1} className="h-full whitespace-nowrap">
        {displayedText}
        {cursor && <span className="ml-1 animate-pulse text-current">|</span>}
      </Title>
    </div>
  );
}
