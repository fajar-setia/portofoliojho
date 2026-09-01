import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { scrollToSection } from "./scrollToSection";

interface NavLink {
    name: string;
    targetId: string;
}

const navLinks: NavLink[] = [
    { name: "Home", targetId: "Home" },
    { name: "About", targetId: "About" },
    { name: "Projects", targetId: "Projects" },
    { name: "Skills", targetId: "Skills" },
    { name: "Education & Training", targetId: "Education" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleScroll = (id: string) => {
        setIsOpen(false);
        scrollToSection(id);
    };

    return (
        <header className="fixed left-1/2 top-6 z-50 flex -translate-x-1/2 flex-col items-center gap-2">
            {/* Pill 1: Header Atas (Logo & Hamburger Button) */}
            <div className="flex w-[320px] items-center justify-between rounded-2xl bg-[#181A17] px-5 py-3 text-[#F4F4F4] shadow-xl sm:w-[360px]">
                {/* Logo Nama dengan Highlight Biru di Belakang Teks 'ifha' */}
                <button
                    onClick={() => handleScroll("Home")}
                    className="text-lg font-bold tracking-tight text-[#F4F4F4] transition-opacity hover:opacity-80"
                >
                    Jho<span className="bg-[var(--biru)] px-0.5 text-white">ifha</span>
                </button>

                {/* Hamburger Button */}
                <button
                    onClick={() => setIsOpen((prev) => !prev)}
                    aria-label={isOpen ? "Close menu" : "Open menu"}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F4F4F4] text-[#181A17] transition-transform duration-200 hover:scale-105 active:scale-95"
                >
                    <AnimatePresence mode="wait" initial={false}>
                        {isOpen ? (
                            <motion.div
                                key="close"
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <X size={20} strokeWidth={2.5} />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="menu"
                                initial={{ rotate: 90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: -90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Menu size={20} strokeWidth={2.5} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </button>
            </div>

            {/* Pill 2: Menu Dropdown Terpisah (Muncul di Bawah Pill Header) */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="w-[320px] overflow-hidden rounded-2xl bg-[#181A17] p-4 text-[#F4F4F4] shadow-2xl sm:w-[360px]"
                    >
                        <div className="flex flex-col gap-2">
                            {navLinks.map((link, index) => (
                                <motion.button
                                    key={link.targetId}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.04, duration: 0.2 }}
                                    onClick={() => handleScroll(link.targetId)}
                                    className="w-full text-left rounded-xl px-4 py-2.5 text-base font-semibold text-white/90 transition-colors hover:bg-white/10 hover:text-white"
                                >
                                    {link.name}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}