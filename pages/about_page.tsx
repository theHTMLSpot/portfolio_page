"use client";

import { Container, Paragraph } from "@/components/components";
import TypingTitle from "@/components/motion/typing_title";
import Image from "next/image";

export default function AboutPage() {
  return (
    <Container className="m-10 grid grid-cols-1 xl:grid-cols-2 p-20 pb-40">
      <Container className="flex h-full w-full flex-col items-start justify-center">
        <TypingTitle
          text="About Me"
          className="text-foreground mb-10 text-4xl font-black"
        />
        

        <Paragraph className="text-foreground mb-10">
          Hi! I{"'"}ve been interested in programming since I was 9. I started
          with C++ because I wanted to make games in Unreal Engine, but my
          laptop couldn{"'"}t handle it, so I switched to Unity and learned C#.
          Pretty quickly, I realized game development was harder than I thought,
          so when I turned 10, I decided to go back to the basics. I searched
          for {'"'}coding tutorial for beginners{'"'} and found a video on
          building a website. I was hooked. I started with HTML and loved how
          simple and intuitive it was. But eventually, HTML and CSS became too
          easy, so I searched again — this time discovering Python. Compared to
          C++ and C#, Python felt magical. I loved it. Then came JavaScript,
          which unlocked the full potential of interactive websites. That{"'"}s
          when I realized web development could also be a way to make money. I
          soon discovered Node.js for backend development and started learning
          it. Around that time, I had a school project where I interviewed a
          frontend developer (who introduced me to React and Git) and a backend
          developer (who introduced me to Flask). Flask was much more
          beginner-friendly than Node.js, so I switched. I also tried Django but
          found it too bloated. Eventually, I discovered FastAPI — and it
          clicked instantly. I loved the documentation, /docs testing UI, and
          the development experience overall. Around the same time, I discovered
          Next.js and found it much more powerful than plain React, especially
          for routing and component structure. For the next two years, I focused
          on building with FastAPI and Next.js. Along the way, I dabbled in
          Unity again — until their pricing plan changed — so I jumped over to
          Godot. I spent a few months with it, hit a wall on a project, took a
          break, and then remembered why I started in the first place: Unreal
          Engine. I{"'"}m still working on a simple game with UE, and the
          journey continues. I{""}m excited to keep learning, building, and
          growing — and I hope you enjoyed reading my story!
        </Paragraph>
      </Container>
      <Container className="hidden xl:flex h-full items-center justify-end">
        <Image
          src="/images/ethan.jpeg"
          alt="Ethan Lagden"
          width={500}
          height={500}
          className="w-[50%] rounded-full hover:scale-105 transition-all duration-300 ease-in-out"
          priority
          aria-hidden="true"
        />
      </Container>

    </Container>
  );
}
