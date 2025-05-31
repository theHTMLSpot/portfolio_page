"use client";

import { useEffect, useRef, useState } from "react";
import { Container, Link } from "@/components/components";
import { usePathname } from "next/navigation";
import React from "react";

const links = {
  Home: "/",
  About: "/about",
  Technologies: "/technologies",
  Projects: "/projects",
  Contact: "/contact",
};

export default function NavbarSection() {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <nav className="bg-background fixed top-0 right-0 left-0 z-50 border-b border-gray-700 shadow-md">
      <Container className="flex h-20 items-center justify-between px-4 py-3">
        <Link href="/" className="text-foreground text-xl font-semibold">
          Ethan Lagden
        </Link>

        {isMobile ? (
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="text-foreground focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        ) : (
          <div className="flex gap-6">
            {Object.entries(links).map(([name, href]) => (
              <Link
                key={name}
                href={href}
                className={`text-foreground transition-all hover:underline ${
                  pathname === href ? "text-teal-500" : ""
                }`}
              >
                {name}
              </Link>
            ))}
          </div>
        )}
      </Container>

      {/* Mobile Menu */}
      {isMobile && menuOpen && (
        <div
          ref={menuRef}
          className="bg-background z-40 flex flex-col items-center gap-4 border-t border-gray-700 px-4 py-4 transition-all duration-300"
        >
          {Object.entries(links).map(([name, href]) => (
            <Link
              key={name}
              href={href}
              className={`text-foreground text-lg hover:underline ${
                pathname === href ? "text-teal-500 underline" : ""
              }`}
            >
              {name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
