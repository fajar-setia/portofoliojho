import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

const words = ["Hello", "Selamat Datang", "Portofolio", "Jhoifha Winola"];

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [index, setIndex] = useState(0);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  useEffect(() => {
    if (index === words.length - 1) {
      const timeout = setTimeout(() => {
        onComplete();
      }, 1000);
      return () => clearTimeout(timeout);
    }

    const timer = setTimeout(() => {
      setIndex((prev) => prev + 1);
    }, 600);

    return () => clearTimeout(timer);
  }, [index, onComplete]);

  // SVG Curve Path untuk efek tirai melengkung saat terangkat
  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height}  Z`;
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} 0 Q${dimension.width / 2} 0 0 0 Z`;

  const curveVariants: Variants = {
    initial: {
      d: initialPath,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 },
    },
  };

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#181A17] text-[#F4F4F4]"
    >
      {/* Teks Animasi Berganti dengan Kerenggangan Huruf & Blur Smooth */}
      <div className="relative z-10 flex items-center gap-4 px-6">    
        <div className="overflow-hidden py-2">
          <motion.p
            key={index}
            initial={{ y: "100%", opacity: 0, filter: "blur(8px)" }}
            animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
            exit={{ y: "-100%", opacity: 0, filter: "blur(8px)" }}
            transition={{
              duration: 0.45,
              ease: [0.33, 1, 0.68, 1],
            }}
            className="text-2xl font-semibold tracking-wide sm:text-4xl md:text-5xl"
          >
            {words[index]}
          </motion.p>
        </div>
      </div>

      {/* SVG Canvas untuk Efek Tirai Melengkung */}
      {dimension.height > 0 && (
        <svg className="pointer-events-none absolute top-0 h-[calc(100%+300px)] w-full fill-[#181A17]">
          <motion.path
            variants={curveVariants}
            initial="initial"
            exit="exit"
          />
        </svg>
      )}
    </motion.div>
  );
}