"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Download, ChevronDown } from "lucide-react";
import { useRef, useEffect } from "react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  // Interactive Dot Grid setup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const spacing = 35; // Spacing between dots
    const radius = 1.5;
    const hoverRadius = 150; // Radius of mouse interaction

    let mouse = { x: -1000, y: -1000 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    let dots: { x: number; y: number; baseX: number; baseY: number }[] = [];

    const initDots = () => {
      dots = [];
      for (let x = 0; x < width; x += spacing) {
        for (let y = 0; y < height; y += spacing) {
          dots.push({ x, y, baseX: x, baseY: y });
        }
      }
    };
    initDots();

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      dots.forEach(dot => {
        const dx = mouse.x - dot.baseX;
        const dy = mouse.y - dot.baseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let targetX = dot.baseX;
        let targetY = dot.baseY;
        let alpha = 0.15;

        // Mouse repel effect and opacity pop
        if (dist < hoverRadius) {
          const force = (hoverRadius - dist) / hoverRadius;
          targetX -= (dx / dist) * force * 20; // Repel distance
          targetY -= (dy / dist) * force * 20;
          alpha = 0.15 + force * 0.6; // Get brighter near mouse
          ctx.fillStyle = `rgba(59, 130, 246, ${alpha})`; // primary color
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`; // standard foreground
        }

        // Smooth interpolation back to base position
        dot.x += (targetX - dot.x) * 0.1;
        dot.y += (targetY - dot.y) * 0.1;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };
    render();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initDots();
    }
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
    }
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Dynamic Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0"
      />

      {/* Decorative Gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[128px] pointer-events-none" />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="inline-block py-2 px-4 rounded-full bg-primary/20 text-primary text-base md:text-lg font-medium mb-6 border border-primary/20 shadow-lg shadow-primary/5">
            Unreal Engine Artist
          </span>
        </motion.div>

        <motion.h1
          className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Prudhvi Raju <br className="hidden md:block" />
          <span className="block text-4xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-50 to-accent mt-2">
            {"Architectural Visualizer".split("").map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 5, delay: 1 + index * 0.05 }}
              >
                {char}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-foreground/70 max-w-5xl mx-auto mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          I’m a 3D Architectural Visualizer who turns CAD drawings into realistic, interactive environments using 3ds Max and Unreal Engine. I work on everything from site layouts and landscapes to detailed interiors, focusing on accuracy, clean models, and natural lighting. I handle the full process from CAD interpretation to final rendering, creating visuals that clearly communicate design and feel realistic.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="https://drive.google.com/file/d/1wiphhl4IZteP5mxn7_-GwYxy5-9nad6c/view?usp=sharing"
            target="_blank"
            className="group relative px-8 py-4 bg-foreground text-background rounded-full font-medium overflow-hidden transition-all hover:scale-105 flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Download size={18} />
              Resume
            </span>
            <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          </a>
          <a
            href="#projects"
            className="px-8 py-4 rounded-full font-medium border border-foreground/10 hover:border-foreground/30 transition-all hover:bg-foreground/5 w-full sm:w-auto"
          >
            View Projects
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-foreground/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown size={32} />
        </motion.div>
      </motion.div>
    </section>
  );
}
