import { motion } from "framer-motion";
import { Mail, Download } from "lucide-react";

export default function About() {
    return (
        <section 
            id="About"
            className="flex min-h-screen items-center justify-center px-6 py-16"
            style={{ backgroundColor: "var(--hitam)", color: "var(--putih)" }}
        >
            <div className="flex max-w-5xl flex-col items-center gap-8 md:flex-row md:gap-12">
                {/* Foto Profil */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="h-80 w-64 flex-shrink-0 overflow-hidden rounded-xl md:h-[360px] md:w-[280px]"
                >
                    <img
                        src="https://imgs.search.brave.com/D_v-OIfhQm05q1CSaPKEwFURHrI11kEYgfMGRObQRpQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGlj/a2VybHkucHN0YXRp/Yy5uZXQvc3RpY2tl/cl9wYWNrL091bTlr/UFM4S0dlbHR0R3ZO/TkI4US81VjZQRUUv/MTYvLTc1MTUxMDMz/Ni53ZWJw" // Ganti dengan path foto kamu
                        alt="Jhoifha"
                        className="h-full w-full object-cover"
                    />
                </motion.div>

                {/* Konten Teks */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="flex flex-col gap-6"
                >
                    {/* Header Utama */}
                    <h2 className="text-2xl font-normal leading-tight sm:text-3xl md:text-4xl">
                        I'm Jhoifha — a UI/UX Designer bridging design and technology to create intuitive, functional, and purposeful digital experiences.
                    </h2>

                    {/* Deskripsi */}
                    <p className="text-sm font-light leading-relaxed text-neutral-400 sm:text-base md:text-lg">
                        With a technical background, I design websites and digital products with a focus on user flows, usability, responsive interfaces, and interactions that make products easier to understand and use.
                    </p>

                    {/* Tombol Aksi */}
                    <div className="mt-2 flex flex-wrap items-center gap-4">
                        <a
                            href="mailto:emailkamu@example.com"
                            className="flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium transition-transform hover:scale-105 active:scale-95"
                            style={{ backgroundColor: "var(--biru)", color: "var(--putih)" }}
                        >
                            <Mail className="h-4 w-4" />
                            Mail Me
                        </a>

                        <a
                            href="/path-to-resume.pdf"
                            download
                            className="flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium transition-transform hover:scale-105 active:scale-95"
                            style={{ backgroundColor: "var(--putih)", color: "var(--hitam)" }}
                        >
                            <Download className="h-4 w-4" />
                            Resume
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}