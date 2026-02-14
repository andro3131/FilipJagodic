"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

const VIDEO_URL =
  "https://res.cloudinary.com/dewf3zos0/video/upload/v1770984847/Filip14_ottezv.mp4";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoDurationRef = useRef(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [videoReady, setVideoReady] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

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

  // Wait until video is seekable before starting
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const initVideo = () => {
      if (videoReady) return;
      video.pause();
      videoDurationRef.current = video.duration;
      video.currentTime = 0.01;
      setIntroComplete(false);
      setVideoReady(true);
    };

    if (video.readyState >= 2) {
      initVideo();
      return;
    }

    video.addEventListener("loadeddata", initVideo);
    video.addEventListener("canplay", initVideo);
    return () => {
      video.removeEventListener("loadeddata", initVideo);
      video.removeEventListener("canplay", initVideo);
    };
  }, [videoReady]);

  // Intro: native playback with variable playbackRate for easeOut
  useEffect(() => {
    if (!videoReady) return;
    const video = videoRef.current;
    if (!video) return;

    const midpoint = videoDurationRef.current / 2;

    const timeout = setTimeout(() => {
      video.currentTime = 0.01;
      video.playbackRate = 1.5;
      video.play();

      let rafId: number;
      const checkProgress = () => {
        if (video.currentTime >= midpoint - 0.05) {
          video.pause();
          video.currentTime = midpoint;
          setIntroComplete(true);
          return;
        }
        // EaseOut: slow down as we approach midpoint
        const progress = video.currentTime / midpoint;
        video.playbackRate = Math.max(0.15, 1.5 * Math.pow(1 - progress, 2));
        rafId = requestAnimationFrame(checkProgress);
      };
      rafId = requestAnimationFrame(checkProgress);

      // Cleanup for rAF
      const cleanup = () => cancelAnimationFrame(rafId);
      video.addEventListener("pause", cleanup, { once: true });
    }, 600);

    return () => clearTimeout(timeout);
  }, [videoReady]);

  // Scroll: scrub second half (desktop only, throttled + fastSeek)
  useEffect(() => {
    if (!introComplete || isMobile) return;
    const video = videoRef.current;
    if (!video) return;

    const dur = videoDurationRef.current;
    const midpoint = dur / 2;
    const scrollHalf = dur - midpoint;
    let lastUpdate = 0;

    const handleScroll = () => {
      const now = performance.now();
      if (now - lastUpdate < 50) return; // Throttle to ~20fps
      lastUpdate = now;

      const scrollY = window.scrollY;
      const scrollRange = window.innerHeight * 0.6;
      const progress = Math.min(Math.max(scrollY / scrollRange, 0), 1);
      const targetTime = midpoint + progress * scrollHalf;

      if (video.fastSeek) {
        video.fastSeek(targetTime);
      } else {
        video.currentTime = targetTime;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [introComplete, isMobile]);

  return (
    <section
      ref={sectionRef}
      aria-label="Uvod"
      className="relative min-h-screen flex flex-col overflow-x-clip"
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

      {/* Main hero area */}
      <div className="relative flex-1 flex items-center justify-center px-6 lg:px-12">
        <div
          className="relative flex flex-col lg:flex-row items-center lg:justify-between w-full max-w-7xl mx-auto gap-2"
          style={{ marginTop: "4vh" }}
        >
          {/* Filip's video with glow */}
          <div
            className="relative flex-shrink-0 mx-auto lg:mx-0 lg:-ml-32"
            style={{ zIndex: 2, marginTop: isMobile ? "6vh" : "-8vh" }}
          >
            {/* Red glow behind video */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[160%] rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(212, 64, 64, 0.35) 0%, rgba(212, 64, 64, 0.15) 40%, rgba(212, 64, 64, 0.05) 60%, transparent 80%)",
                filter: "blur(40px)",
              }}
              aria-hidden="true"
            />

            <motion.div
              initial={{ opacity: 0, x: isMobile ? 0 : -80, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{
                duration: 1.2,
                delay: 0.3,
                ease: [0.25, 0.4, 0.25, 1],
              }}
            >
              <div className="relative w-[80vw] max-w-[400px] h-[60vh] max-h-[500px] lg:w-[55vw] lg:max-w-[760px] lg:h-[85vh] lg:max-h-[920px]">
                <video
                  ref={videoRef}
                  muted
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover object-top"
                  style={{
                    maskImage:
                      "radial-gradient(ellipse 68% 82% at 50% 56%, black 35%, transparent 65%)",
                    WebkitMaskImage:
                      "radial-gradient(ellipse 68% 82% at 50% 56%, black 35%, transparent 65%)",
                    filter: "brightness(0.95) contrast(1.05)",
                  }}
                  aria-label="Filip Jagodič"
                >
                  <source src={VIDEO_URL} type="video/mp4" />
                </video>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Title + slogan + buttons (desktop) */}
          <motion.div
            className="hidden lg:flex flex-col items-start justify-center flex-1 -ml-4"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 1.2,
              delay: 0.5,
              ease: [0.25, 0.4, 0.25, 1],
            }}
            style={{
              transform: `translate(${mouse.x * 8}px, ${mouse.y * 6}px)`,
              transition:
                "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
          >
            <h2
              className="font-heading text-[7rem] xl:text-[9rem] 2xl:text-[11rem] font-black leading-[0.85] tracking-[-0.03em] mb-6"
              style={{
                background:
                  "linear-gradient(110deg, #D44040 0%, #C43838 30%, #D44040 44%, #FFE8E8 50%, #D44040 56%, #C43838 70%, #D44040 100%)",
                backgroundSize: "300% 100%",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation:
                  "shimmer-flash 3s ease-out forwards, shimmer-red 8s ease-in-out 3s infinite, float-text 7s ease-in-out 2s infinite",
                filter: "drop-shadow(0 0 80px rgba(212, 64, 64, 0.25))",
              }}
            >
              FILIP
            </h2>
            <h2
              className="font-heading text-[7rem] xl:text-[9rem] 2xl:text-[11rem] font-black leading-[0.85] tracking-[-0.03em] pb-[0.2em]"
              style={{
                background:
                  "linear-gradient(110deg, #D44040 0%, #C43838 30%, #D44040 44%, #FFE8E8 50%, #D44040 56%, #C43838 70%, #D44040 100%)",
                backgroundSize: "300% 100%",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation:
                  "shimmer-flash 3s ease-out 1s forwards, shimmer-red 8s ease-in-out 4s infinite, float-text 8s ease-in-out 2.5s infinite",
                paddingLeft: "4rem",
                filter: "drop-shadow(0 0 80px rgba(212, 64, 64, 0.25))",
              }}
            >
              JAGODIČ
            </h2>

            {/* Slogan + buttons under title, offset like JAGODIČ */}
            <div className="mt-8 pl-[8rem]">
              <motion.p
                className="text-accent/80 text-sm md:text-base font-medium tracking-[0.3em] uppercase mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                Glasbenik · Izvajalec · Zbiratelj
              </motion.p>

              <motion.p
                className="text-xl md:text-2xl text-white/60 font-light mb-6"
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
                className="flex gap-4"
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
          </motion.div>
        </div>

        {/* Mobile: title + slogan + buttons below video */}
        <motion.div
          className="lg:hidden absolute bottom-16 left-0 right-0 text-center px-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 0.5,
            ease: [0.25, 0.4, 0.25, 1],
          }}
          style={{ zIndex: 3 }}
        >
          <h2
            className="font-heading text-[3.5rem] sm:text-[5rem] md:text-[6rem] font-black leading-none tracking-[-0.03em]"
            style={{
              background:
                "linear-gradient(135deg, #D44040 0%, #C43838 30%, #D44040 44%, #FFE8E8 50%, #D44040 56%, #C43838 70%, #D44040 100%)",
              backgroundSize: "300% 300%",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation:
                "shimmer-flash 3s ease-out forwards, shimmer-red 8s ease-in-out 3s infinite",
              filter:
                "drop-shadow(0 0 30px rgba(212, 64, 64, 0.4)) drop-shadow(0 0 60px rgba(212, 64, 64, 0.2))",
            }}
          >
            FILIP
          </h2>
          <h2
            className="font-heading text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem] font-black leading-none tracking-[-0.03em] pb-[0.2em] mb-4"
            style={{
              background:
                "linear-gradient(135deg, #D44040 0%, #C43838 30%, #D44040 44%, #FFE8E8 50%, #D44040 56%, #C43838 70%, #D44040 100%)",
              backgroundSize: "300% 300%",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation:
                "shimmer-flash 3s ease-out 1s forwards, shimmer-red 8s ease-in-out 4s infinite",
              filter:
                "drop-shadow(0 0 30px rgba(212, 64, 64, 0.4)) drop-shadow(0 0 60px rgba(212, 64, 64, 0.2))",
            }}
          >
            JAGODIČ
          </h2>

          <p className="text-white/60 text-lg font-light mb-5">
            Glasba presega vse meje
          </p>

          <div className="flex gap-3 justify-center">
            <a
              href="#glasba"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-white font-semibold rounded-full text-sm"
            >
              <svg
                className="w-4 h-4"
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
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-white/20 text-white font-semibold rounded-full text-sm"
            >
              Spoznaj Filipa
            </a>
          </div>
        </motion.div>
      </div>

      {/* Bottom blur overlay to hide wheelchair/floor */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[200px] pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, #0F1012 0%, #0F1012 20%, transparent 100%)",
          zIndex: 3,
        }}
        aria-hidden="true"
      />

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
