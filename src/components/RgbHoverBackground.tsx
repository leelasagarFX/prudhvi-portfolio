"use client";

import { motion } from "framer-motion";

export default function RgbHoverBackground({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative bg-black w-full overflow-hidden">
      {/* Ambient floating RGB lights (Hovering all around without cursor interaction) */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30 mix-blend-screen">
        <motion.div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full blur-[120px]"
          style={{ background: "radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)" }}
          animate={{
            x: [0, 150, -100, 0],
            y: [0, -150, 100, 0],
            scale: [1, 1.2, 0.8, 1]
          }}
          transition={{
            repeat: Infinity,
            duration: 25,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[100px]"
          style={{ background: "radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)" }}
          animate={{
            x: [0, -120, 80, 0],
            y: [0, 120, -60, 0],
            scale: [1, 0.9, 1.1, 1]
          }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-[400px] h-[400px] rounded-full blur-[90px]"
          style={{ background: "radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, transparent 70%)" }}
          animate={{
            x: [0, 100, -50, 0],
            y: [0, 50, -100, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            repeat: Infinity,
            duration: 30,
            ease: "linear"
          }}
        />
      </div>

      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
}
