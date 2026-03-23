"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const duration = 750;
    const interval = 20;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setProgress(Math.min(100, Math.floor((currentStep / steps) * 100)));
      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(onComplete, 600); // Small pause at 100%
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        y: "-100%",
        opacity: 0,
        transition: { duration: 1, ease: [0.76, 0, 0.24, 1] }
      }}
      className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Blueprint Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Architectural SVG Animation */}
      <div className="relative w-64 h-64 mb-12">
        <svg viewBox="0 0 100 100" className="w-full h-full stroke-primary">
          {/* Outer Isometric Base */}
          <motion.path
            d="M50 10 L90 30 L90 70 L50 90 L10 70 L10 30 Z"
            fill="none"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          {/* Inner Geometries / Structural Beams */}
          <motion.path
            d="M50 10 L50 50 L90 30 M50 50 L50 90 M50 50 L10 30"
            fill="none"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
          />
          {/* Connecting Depth Lines */}
          <motion.path
            d="M10 70 L50 50 L90 70"
            fill="none"
            strokeWidth="0.5"
            strokeDasharray="2, 2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 1, ease: "easeInOut" }}
          />
          {/* Upward Arch / Foundation Line */}
          <motion.path
            d="M20 25 L50 10 L80 25"
            fill="none"
            strokeWidth="0.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 1.2, ease: "easeInOut" }}
          />
        </svg>

        {/* Pulsing Core */}
        <motion.div
          className="absolute inset-0 m-auto w-2 h-2 rounded-full bg-primary shadow-[0_0_15px_3px_rgba(59,130,246,0.5)]"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
        />
      </div>

      {/* Loading Text & Counter */}
      <div className="flex flex-col items-center z-10 font-mono">
        <div className="text-foreground/50 text-sm tracking-[0.3em] uppercase mb-4 font-semibold">
          Drafting Framework
        </div>
        <div className="text-6xl font-light text-foreground tracking-tighter tabular-nums flex items-baseline">
          {progress.toString().padStart(3, '0')}
          <span className="text-primary text-3xl ml-1">%</span>
        </div>
      </div>

      {/* Precision Progress Bar Line */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-foreground/10">
        <div
          className="h-full bg-primary"
          style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}
        />
      </div>
    </motion.div>
  );
}
