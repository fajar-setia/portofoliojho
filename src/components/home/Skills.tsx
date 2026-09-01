import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type {Variants} from "framer-motion"

interface SkillItem {
    name: string;
    image: string;
}

const skillsData: SkillItem[] = [
    {
        name: "UI Design",
        image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=1000&auto=format&fit=crop",
    },
    {
        name: "UX Research",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop",
    },
    {
        name: "Wireframing",
        image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1000&auto=format&fit=crop",
    },
    {
        name: "Prototyping",
        image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=1000&auto=format&fit=crop",
    },
    {
        name: "Usability",
        image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1000&auto=format&fit=crop",
    },
    {
        name: "Figma",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop",
    },
];

export default function Skills() {
    // State untuk menyimpan index skill yang sedang di-hover (default: 0 / UI Design)
    const [hoveredIndex, setHoveredIndex] = useState<number>(0);

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
                ease: "easeOut"
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
                        {skillsData.map((skill, index) => {
                            const isHovered = hoveredIndex === index;

                            return (
                                <motion.li
                                    key={index}
                                    variants={itemVariants}
                                    whileHover={{ x: 10 }}
                                    transition={{ duration: 0.2 }}
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    className={`cursor-pointer text-2xl font-normal tracking-tight transition-colors duration-200 sm:text-3xl md:text-4xl ${
                                        isHovered
                                            ? "text-[var(--hitam)] font-medium font-semibold"
                                            : "text-neutral-400 hover:text-black"
                                    }`}
                                >
                                    {skill.name}
                                </motion.li>
                            );
                        })}
                    </motion.ul>
                </div>

                {/* Kolom Kanan: Gambar Showcase yang Berganti Saat Hover */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="flex w-full justify-center md:w-1/2"
                >
                    <div className="relative h-[320px] w-full max-w-md overflow-hidden rounded-2xl shadow-md sm:h-[400px] md:h-[480px]">
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={hoveredIndex}
                                src={skillsData[hoveredIndex].image}
                                alt={skillsData[hoveredIndex].name}
                                initial={{ opacity: 0, scale: 1.05 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                className="h-full w-full object-cover"
                            />
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}