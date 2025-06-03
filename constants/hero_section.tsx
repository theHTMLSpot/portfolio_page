"use client";

import { Container, Paragraph, Title } from "@/components/components";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import RevealBars from "@/components/motion/bars";
import TypingTitle from "@/components/motion/typing_title";
import FadeInTitle from "@/components/motion/fade_in_title";
import { AnimatePresence } from "framer-motion";

const firstWords = ["Fullstack", "Problem", "Creative"];

const secondWords = ["Developer", "Solver", "Thinker"];

export default function HeroSection() {
  const router = useRouter();

  const [showLoader, setShowLoader] = useState(false);
  const [showBars, setShowBars] = useState(false);

  const [firstWord, setFirstWord] = useState(0);
  const [secondWord, setSecondWord] = useState(0);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const cycleWords = () => {
      setFirstWord((prev) => (prev + 1) % firstWords.length);
      setSecondWord((prev) => (prev + 1) % secondWords.length);

      // Schedule next cycle AFTER animations are done
      timeout = setTimeout(cycleWords, 5000); // match total animation time
    };

    // Start initial cycle
    timeout = setTimeout(cycleWords, 5000);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    setShowLoader(true);

    const loaderTimer = setTimeout(() => {
      setShowLoader(false);
      setShowBars(true);
    }, 1500);

    const barsTimer = setTimeout(() => {
      setShowBars(false);
    }, 3000);

    return () => {
      clearTimeout(loaderTimer);
      clearTimeout(barsTimer);
    };
  }, []);

  const BackgroundImage = () => (
    <Image
      src="/images/background.png"
      alt="Decorative Background"
      className="pointer-events-none absolute top-0 left-0 -z-10 h-full w-full object-cover pt-20 opacity-40"
      width={1920}
      height={1080}
      priority
      aria-hidden="true"
      role="presentation"
    />
  );

  if (showLoader) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-2">
        <Paragraph className="text-center text-2xl">Ethan Lagden</Paragraph>
        <Paragraph className="text-md text-center">Welcome ...</Paragraph>
      </div>
    );
  }

  return (
    <>
      {showBars && <RevealBars />}

      <Container className="relative flex min-h-screen items-center justify-between gap-10">
        <BackgroundImage />
        <div className="absolute top-0 left-0 -z-10 h-full w-full bg-gradient-to-t from-[#0b0a0b] to-transparent" />
        <Container className="z-30 flex w-1/2 flex-col gap-2 p-20">
          <Paragraph>Hi! My name is</Paragraph>
          <Title level={2} className="text-foreground text-4xl font-bold">
            Ethan Lagden,
          </Title>

          <div className="text-foreground flex max-w-full flex-row items-baseline gap-4 text-5xl font-black whitespace-nowrap">
            <AnimatePresence mode="wait">
              <span className="w-fit">
                <TypingTitle
                  duration={2}
                  className="text-white"
                  cursor={true}
                  backspaceOnChange={true}
                  text={firstWords[firstWord]}
                />
                <Title level={1} className="text-5xl opacity-0">
                  {firstWords[firstWord]}
                </Title>
              </span>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <FadeInTitle
                key={secondWords[secondWord]}
                className="text-gray-300"
                text={secondWords[secondWord]}
                duration={1}
              />
            </AnimatePresence>
          </div>

          <Paragraph>5+ years of programming experience.</Paragraph>
          <button
            onClick={() => router.push("/contact")}
            className="text-foreground my-20 h-12 w-60 rounded-md bg-teal-600 p-5 px-4 py-2 hover:bg-teal-700"
          >
            Contact Me
          </button>
        </Container>
      </Container>
    </>
  );
}
