import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

const skillsList: string[] = [
    "UI Design",
    "UX Research",
    "Wireframing",
    "Prototyping",
    "Usability",
    "Figma",
];

export default function Skills() {
    // Berikan tipe Variants eksplisit pada objek animasi
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { 
                duration: 0.5, 
                ease: "easeOut" // Sekarang TypeScript akan mengenali nilai ini dengan benar
            },
        },
    };

    return (
        <section
            id="Skills"
            className="relative flex h-screen w-full items-center justify-center overflow-hidden px-6 py-12"
            style={{ backgroundColor: "var(--putih)", color: "var(--hitam)" }}
        >
            <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-10 md:flex-row md:gap-16">
                {/* Kolom Kiri: Header & List Skill */}
                <div className="flex w-full flex-col justify-center md:w-1/2">
                    {/* Header dengan Garis Pembatas */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="mb-6 border-b border-neutral-300 pb-4"
                    >
                        <h2 className="text-4xl font-normal tracking-tight sm:text-5xl md:text-6xl">
                            Skills
                        </h2>
                    </motion.div>

                    {/* Daftar Skill */}
                    <motion.ul
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="flex flex-col gap-3 sm:gap-4 md:gap-5"
                    >
                        {skillsList.map((skill, index) => (
                            <motion.li
                                key={index}
                                variants={itemVariants}
                                whileHover={{ x: 10 }}
                                transition={{ duration: 0.2 }}
                                className="cursor-default text-2xl font-normal tracking-tight sm:text-3xl md:text-4xl"
                            >
                                {skill}
                            </motion.li>
                        ))}
                    </motion.ul>
                </div>

                {/* Kolom Kanan: Gambar Showcase */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="flex w-full justify-center md:w-1/2"
                >
                    <div className="relative h-[320px] w-full max-w-md overflow-hidden rounded-2xl shadow-sm sm:h-[400px] md:h-[480px]">
                        <img
                            src="https://imgs.search.brave.com/GkF8uUMRlWNm2GzBw9zvqHRaLvdOKY-6-umhSPeEEWE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YTQuZ2lwaHkuY29t/L21lZGlhL3YxLlky/bGtQVGM1TUdJM05q/RXhPSEUwTVc4ek16/RnFlVFZpTm1ScWNX/azBOalY1TVhKdk9Y/ZzBPVGhqTTJvMU5X/ZHZNWGs1T0NabGNE/MTJNVjluYVdaelgz/TmxZWEpqYUNaamRE/MW4vNVQzdVllS3Ix/UEU2eGhmTmNYLzIw/MC5naWY.gif"
                            alt="Skills & Workspace"
                            className="h-full w-full object-cover"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}