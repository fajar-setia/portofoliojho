import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section id="Home" className="relative flex min-h-screen items-center justify-center px-6">
            <div className="w-full max-w-6xl text-center">
                {/* Hi */}
                <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-3 text-left md:ml-22 text-base font-bold text-black sm:text-xl"
                >
                    Hi
                </motion.p>

                {/* Main Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.7,
                        delay: 0.1,
                    }}
                    className="flex flex-wrap items-center justify-center gap-x-3 text-5xl font-medium tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
                >
                    <span>I'm</span>

                    <span>(</span>

                    {/* Profile Image */}
                    <div className="h-16 w-16 overflow-hidden rounded-md sm:h-20 sm:w-20 md:h-24 md:w-24">
                        <img
                            src="https://media1.tenor.com/m/tfP3Qtu5VvIAAAAd/meme-kucing.gif"
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
                    className="mt-4 text-base sm:text-lg md:text-xl"
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