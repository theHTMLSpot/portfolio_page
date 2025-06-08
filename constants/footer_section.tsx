import { Container, Link } from "@/components/components";
import React from "react";

export default function FooterSection() {
  return (
    <Container className="grid place-items-center border-t border-gray-600 bg-black py-10">
      <p>Copyright &copy; 2023</p>
      <p>Designed and Developed by Ethan Lagden</p>
      <Container className="flex w-screen items-baseline justify-center gap-4 bg-black py-10">
        <Container className="flex flex-col items-baseline gap-2">
          <Link
            target="_blank"
            href="https://www.youtube.com/@TheAboveAverageDude"
          >
            Youtube
          </Link>
          <Link target="_blank" href="https://www.facebook.com/">
            Facebook
          </Link>
          <Link target="_blank" href="https://www.instagram.com/">
            Instagram
          </Link>
          <Link target="_blank" href="https://www.x.com/">
            Twitter
          </Link>
        </Container>
        <Container className="flex flex-col gap-2">
          <Link href="/"> Home </Link>
          <Link href="/about"> About </Link>
          <Link href="/technologies"> Technologies </Link>
          <Link href="/projects"> Projects </Link>
          <Link href="/contact"> Contact </Link>
        </Container>
      </Container>
    </Container>
  );
}
