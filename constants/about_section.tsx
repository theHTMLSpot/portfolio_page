"use client";

import { Container, Paragraph, Title, Link } from "@/components/components";
import ResumeDownloadButton from "@/components/resume_download";
import Image from "next/image";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ paddingLeft: "0px", paddingRight: "0px" }}
      animate={{
        paddingLeft: isInView ? "2.5rem" : "0rem",
        paddingRight: isInView ? "2.5rem" : "0rem",
      }} // Adjust for sm:p-10
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="m-10 grid grid-cols-1 gap-10 sm:p-10 md:grid-cols-2 md:gap-16 lg:p-20 xl:gap-20"
    >
      {/* Text Content */}
      <Container className="flex flex-col justify-center">
        <Title level={1} className="mb-8 text-3xl font-black sm:text-4xl">
          Who Am I
        </Title>

        <Paragraph className="text-foreground mb-10 leading-relaxed">
          I’m a high school student who has been passionate about programming
          since the age of 9. Currently, I’m focused on learning web development
          and expanding my skills in full-stack technologies. I consider myself
          a strong problem solver and a fast learner, always eager to explore
          new challenges and opportunities to grow.
          <br />
          <br />
          That said, I’m also aware of my weaknesses. I’m not naturally social
          and sometimes struggle with communication—especially in team settings.
          School group projects often led me to take on everything myself, which
          didn’t help. But I’m actively working on improving those areas.
          <br />
          <br />
          I’m excited about the future and look forward to the chance to
          collaborate and build something great together.
        </Paragraph>

        <Container className="flex gap-4">
          <Link href="/about">Read More</Link>
          <ResumeDownloadButton />
        </Container>
      </Container>

      {/* Image Content */}
      <motion.div
        initial={{ scale: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="hidden items-center justify-center md:flex"
      >
        <Image
          src="/images/ethan.jpg"
          alt="Portrait of Ethan Lagden"
          width={500}
          height={500}
          className="aspect-square w-1/2 rounded-full transition-transform duration-300 ease-in-out hover:scale-105"
          priority
          aria-hidden="true"
        />
      </motion.div>
    </motion.div>
  );
}
