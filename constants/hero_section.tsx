"use client";

import { Container, Paragraph, Title } from "@/components/components";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import RevealBars from "@/components/motion/bars";
import TypingTitle from "@/components/motion/typing_title";
import FadeInTitle from "@/components/motion/fade_in_title";
import { AnimatePresence, motion } from "framer-motion";

const firstWords = ["Fullstack", "Problem", "Creative"];
const secondWords = ["Developer", "Solver", "Thinker"];

export default function HeroSection() {
  const router = useRouter();

  const [showLoader, setShowLoader] = useState(false);
  const [showBars, setShowBars] = useState(false);

  const [firstWord, setFirstWord] = useState(0);
  const [secondWord, setSecondWord] = useState(0);
  const [dots, setDots] = useState(0);

  useEffect(() => {
    const cycleWords = setInterval(() => {
      setFirstWord((prev) => (prev + 1) % firstWords.length);
      setSecondWord((prev) => (prev + 1) % secondWords.length);
    }, 7000);

    return () => clearInterval(cycleWords);
  }, []);

  useEffect(() => {
    setShowLoader(true);

    const loadingAnimation = setInterval(() => {
      setDots((prev) => (prev + 1) % 4);
    }, 250);

    document.body.style.overflowY = "hidden";

    const loaderTimer = setTimeout(() => {
      setShowLoader(false);
      setShowBars(true);
    }, 2500);

    const barsTimer = setTimeout(() => {
      setShowBars(false);
      document.body.style.overflowY = "auto";
    }, 5000);

    return () => {
      clearTimeout(loaderTimer);
      clearTimeout(barsTimer);
      clearInterval(loadingAnimation);
    };
  }, []);

  const BackgroundImage = () => (
    <Image
      src="/images/background.png"
      alt="Decorative Background"
      className="pointer-events-none absolute top-0 left-0 h-full w-full object-cover opacity-40"
      width={1920}
      height={1080}
      priority
      aria-hidden="true"
      role="presentation"
    />
  );

  const name = ["E", "t", "h", "a", "n", " ", "L", "a", "g", "d", "e", "n"];

  if (showLoader) {
    return (
      <div className="bg-background z-50 flex min-h-screen flex-col items-center justify-center gap-4">
        <Paragraph className="flex gap-0 text-center text-2xl font-semibold">
          {name.map((char, i) =>
            char === " " ? (
              <span key={i} className="w-2" />
            ) : (
              <motion.span
                key={i}
                className="text-foreground inline-block"
                animate={{
                  y: [0, -6, 6, 0],
                  opacity: [1, 0.8, 1],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.1,
                  ease: [0.42, 0, 0.58, 1],
                  repeat: Infinity,
                  repeatType: "loop",
                }}
              >
                {char}
              </motion.span>
            ),
          )}
        </Paragraph>

        <div className="flex w-full items-center justify-center gap-3 text-xl">
          <Paragraph className="text-md w-fit text-center">Welcome</Paragraph>
          <span className="text-md animate-pulse">{".".repeat(dots)}</span>
        </div>
      </div>
    );
  }

  return (
    <>
      {showBars && <RevealBars />}

      <Container className="relative z-0 flex min-h-screen items-center justify-between gap-10">
        {/* Background */}
        <div className="absolute top-0 left-0 -z-10 h-full w-full">
          <BackgroundImage />
          <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-t from-[#0b0a0b] to-transparent" />
        </div>

        {/* Text Content */}
        <Container className="relative z-20 flex w-1/2 flex-col gap-2 p-5 sm:w-full sm:p-20 md:w-1/2 md:p-20">
          <Paragraph>Hi! My name is</Paragraph>
          <Title level={2} className="text-foreground text-4xl font-bold">
            Ethan Lagden,
          </Title>

          <div className="text-foreground flex w-full max-w-full flex-row items-baseline gap-4 pr-10 text-5xl font-black whitespace-nowrap sm:text-2xl">
            <AnimatePresence mode="wait">
              <span className="w-fit">
                <TypingTitle
                  duration={2}
                  className="text-white"
                  cursor={true}
                  backspaceOnChange={true}
                  waitBeforeBackspace={
                    firstWords[firstWord] === "fullstack" ? 2150 : 3750
                  }
                  text={firstWords[firstWord]}
                />
                {/* invisible fallback to prevent layout shift */}
                <Title
                  level={1}
                  className="h-full text-4xl font-bold text-current opacity-0 sm:text-2xl md:text-5xl"
                >
                  {firstWords[firstWord]}
                </Title>
              </span>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <FadeInTitle
                key={secondWords[secondWord]}
                className="text-gray-300"
                text={secondWords[secondWord]}
                duration={2}
              />
            </AnimatePresence>
          </div>

          <Paragraph>5+ years of programming experience.</Paragraph>
          <button
            onClick={() => router.push("/contact")}
            className="text-foreground easeInOut text-md relative my-5 h-auto w-fit rounded-md bg-teal-500 px-30 py-5 whitespace-nowrap transition-all duration-300 hover:-translate-y-2 hover:bg-teal-600"
          >
            Contact Me
          </button>
        </Container>
      </Container>
    </>
  );
}
