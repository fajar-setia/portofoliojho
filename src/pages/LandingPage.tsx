import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import Snap from "lenis/snap";
import Hero from "../components/home/Hero";
import About from "../components/home/About";
import Projects from "../components/home/Projects";
import Skills from "../components/home/Skills";
import Education from "../components/home/Education";
import Preloader from "../components/common/Preloader";
import { AnimatePresence } from "framer-motion";

export default function LandingPage() {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const setRef = (index: number) => (el: HTMLDivElement | null) => {
    sectionRefs.current[index] = el;
  };

  useEffect(() => {
    const getSections = () =>
      sectionRefs.current.filter(
        (el): el is HTMLDivElement => el !== null,
      );

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    const snap = new Snap(lenis, {
      type: "proximity",
      distanceThreshold: "30%", // magnet: tarik ke section yang melewati setengah layar
      duration: 0.6,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
      debounce: 50,
    });

    let unsubscribeSections = () => {};

    const syncSections = () => {
      unsubscribeSections();
      const sections = getSections();
      unsubscribeSections = snap.addElements(sections, { align: "start" });
    };

    syncSections();

    // Expose sync/unsync supaya scrollToSection bisa disable snap sementara
    (window as unknown as { __unsyncSnap?: () => void; __resyncSnap?: () => void }).__unsyncSnap = () => {
      unsubscribeSections();
    };
    (window as unknown as { __unsyncSnap?: () => void; __resyncSnap?: () => void }).__resyncSnap = () => {
      syncSections();
    };

    const handleResize = () => {
      snap.resize();
      syncSections();
    };

    window.addEventListener("resize", handleResize);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      window.removeEventListener("resize", handleResize);
      snap.destroy();
      lenis.destroy();
    };
  }, []);

  return (
    <>

    <AnimatePresence mode="wait">
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>
 
    <main className="relative w-full bg-[var(--putih)]">
      <div
        ref={setRef(0)}
        id="Home"
        className="sticky top-0 z-0 h-screen w-full"
      >
        <Hero />
      </div>

      <div
        ref={setRef(1)}
        id="About"
        className="sticky top-0 z-10 min-h-screen w-full bg-[var(--hitam)]"
      >
        <About />
      </div>

      <div
        ref={setRef(2)}
        id="Projects"
        className="relative z-20 min-h-screen w-full bg-[var(--putih)]"
      >
        <Projects />
      </div>

      <div
        ref={setRef(3)}
        id="Skills"
        className="relative z-30 min-h-screen w-full bg-[var(--putih)]"
      >
        <Skills />
      </div>

      <div
        ref={setRef(4)}
        id="Education"
        className="relative z-40 min-h-screen w-full bg-[var(--putih)]"
      >
        <Education />
      </div>
    </main>
       
    </>
  );
}
