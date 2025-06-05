import { Container, Paragraph, Title, Link } from "@/components/components";
import Image from "next/image";
import React from "react";

export default function AboutSection() {
  return (
    <Container className="m-10 grid grid-cols-2 p-20 pb-40">
      <Container className="flex h-full w-full flex-col items-start justify-center">
        <Title level={1} className="my-10 text-2xl font-black">
          Who Am I
        </Title>

        <Paragraph className="text-foreground mb-10">
          I am a high school student who since 9 years of age has been
          interested in programming. I am currently learning more about web
          development and am excited to expand my knowledge in this field. My
          goal is to become a full-stack developer and contribute to the world
          of technology. I would consider myself an amazing problem solver and a
          quick learner. And I am always looking for new opportunities to learn
          and grow. However I also have my weaknesses. I am not a very social
          person and I am not a very good communicator. I also sometimes
          struggle to work as a team mostly due to school projects where I would
          end up doing everything by myself but {"i'm"} working to be better. I
          hope we can work together in the future.
        </Paragraph>

        <Link href="/about" className="text-foreground underline">
          {" "}
          Read More{" "}
        </Link>
      </Container>
      <Container className="flex h-full w-full items-center justify-end">
        <Image
          src="/images/ethan.jpeg"
          alt="Ethan Lagden"
          width={500}
          height={500}
          className="w-[50%] rounded-full"
          priority
          aria-hidden="true"
        />
      </Container>
    </Container>
  );
}
