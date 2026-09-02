import { motion } from "framer-motion";
import { Mail, Download } from "lucide-react";
import aboutImage from "../../assets/image/about.png";

export default function About() {
    return (
        <section 
            id="About"
            className="flex min-h-screen items-center justify-center px-6 py-16"
            style={{ backgroundColor: "var(--hitam)", color: "var(--putih)" }}
        >
            <div className="flex max-w-6xl flex-col items-center gap-8 md:flex-row md:gap-16">
                {/* Foto Profil */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="h-[250px] w-[200px] flex-shrink-0 overflow-hidden rounded-xl md:h-[487px] md:w-[365px]"
                >
                    <img
                        src={aboutImage}
                        alt="Jhoifha"
                        className="w-full h-full object-cover"
                    />
                </motion.div>

                {/* Konten Teks */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="flex flex-col gap-2 md:gap-12"
                >
                    {/* Header Utama */}
                    <h2 className="text-xl font-normal leading-tight sm:text-3xl md:text-4xl">
                        I'm Jhoifha — a UI/UX Designer bridging design and technology to create intuitive, functional, and purposeful digital experiences.
                    </h2>

                    {/* Deskripsi */}
                    <p className="text-sm font-light leading-relaxed text-neutral-400 sm:text-base md:text-lg">
                        With a technical background, I design websites and digital products with a focus on user flows, usability, responsive interfaces, and interactions that make products easier to understand and use.
                    </p>

                    {/* Tombol Aksi */}
                    <div className="mt-2 flex flex-wrap items-center gap-4">
                        {/* // ubah link email disini */}
                        <a
                            href="https://mail.google.com/mail/?view=cm&fs=1&to=jhoifhawinola@gmail.com" // ubah link email disini
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium transition-transform hover:scale-105 active:scale-95"
                            style={{ backgroundColor: "var(--biru)", color: "var(--putih)" }}
                        >
                            <Mail className="h-4 w-4" />
                            Mail Me
                        </a>

                        {/* // ubah link resume disini */}
                        <a
                            href="https://drive.google.com/drive/folders/1qVIWn5TcbfoY8X7eVxYC7hHfGD-XnvTQ?usp=sharing" // ubah link resume disini
                            target="_blank"
                            rel="noopener noreferrer"
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