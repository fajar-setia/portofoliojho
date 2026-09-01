import { useEffect } from "react";
import Lenis from "lenis";
import Hero from "../components/home/Hero";
import About from "../components/home/About";
import Projects from "../components/home/Projects";
import Skills from "../components/home/Skills";
import Education from "../components/home/Education";

export default function LandingPage() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main className="relative w-full bg-[var(--putih)]">
      <div
        id="Home"
        className="sticky top-0 z-0 h-screen w-full"
      >
        <Hero />
      </div>

      <div
        id="About"
        className="sticky top-0 z-10 min-h-screen w-full bg-[var(--hitam)]"
      >
        <About />
      </div>

      <div
        id="Projects"
        className="relative z-20 min-h-screen w-full bg-[var(--putih)]"
      >
        <Projects />
      </div>

      <div
        id="Skills"
        className="relative z-30 min-h-screen w-full bg-[var(--putih)]"
      >
        <Skills />
      </div>

      <div
        id="Education"
        className="relative z-40 min-h-screen w-full bg-[var(--putih)]"
      >
        <Education />
      </div>
    </main>
  );
}
