"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!sectionRef.current) return;
    const { left, top, width, height } =
      sectionRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width - 0.5) * 2;
    const y = ((e.clientY - top) / height - 0.5) * 2;
    setMouse({ x, y });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    <section
      ref={sectionRef}
      aria-label="Uvod"
      className="relative min-h-screen flex flex-col overflow-hidden"
    >
      {/* Accessible heading */}
      <h1 className="sr-only">Filip Jagodič — Glasba presega vse meje</h1>

      {/* Background gradient with red glows */}
      <div
        className="absolute inset-[-40px]"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, #1E1A1A 0%, #141618 50%, #0F1012 100%)",
          transform: `translate(${mouse.x * 5}px, ${mouse.y * 5}px)`,
          transition: "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      />

      {/* Red ambient glows */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 800px 600px at 20% 30%, rgba(212, 64, 64, 0.15), transparent 50%), radial-gradient(ellipse 600px 500px at 80% 70%, rgba(212, 64, 64, 0.12), transparent 50%)",
        }}
        aria-hidden="true"
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, #0F1012 100%)",
        }}
        aria-hidden="true"
      />

      {/* Main hero area — title + image side by side */}
      <div className="relative flex-1 flex items-center justify-center px-6">
        <div className="relative flex items-center justify-center w-full max-w-7xl mx-auto">
          {/* FILIP — slides in from left */}
          <motion.div
            className="hidden lg:flex items-center justify-end flex-1 pr-4 xl:pr-8"
            initial={{ opacity: 0, x: -200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 1.2,
              delay: 0.5,
              ease: [0.25, 0.4, 0.25, 1],
            }}
            style={{
              transform: `translate(${mouse.x * 12}px, ${mouse.y * 8}px)`,
              transition:
                "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
          >
            <h2
              className="font-heading text-[6rem] xl:text-[8rem] 2xl:text-[10rem] font-bold leading-none tracking-tight"
              style={{
                background:
                  "linear-gradient(135deg, #D44040 0%, #FF6B6B 25%, #D44040 50%, #AA3333 75%, #D44040 100%)",
                backgroundSize: "200% 200%",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter:
                  "drop-shadow(0 0 40px rgba(212, 64, 64, 0.4)) drop-shadow(0 0 80px rgba(212, 64, 64, 0.2)) drop-shadow(0 4px 20px rgba(0, 0, 0, 0.5))",
              }}
            >
              FILIP
            </h2>
          </motion.div>

          {/* Center: Glow + Rays + Filip's image */}
          <div
            className="relative flex-shrink-0"
            style={{
              zIndex: 2,
              transform: `translate(${mouse.x * 25}px, ${mouse.y * 15}px)`,
              transition:
                "transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
          >
            {/* Subtle red glow behind Filip */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(212, 64, 64, 0.15) 0%, rgba(212, 64, 64, 0.05) 40%, transparent 70%)",
              }}
              aria-hidden="true"
            />

            {/* Subtle light rays behind Filip */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] pointer-events-none"
              style={{
                background:
                  "conic-gradient(from 0deg, transparent 0deg, rgba(212, 64, 64, 0.04) 10deg, transparent 20deg, transparent 40deg, rgba(212, 64, 64, 0.03) 50deg, transparent 60deg, transparent 90deg, rgba(212, 64, 64, 0.04) 100deg, transparent 110deg, transparent 140deg, rgba(212, 64, 64, 0.03) 150deg, transparent 160deg, transparent 180deg, rgba(212, 64, 64, 0.04) 190deg, transparent 200deg, transparent 230deg, rgba(212, 64, 64, 0.03) 240deg, transparent 250deg, transparent 280deg, rgba(212, 64, 64, 0.04) 290deg, transparent 300deg, transparent 330deg, rgba(212, 64, 64, 0.03) 340deg, transparent 350deg, transparent 360deg)",
                opacity: 0.8,
              }}
              aria-hidden="true"
            />

            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 1.2,
                delay: 0.3,
                ease: [0.25, 0.4, 0.25, 1],
              }}
            >
              <Image
                src="https://res.cloudinary.com/dewf3zos0/image/upload/v1770930641/filip_xjenim.png"
                alt="Filip Jagodič"
                width={700}
                height={900}
                priority
                className="max-h-[70vh] w-auto object-contain"
                style={{
                  filter:
                    "drop-shadow(0 0 1px rgba(20,22,24,1)) drop-shadow(0 0 2px rgba(20,22,24,1)) drop-shadow(0 0 4px rgba(20,22,24,0.8)) drop-shadow(0 20px 60px rgba(0,0,0,0.5))",
                }}
              />
            </motion.div>
          </div>

          {/* JAGODIČ — slides in from right */}
          <motion.div
            className="hidden lg:flex items-center justify-start flex-1 pl-4 xl:pl-8"
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 1.2,
              delay: 0.5,
              ease: [0.25, 0.4, 0.25, 1],
            }}
            style={{
              transform: `translate(${mouse.x * 12}px, ${mouse.y * 8}px)`,
              transition:
                "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
          >
            <h2
              className="font-heading text-[5rem] xl:text-[6.5rem] 2xl:text-[8rem] font-bold leading-none tracking-tight"
              style={{
                background:
                  "linear-gradient(135deg, #D44040 0%, #FF6B6B 25%, #D44040 50%, #AA3333 75%, #D44040 100%)",
                backgroundSize: "200% 200%",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter:
                  "drop-shadow(0 0 40px rgba(212, 64, 64, 0.4)) drop-shadow(0 0 80px rgba(212, 64, 64, 0.2)) drop-shadow(0 4px 20px rgba(0, 0, 0, 0.5))",
              }}
            >
              JAGODIČ
            </h2>
          </motion.div>
        </div>

        {/* Mobile title — stacked above image area */}
        <motion.div
          className="lg:hidden absolute top-20 left-0 right-0 text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 0.5,
            ease: [0.25, 0.4, 0.25, 1],
          }}
          style={{ zIndex: 3 }}
        >
          <h2
            className="font-heading text-[3.5rem] sm:text-[5rem] md:text-[6rem] font-bold leading-none tracking-tight block"
            style={{
              background:
                "linear-gradient(135deg, #D44040 0%, #FF6B6B 25%, #D44040 50%, #AA3333 75%, #D44040 100%)",
              backgroundSize: "200% 200%",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter:
                "drop-shadow(0 0 30px rgba(212, 64, 64, 0.4)) drop-shadow(0 0 60px rgba(212, 64, 64, 0.2)) drop-shadow(0 4px 15px rgba(0, 0, 0, 0.5))",
            }}
          >
            FILIP
          </h2>
          <h2
            className="font-heading text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem] font-bold leading-none tracking-tight block"
            style={{
              background:
                "linear-gradient(135deg, #D44040 0%, #FF6B6B 25%, #D44040 50%, #AA3333 75%, #D44040 100%)",
              backgroundSize: "200% 200%",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter:
                "drop-shadow(0 0 30px rgba(212, 64, 64, 0.4)) drop-shadow(0 0 60px rgba(212, 64, 64, 0.2)) drop-shadow(0 4px 15px rgba(0, 0, 0, 0.5))",
            }}
          >
            JAGODIČ
          </h2>
        </motion.div>
      </div>

      {/* Bottom content — below image, always visible */}
      <div className="relative pb-20 md:pb-24 text-center px-6" style={{ zIndex: 3 }}>
        <motion.p
          className="text-accent/80 text-sm md:text-base font-medium tracking-[0.3em] uppercase mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          Glasbenik · Izvajalec · Zbiratelj
        </motion.p>

        <motion.p
          className="text-xl md:text-2xl lg:text-3xl text-white/60 font-light mb-8 max-w-2xl mx-auto overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {"Glasba presega vse meje".split(" ").map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mr-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 1 + i * 0.1,
                ease: [0.25, 0.4, 0.25, 1],
              }}
            >
              {word}
            </motion.span>
          ))}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <a
            href="#glasba"
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-accent text-white font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-base"
          >
            <span className="relative z-10 flex items-center gap-3">
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
              Poslušaj glasbo
            </span>
            <span
              className="absolute inset-0 bg-gradient-to-r from-accent-light to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              aria-hidden="true"
            />
          </a>
          <a
            href="#o-filipu"
            className="group relative inline-flex items-center justify-center px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-base"
          >
            <span className="relative z-10">Spoznaj Filipa</span>
            <span
              className="absolute inset-0 border-2 border-accent scale-0 group-hover:scale-100 transition-transform duration-500 ease-out rounded-full"
              aria-hidden="true"
            />
            <span
              className="absolute inset-0 bg-accent/10 scale-0 group-hover:scale-100 transition-transform duration-500 ease-out rounded-full"
              aria-hidden="true"
            />
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        aria-hidden="true"
        style={{ zIndex: 4 }}
      >
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center">
          <motion.div
            className="w-1.5 h-1.5 bg-accent rounded-full mt-2"
            animate={{ y: [0, 16, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}
