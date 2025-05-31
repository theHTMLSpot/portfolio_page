"use client";

import { Container, Paragraph, Title } from "@/components/components";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";

export default function HeroSection() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

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

  BackgroundImage();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-2">
        <Paragraph className="text-center text-2xl"> Ethan Lagden </Paragraph>
        <Paragraph className="text-md text-center"> Welcome ... </Paragraph>
      </div>
    );
  }

  return (
    <>
      <Container className="relative -z-10 flex min-h-screen items-center justify-between gap-10">
        <BackgroundImage />
        <div className="absolute top-0 left-0 -z-10 h-full w-full bg-gradient-to-t from-black to-transparent" />
        <Container className="z-30 flex flex-col gap-2 p-20">
          <Paragraph>Hi!. My name is</Paragraph>
          <Title level={5} className="text-foreground text-xl font-light">
            Ethan Lagden,
          </Title>
          <Title level={1} className="text-foreground text-4xl font-black">
            Fullstack Developer
          </Title>
          <Paragraph>5+ years of programming experience.</Paragraph>
          <button
            onClick={() => {
              router.push("/contact");
            }}
            className="text-foreground my-20 h-12 w-60 rounded-md bg-teal-600 p-5 px-4 py-2 hover:bg-teal-700"
          >
            Contact Me
          </button>
        </Container>
      </Container>
    </>
  );
}
