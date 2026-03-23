"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function FloatingTime() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Prevent hydration mismatch by returning null until mounted on client
  if (!time) return null;

  const timeString = time.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const dateString = time.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
      className="fixed bottom-6 right-6 z-50 pointer-events-auto"
    >
      <div className="flex items-center gap-4 px-5 py-3 bg-background/80 backdrop-blur-xl border border-foreground/10 rounded-full shadow-2xl hover:border-primary/50 transition-colors cursor-default group">
        {/* Pulsing Dot */}
        <div className="relative flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-primary absolute animate-ping opacity-75" />
          <div className="w-2 h-2 rounded-full bg-primary relative shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
        </div>
        
        {/* Time and Date */}
        <div className="flex flex-col text-left">
          <span className="text-sm font-bold tracking-tight text-foreground group-hover:text-primary transition-colors leading-none">
            {timeString}
          </span>
          <span className="text-[10px] text-foreground/50 uppercase tracking-[0.2em] mt-1 leading-none font-medium">
            {dateString}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
