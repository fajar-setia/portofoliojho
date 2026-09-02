import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Logo from "../../assets/image/logo atas.png";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const markerRef = useRef<HTMLDivElement>(null);
  const svgPathRef = useRef<SVGPathElement>(null);

  const [counterValue, setCounterValue] = useState<number>(0);

  useEffect(() => {
    // Lock scroll saat preloader berjalan
    document.body.style.overflow = "hidden";

    const width = window.innerWidth;
    const height = window.innerHeight;

    // Path SVG Awal (Datar menutupi seluruh layar)
    const initialPath = `M0 0 L${width} 0 L${width} ${height} Q${width / 2} ${height} 0 ${height} Z`;
    // Path SVG Lengkung (Mulai melengkung ke atas seperti gelombang)
    const curvePath = `M0 0 L${width} 0 L${width} 0 Q${width / 2} -300 0 0 Z`;

    if (svgPathRef.current) {
      svgPathRef.current.setAttribute("d", initialPath);
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "auto";
          onComplete();
        },
      });

      // Split text nama
      if (nameRef.current) {
        const text = nameRef.current.innerText;
        nameRef.current.innerHTML = text
          .split("")
          .map((char) =>
            char === " "
              ? `<span class="inline-block">&nbsp;</span>`
              : `<span class="char inline-block translate-y-8 opacity-0 blur-sm">${char}</span>`
          )
          .join("");
      }

      const tiles = gsap.utils.toArray<HTMLElement>(".grid-tile");
      const chars = nameRef.current?.querySelectorAll(".char");

      tl
        // 1. Grid Tiles & Logo Reveal
        .to(tiles, {
          opacity: 1,
          duration: 0.6,
          stagger: { grid: "auto", from: "center", amount: 0.4 },
          ease: "power2.out",
        })
        .to(
          logoRef.current,
          {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.8,
            ease: "expo.out",
          },
          "-=0.3"
        )
        // 2. Teks "Jhoifha Winola" Reveal
        .to(
          chars || [],
          {
            opacity: 1,
            y: "0%",
            filter: "blur(0px)",
            duration: 0.7,
            stagger: 0.03,
            ease: "power3.out",
          },
          "-=0.4"
        )
        // 3. Progress Counter
        .to(
          markerRef.current,
          { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.2)" },
          "-=0.2"
        )
        .to(
          { val: 0 },
          {
            val: 100,
            duration: 1.5,
            ease: "power1.inOut",
            onUpdate: function () {
              setCounterValue(Math.round(this.targets()[0].val));
            },
          },
          "<"
        )
        .to({}, { duration: 0.2 })

        // 4. Fade Out Elemen Branding
        .to([logoRef.current, nameRef.current, markerRef.current, tiles], {
          opacity: 0,
          y: -20,
          filter: "blur(4px)",
          duration: 0.4,
          ease: "power2.in",
        })

        // 5. TRANSIKSI PENUTUP (Curved Wave Lift Up Effect)
        .to(svgPathRef.current, {
          attr: { d: curvePath },
          duration: 0.85,
          ease: "power4.inOut",
        })
        // Slide up seluruh container utama
        .to(
          containerRef.current,
          {
            y: "-100%",
            duration: 0.85,
            ease: "power4.inOut",
          },
          "<"
        );
    }, containerRef);

    return () => {
      ctx.revert();
      document.body.style.overflow = "auto";
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center text-[#F4F4F4]"
    >
      {/* Background SVG Canvas (Membuat Tirai Melengkung) */}
      <svg className="pointer-events-none absolute inset-0 h-[calc(100%+300px)] w-full fill-[#181A17]">
        <path ref={svgPathRef} />
      </svg>

      {/* Grid Canvas Background */}
      <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 md:grid-cols-12 md:grid-rows-8">
        {Array.from({ length: 96 }).map((_, i) => (
          <div
            key={i}
            className="grid-tile border border-white/[0.03] bg-transparent opacity-0"
          />
        ))}
      </div>

      {/* Center Branding */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-4 text-center px-4">
        <div
          ref={logoRef}
          className="flex h-22 w-22 items-center justify-center rounded-2xl bg-white p-3 opacity-0 scale-75 blur-sm shadow-2xl overflow-hidden"
        >
          <img
            src={Logo}
            alt="Logo"
            className="h-full w-full object-contain"
          />
        </div>

        <div className="overflow-hidden py-1">
          <h1
            ref={nameRef}
            className="text-3xl font-medium tracking-tight sm:text-5xl md:text-6xl text-white"
          >
            Jhoifha Winola
          </h1>
        </div>

        <div
          ref={markerRef}
          className="mt-3 flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 opacity-0 scale-90 backdrop-blur-md"
        >
          <span className="h-3 w-3 rounded-full bg-[#0204E8] animate-pulse items-center mb-1" />
          <span className="font-mono text-xs font-semibold tracking-wider text-[var(--putih)] sm:text-sm">
            {counterValue}%
          </span>
        </div>
      </div>
    </div>
  );
}