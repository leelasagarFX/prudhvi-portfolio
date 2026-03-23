"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

export default function FollowEyes() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftEyeRef = useRef<HTMLDivElement>(null);
  const rightEyeRef = useRef<HTMLDivElement>(null);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const calculatePupilTransform = (eyeRef: React.RefObject<HTMLDivElement | null>) => {
    if (!eyeRef.current) return { x: 0, y: 0 };
    
    // Get eye center relative to viewport
    const rect = eyeRef.current.getBoundingClientRect();
    const eyeCenterX = rect.left + rect.width / 2;
    const eyeCenterY = rect.top + rect.height / 2;

    // Calculate angle towards mouse
    const angle = Math.atan2(mousePos.y - eyeCenterY, mousePos.x - eyeCenterX);
    
    // Distance from center that the pupil can travel 
    const maxTravel = (rect.width / 2) - 16; 
    
    // Gentle distance scaling so it looks naturally tracking rather than snapping hard to walls
    const dist = Math.sqrt(Math.pow(mousePos.x - eyeCenterX, 2) + Math.pow(mousePos.y - eyeCenterY, 2));
    const distanceClamped = Math.min(dist / 12, maxTravel);

    return {
      x: Math.cos(angle) * distanceClamped,
      y: Math.sin(angle) * distanceClamped
    };
  };

  const leftPupil = calculatePupilTransform(leftEyeRef);
  const rightPupil = calculatePupilTransform(rightEyeRef);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 flex items-center justify-center gap-12 sm:gap-20 opacity-20 pointer-events-none select-none z-0"
    >
      {/* Left Eye */}
      <div 
        ref={leftEyeRef} 
        className="w-48 h-48 sm:w-64 sm:h-64 bg-foreground rounded-full flex items-center justify-center p-2 relative shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]"
      >
        <motion.div 
          animate={{ x: leftPupil.x, y: leftPupil.y }}
          transition={{ type: "spring", stiffness: 200, damping: 20, mass: 0.5 }}
          className="w-16 h-16 sm:w-24 sm:h-24 bg-background rounded-full absolute shadow-2xl"
        />
      </div>

      {/* Right Eye */}
      <div 
        ref={rightEyeRef} 
        className="w-48 h-48 sm:w-64 sm:h-64 bg-foreground rounded-full flex items-center justify-center p-2 relative shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]"
      >
        <motion.div 
          animate={{ x: rightPupil.x, y: rightPupil.y }}
          transition={{ type: "spring", stiffness: 200, damping: 20, mass: 0.5 }}
          className="w-16 h-16 sm:w-24 sm:h-24 bg-background rounded-full absolute shadow-2xl"
        />
      </div>
    </div>
  );
}
