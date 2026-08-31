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
            duration: 1.8,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            wheelMultiplier: 0.8,
        });

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
            {/* Section 1: Hero */}
            <div className="sticky top-0 z-0 h-screen w-full">
                <Hero/>
            </div>

            {/* Section 2: About (Dibuat sticky agar nanti ditimpa Projects) */}
            <div className="sticky top-0 z-10 min-h-screen w-full bg-[var(--hitam)]">
                <About />
            </div>

            {/* Section 3: Projects (z-index paling tinggi) */}
            <div className="relative z-20 min-h-screen w-full bg-[var(--putih)]">
                <Projects />
            </div>

            <div className="relative z-20 min-h-screen w-full bg-[var(--putih)]">
                <Skills />
            </div>
            <div className="relative z-20 min-h-screen w-full bg-[var(--putih)]">
                <Education />
            </div>
        </main>
    );
}