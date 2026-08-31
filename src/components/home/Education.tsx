import { motion } from "framer-motion";
import type {Variants} from "framer-motion"

import LogoUad from "../../assets/image/logoUAD.png"
import LogoS from "../../assets/image/logoS.png"

interface EducationItem {
  id: number;
  title: string;
  description: string;
  logo: string;
  alt: string;
}

const educationData: EducationItem[] = [
  {
    id: 1,
    title: "Ahmad Dahlan University",
    description:
      "Currently pursuing a Bachelor's degree in Informatics, with a growing focus on UI/UX design and digital product development.",
    logo: LogoUad, // Ganti dengan path logo UAD kamu
    alt: "Universitas Ahmad Dahlan Logo",
  },
  {
    id: 2,
    title: "My Special Skill",
    description:
      "Completed an intensive UI/UX Design bootcamp with an Excellent performance rating, covering Design Thinking, UX Research, Figma, prototyping, and responsive interface design.",
    logo: LogoS, // Ganti dengan path logo My Skill kamu
    alt: "My Special Skill Logo",
  },
];

export default function Education() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="Education"
      className="relative flex h-screen w-full items-center justify-center overflow-hidden px-6 py-8 md:py-12"
      style={{ backgroundColor: "var(--putih)", color: "var(--hitam)" }}
    >
      <div className="mx-auto flex h-full max-w-5xl flex-col justify-center">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-8 border-b border-neutral-300 pb-4 shrink-0"
        >
          <h2 className="text-4xl font-normal leading-tight tracking-tight sm:text-5xl md:text-6xl">
            Education & <br /> Training
          </h2>
        </motion.div>

        {/* List Card Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col gap-6 md:gap-8"
        >
          {educationData.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              whileHover={{ x: 8, transition: { duration: 0.2 } }}
              className="flex flex-col items-start gap-4 rounded-2xl p-4 transition-all duration-300 hover:bg-neutral-200/50 sm:flex-row sm:items-center sm:gap-8 sm:p-6"
            >
              {/* Box Logo Kiri */}
              <div className="flex h-24 w-44 shrink-0 items-center justify-center rounded-2xl bg-white p-4 shadow-sm border border-neutral-200/80 sm:h-28 sm:w-52">
                <img
                  src={item.logo}
                  alt={item.alt}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              {/* Konten Teks Kanan */}
              <div className="flex flex-col justify-center">
                <h3 className="text-xl font-semibold sm:text-2xl md:text-3xl">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs font-light leading-relaxed text-neutral-600 sm:text-sm md:text-base">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}