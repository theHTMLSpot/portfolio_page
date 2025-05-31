import { Container, Link } from "@/components/components";
import React from "react";

export default function FooterSection() {
  return (
    <Container className="grid place-items-center border-t border-gray-600 p-10">
      <p>Copyright &copy; 2023</p>
      <Container className="grid w-screen grid-cols-2 place-items-center gap-4 bg-black p-10">
        <Container className="flex flex-col items-baseline gap-2">
          <Link href="https://www.youtube.com/">Youtube</Link>
          <Link href="https://www.facebook.com/">Facebook</Link>
          <Link href="https://www.instagram.com/">Instagram</Link>
          <Link href="https://www.x.com/">Twitter</Link>
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
