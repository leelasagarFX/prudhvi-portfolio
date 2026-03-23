"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

const skills = [
  { name: "AutoCAD", level: 80, logo: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/autocad-icon.png" },
  { name: "3ds Max", level: 90, logo: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/autodesk-3ds-max-icon.png" },
  { name: "Unreal Engine", level: 80, logo: "https://img.icons8.com/?size=100&id=69503&format=png&color=000000" },
  { name: "Blender", level: 80, logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/blender/blender-original.svg" },
  { name: "Adobe Photoshop", level: 80, logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/photoshop/photoshop-original.svg" },
  { name: "Adobe Premiere Pro", level: 80, logo: "https://www.svgrepo.com/show/452150/adobe-premiere.svg" },
];

function SkillCard({ name, level, logo }: { name: string; level: number; logo: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative w-full aspect-square rounded-2xl bg-foreground/5 border border-foreground/10 hover:border-primary/50 transition-colors cursor-pointer flex flex-col items-center justify-center p-6 group shadow-lg shadow-black/5"
    >
      <div
        style={{ transform: "translateZ(50px)" }}
        className="flex flex-col items-center justify-center pointer-events-none"
      >
        <div className="w-16 h-16 rounded-full bg-foreground/5 mb-4 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
          <img src={logo} alt={`${name} logo`} className="w-8 h-8 object-contain drop-shadow-md" />
        </div>
        <h3 className="font-semibold text-lg">{name}</h3>
        <p className="text-sm text-foreground/50 mt-1">{level}% Proficiency</p>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-32 relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-[800px] h-[800px] bg-secondary/10 rounded-full blur-[128px] pointer-events-none -translate-y-1/2 translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Software <span className="text-primary">Skills</span></h2>
          <p className="text-foreground/60 max-w-20xl mx-auto text-lg">
            A comprehensive toolkit for crafting high-performance, visually stunning digital experiences.

          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto" style={{ perspective: "1000px" }}>
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <SkillCard {...skill} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
