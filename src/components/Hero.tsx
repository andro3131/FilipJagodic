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
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Accessible heading */}
      <h1 className="sr-only">Filip Jagodič — Glasba presega vse meje</h1>

      {/* Background gradient — slowest parallax */}
      <div
        className="absolute inset-[-40px]"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, #1E1A1A 0%, #141618 50%, #0F1012 100%)",
          transform: `translate(${mouse.x * 5}px, ${mouse.y * 5}px)`,
          transition: "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      />

      {/* Subtle red ambient glow behind Filip */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, #D44040 0%, transparent 70%)",
          opacity: 0.06,
          transform: `translate(${mouse.x * 8}px, ${mouse.y * 6}px)`,
          transition: "transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
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

      {/* Large decorative text BEHIND Filip — medium parallax */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
        style={{
          zIndex: 1,
          transform: `translate(${mouse.x * 12}px, ${mouse.y * 8}px)`,
          transition: "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      >
        <div className="text-center">
          <span
            className="font-heading block text-[5rem] sm:text-[7rem] md:text-[11rem] lg:text-[14rem] xl:text-[17rem] font-bold leading-[0.85] tracking-tight"
            style={{ color: "rgba(212, 64, 64, 0.06)" }}
          >
            FILIP
          </span>
          <span
            className="font-heading block text-[3.5rem] sm:text-[5rem] md:text-[8rem] lg:text-[10rem] xl:text-[12rem] font-bold leading-[0.85] tracking-tight"
            style={{ color: "rgba(212, 64, 64, 0.06)" }}
          >
            JAGODIČ
          </span>
        </div>
      </div>

      {/* Filip's image — foreground, strongest parallax */}
      <div
        className="relative"
        style={{
          zIndex: 2,
          transform: `translate(${mouse.x * 25}px, ${mouse.y * 15}px)`,
          transition: "transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      >
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
            className="max-h-[75vh] w-auto object-contain"
            style={{
              filter: "drop-shadow(0 20px 60px rgba(0,0,0,0.5))",
            }}
          />
        </motion.div>
      </div>

      {/* Bottom content overlay */}
      <div
        className="absolute bottom-0 left-0 right-0 pb-16 md:pb-24 text-center px-6"
        style={{ zIndex: 3 }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, #141618 0%, rgba(20,22,24,0.8) 40%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="relative">
          <motion.p
            className="text-accent/80 text-sm md:text-base font-medium tracking-[0.3em] uppercase mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Glasbenik · Izvajalec · Zbiratelj
          </motion.p>

          <motion.p
            className="text-xl md:text-2xl lg:text-3xl text-white/60 font-light mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            Glasba presega vse meje
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <a
              href="#glasba"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-accent text-white font-semibold rounded-full hover:bg-accent-light transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-base"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
              Poslušaj glasbo
            </a>
            <a
              href="#o-filipu"
              className="inline-flex items-center justify-center px-8 py-4 border border-white/20 text-white font-semibold rounded-full hover:border-accent hover:text-accent transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-base"
            >
              Spoznaj Filipa
            </a>
          </motion.div>
        </div>
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
