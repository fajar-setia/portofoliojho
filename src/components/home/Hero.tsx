import { motion } from "framer-motion";
import { useRef } from "react";
import heroImage from "../../assets/image/hero.png";
import { useCursorTrail } from "../../hooks/useCursorTrail";

export default function Hero() {
    const containerRef = useRef<HTMLElement>(null);
    
    // Initialize cursor trail effect
    useCursorTrail({
        containerRef: containerRef as React.RefObject<HTMLElement | null>,
    });

    return (
        <section ref={containerRef} id="Home" className="relative flex min-h-screen items-center justify-center px-6">
            <div className="w-full text-center">
                {/* Main Heading & Hi Wrapper */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.7,
                        delay: 0.1,
                    }}
                    className="flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-8 md:gap-x-12 text-5xl font-medium tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
                >
                    {/* Grup "Hi" dan "I'm" agar "Hi" selalu berada presisi di atas "I'm" */}
                    <div className="relative flex flex-col items-start">
                        <motion.span
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="absolute -top-7 left-0 text-base font-light tracking-[0.05em] text-black sm:-top-9 sm:text-xl md:-top-11 md:text-2xl"
                        >
                            Hi
                        </motion.span>
                        <span>I'm</span>
                    </div>

                    <span>(</span>

                    {/* Profile Image */}
                    <div className="h-16 w-16 overflow-hidden rounded-md sm:h-20 sm:w-20 md:h-[120px] md:w-[152px]">
                        <img
                            src={heroImage}
                            alt="Profile"
                            className="h-full w-full object-cover"
                        />
                    </div>

                    <span>)</span>

                    <span>UI UX Designer</span>
                </motion.div>

                {/* Name */}
                <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.6,
                        delay: 0.3,
                    }}
                    className="mt-6 text-base sm:text-lg md:text-xl"
                >
                    And My Name is{" "}
                    <span className="bg-black px-1 text-white">
                        Jhoifha Winola
                    </span>
                </motion.p>
            </div>

            {/* Scroll Container (Diisolasi dengan posisi absolut) */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                    duration: 0.8,
                    delay: 0.8,
                }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2"
            >
                <motion.p
                    animate={{
                        y: [0, 8, 0],
                    }}
                    transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="text-sm text-neutral-500"
                >
                    [ Scroll Down ]
                </motion.p>
            </motion.div>
        </section>
    );
}