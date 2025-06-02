"use client";

import { useEffect, useRef, useState } from "react";
import { Container, Link } from "@/components/components";
import { usePathname } from "next/navigation";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import hamburgerAnimation from "@/animations/hamburger.json";

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
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  // Screen resize effect to detect mobile
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Initialize animation to frame 0 once Lottie is ready
  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.goToAndStop(0, true);
    }
  }, []);

  const toggleMenu = () => {
    if (!lottieRef.current) {
      console.warn("Lottie animation ref not ready");
      return;
    }

    if (!menuOpen) {
      // Play frames 0 to 30 (opening animation)
      lottieRef.current.playSegments([0, 30], true);
    } else {
      // Play frames 30 to 59 (closing animation)
      lottieRef.current.playSegments([30, 59], true);
      // After closing, reset to frame 0
    }

    setMenuOpen((prev) => !prev);
  };

  return (
    <nav className="bg-background fixed top-0 right-0 left-0 z-50 border-b border-gray-700 shadow-md">
      <Container className="flex h-20 items-center justify-between px-4 py-3">
        <Link href="/" className="text-foreground text-xl font-semibold">
          Ethan Lagden
        </Link>

        {isMobile ? (
          <div className="relative flex w-50 items-end justify-end">
            <button
              onClick={toggleMenu}
              className="text-foreground focus:outline-none"
              aria-label="Toggle menu"
            >
              <Lottie
                lottieRef={lottieRef}
                animationData={hamburgerAnimation}
                loop={false}
                autoplay={false}
                style={{ height: 32, width: 32 }}
              />
            </button>

            <div
              className={`bg-background absolute top-full right-0 left-0 z-40 flex max-h-96 flex-col items-center gap-4 overflow-hidden border-t border-gray-700 px-4 py-4 transition-all delay-300 duration-700 ease-in-out ${menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none max-h-0 opacity-0"} `}
            >
              {Object.entries(links).map(([name, href]) => (
                <Link
                  key={name}
                  href={href}
                  className={`text-foreground text-lg transition-all duration-100 hover:underline ease-in-out${
                    pathname === href ? "text-teal-500 underline" : ""
                  }`}
                >
                  {name}
                </Link>
              ))}
            </div>
          </div>
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
    </nav>
  );
}
