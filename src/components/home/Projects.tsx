import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

interface Project {
  id: number;
  category: string;
  title: string;
  description: string;
  image: string;
  link: string;
}

const projects: Project[] = [
  {
    id: 1,
    category: "Luxury Design | Company Profile | E-Commerce",
    title: "Vanilna",
    description:
      "Engineered a seamless corporate website and online storefront featuring a custom conversational AI. This intelligent chatbot automates product inquiries and guides users through the catalog, accelerating the purchasing journey and elevating customer support.",
    image:
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1000&auto=format&fit=crop",
    link: "#",
  },
  {
    id: 2,
    category: "UI/UX Design | Mobile App | Health",
    title: "PulseCare",
    description:
      "Designed an intuitive telemedicine application that connects patients directly with specialized doctors, featuring real-time video consultations, automated appointment booking, and encrypted digital health records.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
    link: "#",
  },
  {
    id: 3,
    category: "Web Application | SaaS | Dashboard",
    title: "MetricsHub",
    description:
      "Created a complex data analytics platform with customizable dashboards, real-time metrics tracking, and automated report generation tailored for enterprise-level marketing teams.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
    link: "#",
  },
];

const AUTO_PLAY_DURATION = 5;

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(-1);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    );
  };

  const handleBarClick = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Auto-play Timer (Perpindahan Otomatis)
  useEffect(() => {
    const timer = setTimeout(() => {
      handleNext();
    }, AUTO_PLAY_DURATION * 1000);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  const activeProject = projects[currentIndex];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 60 : -60,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 60 : -60,
      opacity: 0,
    }),
  };

  return (
    <section
      id="Projects"
      className="relative flex h-screen w-full flex-col justify-between overflow-hidden px-6 py-8 md:py-12"
      style={{ backgroundColor: "var(--putih)", color: "var(--hitam)" }}
    >
      <div className="mx-auto flex h-full w-full max-w-6xl flex-col justify-between">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="shrink-0"
        >
          <h2 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-5xl">
            Featured <br /> Projects
          </h2>
        </motion.div>

        {/* Card Container */}
        <div className="relative my-auto flex w-full flex-1 items-center justify-center overflow-hidden">
          <AnimatePresence 
            mode="wait" 
            custom={direction} 
            onExitComplete={() => setIsAnimating(false)}
          >
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="relative flex w-full items-center overflow-hidden rounded-3xl p-5 sm:p-8 md:p-10"
              style={{
                backgroundColor: "var(--hitam)",
                color: "var(--putih)",
              }}
            >
              <div className="grid w-full grid-cols-1 items-center gap-6 py-2 md:grid-cols-12 md:gap-8">
                {/* Image Left */}
                <div className="overflow-hidden rounded-2xl md:col-span-6">
                  <motion.img
                    src={activeProject.image}
                    alt={activeProject.title}
                    className="h-[200px] w-full object-cover sm:h-[220px] md:h-[250px] lg:h-[270px]"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.4 }}
                  />
                </div>

                {/* Content Right */}
                <div className="flex flex-col justify-center md:col-span-6">
                  <span className="text-xs font-light text-neutral-400 sm:text-sm">
                    {activeProject.category}
                  </span>

                  <h3 className="mt-1 text-2xl font-medium sm:text-3xl md:text-4xl">
                    {activeProject.title}
                  </h3>

                  <p className="mt-3 text-xs font-light leading-relaxed text-neutral-300 sm:text-sm">
                    {activeProject.description}
                  </p>

                  <div className="mt-6">
                    <a
                      href={activeProject.link}
                      className="group inline-flex items-center gap-2 text-xs font-medium transition-colors hover:opacity-80 sm:text-sm"
                      style={{ color: "var(--putih)" }}
                    >
                      View Case Study
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation & Progress Bar Bottom */}
        <div className="flex shrink-0 items-center justify-between gap-4 pt-4">
          {/* Progress Bars (Dilengkapi key={currentIndex} agar animasi berjalan otomatis saat slide berganti) */}
          <div key={currentIndex} className="flex flex-1 items-center gap-2.5 md:flex-none">
            {projects.map((_, index) => (
              <button
                key={index}
                disabled={isAnimating}
                onClick={() => handleBarClick(index)}
                className="h-2 flex-1 overflow-hidden rounded-full bg-[#DFDFDF] transition-colors md:h-6 md:w-[295px] md:flex-none"
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: "var(--hitam)" }}
                  initial={{ width: index < currentIndex ? "100%" : "0%" }}
                  animate={{
                    width:
                      index === currentIndex
                        ? "100%"
                        : index < currentIndex
                        ? "100%"
                        : "0%",
                  }}
                  transition={{
                    duration: index === currentIndex ? AUTO_PLAY_DURATION : 0.2,
                    ease: index === currentIndex ? "linear" : "easeInOut",
                  }}
                />
              </button>
            ))}
          </div>

          {/* Arrow Navigation */}
          <div className="flex items-center gap-2.5">
            <button
              disabled={isAnimating}
              onClick={handlePrev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--hitam)] transition-colors hover:bg-neutral-200 active:scale-95 disabled:pointer-events-none disabled:opacity-50 md:h-[64px] md:w-[64px]"
              aria-label="Previous Project"
            >
              <ArrowLeft className="h-4 w-4 md:h-6 md:w-6" />
            </button>
            <button
              disabled={isAnimating}
              onClick={handleNext}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--hitam)] transition-colors hover:bg-neutral-200 active:scale-95 disabled:pointer-events-none disabled:opacity-50 md:h-[64px] md:w-[64px]"
              aria-label="Next Project"
            >
              <ArrowRight className="h-4 w-4 md:h-6 md:w-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}