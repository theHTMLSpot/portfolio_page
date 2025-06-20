"use client";

import { Container, Paragraph } from "@/components/components";
import TypingTitle from "@/components/motion/typing_title";
import ResumeDownloadButton from "@/components/resume_download";
import Image from "next/image";

import { motion } from "motion/react";

export default function AboutPage() {
  return (
    <Container className="m-10 grid grid-cols-1 gap-10 p-6 pt-20 sm:px-10 md:grid-cols-2 md:p-20 lg:px-20 xl:gap-20">
      {/* Text Content */}
      <Container className="flex flex-col justify-center">
        <TypingTitle
          text="About Me"
          className="text-foreground mb-10 text-4xl font-black"
        />

        <Paragraph className="text-foreground mb-10 leading-relaxed">
          Hi! I{"'"}ve been interested in programming since I was 9.
          <br />
          <br />I started with C++ because I wanted to make games in Unreal
          Engine, but my laptop couldn{"'"}t handle it, so I switched to Unity
          and learned C#.
          <br />
          <br />
          Pretty quickly, I realized game development was harder than I thought,
          so when I turned 10, I decided to go back to the basics.
          <br />
          <br />I searched for {'"'}coding tutorial for beginners{'"'} and found
          a video on building a website. I was hooked.
          <br />
          <br />
          I started with HTML and loved how simple and intuitive it was. But
          eventually, HTML and CSS became too easy, so I searched again — this
          time discovering Python.
          <br />
          <br />
          Compared to C++ and C#, Python felt magical. I loved it.
          <br />
          <br />
          Then came JavaScript, which unlocked the full potential of interactive
          websites. That{"'"}s when I realized web development could also be a
          way to make money.
          <br />
          <br />
          I soon discovered Node.js for backend development and started learning
          it.
          <br />
          <br />
          Around that time, I had a school project where I interviewed a
          frontend developer (who introduced me to React and Git) and a backend
          developer (who introduced me to Flask).
          <br />
          <br />
          Flask was much more beginner-friendly than Node.js, so I switched. I
          also tried Django but found it too bloated.
          <br />
          <br />
          Eventually, I discovered FastAPI — and it clicked instantly. I loved
          the documentation, /docs testing UI, and the development experience
          overall.
          <br />
          <br />
          Around the same time, I discovered Next.js and found it much more
          powerful than plain React, especially for routing and component
          structure.
          <br />
          <br />
          For the next two years, I focused on building with FastAPI and
          Next.js.
          <br />
          <br />
          Along the way, I dabbled in Unity again — until their pricing plan
          changed — so I jumped over to Godot.
          <br />
          <br />
          I spent a few months with it, hit a wall on a project, took a break,
          and then remembered why I started in the first place: Unreal Engine.
          <br />
          <br />I{"'"}m still working on a simple game with UE, and the journey
          continues.
          <br />
          <br />I{""}m excited to keep learning, building, and growing — and I
          hope you enjoyed reading my story!
        </Paragraph>
        <ResumeDownloadButton />
      </Container>

      {/* Image */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="hidden h-fit justify-center md:flex"
      >
        <Image
          src="/images/ethan.jpg"
          alt="Portrait of Ethan Lagden"
          width={7000}
          height={7000}
          className="aspect-auto w-1/2 rounded-full transition-transform duration-300 ease-in-out hover:scale-105"
          priority
          aria-hidden="true"
        />
      </motion.div>
    </Container>
  );
}
