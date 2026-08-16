"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github, Maximize2, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const projects = [
  {
    title: "Trifecta Veranza",
    description: "A landmark 36-floor twin-tower luxury residential development, designed to redefine modern urban living with striking architecture, thoughtfully planned residences, and an extensive range of premium amenities. Set within a vibrant urban environment, Trifecta Veranza seamlessly blends contemporary aesthetics, elevated lifestyles, landscaped spaces, and resort-inspired comforts to create a sophisticated residential experience. This design project is currently in its developmental phase, focusing on conceptual planning and spatial organization. The design explores innovative use of form, function, and sustainability while responding to the site context and user needs. Ongoing work includes refining structural details, material selection, and environmental strategies to achieve a cohesive and functional final outcome.",
    tags: ["High-rise", "Master Planning", "Luxury Lifestyle", "Amenities"],
    link: "https://trifecta-veranza.vercel.app/",
    github: "#",
    media: [
      { type: "image", url: "https://drive.google.com/file/d/1YEHUf3cZ8qCkfe8gqF-zpcF87CS-JtK3/view?usp=sharing" },
      { type: "image", url: "https://drive.google.com/file/d/1IwpGvy9ipINaybZotWGAy_Y4MECGx-Fc/view?usp=drive_link" },
    ],
    color: "from-blue-500/20 to-indigo-500/20"
  },
  {
    title: "Aadhya Serene",
    description: "A premium 7-floor luxury residential space located in the vibrant neighborhood of Thanisandra, Bengaluru. Designed to harmonize modern aesthetics with comfortable living spaces.",
    tags: ["Exterior Design", "Architecture", "Bengaluru", "Luxury"],
    link: "https://aadhyaserene.com",
    github: "#",
    media: [
      { type: "video", url: "https://drive.google.com/file/d/1sQYQ46Quk_0rtqT5a7VylO0EUQy-QGEQ/view?usp=drivesdk" },
      // { type: "image", url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" },
    ],
    color: "from-emerald-500/20 to-teal-500/20"
  },
  {
    title: "Suite Homes",
    description: "A breathtaking 20,000 sqft residential masterpiece spanning 3 floors. Features include a state-of-the-art Gym, immersive home theatre, an indoor waterfall integrated with a Gazebo, and lush landscaped gardens.",
    tags: ["Unreal Engine", "Architecture", "3D Rendering", "Environment Design"],
    link: "#",
    github: "#",
    media: [
      { type: "video", url: "https://drive.google.com/file/d/11VX-lnU3Ez-MnDUAtZPlktbjntXIqJei/view?usp=sharing" },
      { type: "Image", url: "https://drive.google.com/file/d/1mgJLLWNTPlN1Qd21ofLW59OgOSvMFmdb/view?usp=drive_link" },
      { type: "Image", url: "https://drive.google.com/file/d/1YHOorSdD4wtG3ye83OvvLdJ1FzeCE8GY/view?usp=drive_link" },
      { type: "Image", url: "https://drive.google.com/file/d/1CBwBA7reXBV1kTmmT6SOgwIuySdxFCSq/view?usp=drive_link" }
    ],
    color: "from-blue-500/20 to-purple-500/20"
  },
  {
    title: "Esha Courtyard",
    description: "An exclusive 136-villa development located in the heart of Bengaluru. Crafted with a focus on sustainable architecture, elegant landscapes, and unparalleled community living.",
    tags: ["Villa Design", "Architecture", "Bengaluru", "Master Planning"],
    link: "#",
    github: "#",
    media: [
      { type: "image", url: "https://drive.google.com/file/d/1Euw9pNb3jq4xXmtZmBF759ymJQU1Bc-H/view?usp=drive_link" },
      { type: "image", url: "https://drive.google.com/file/d/1SQUgxUUIY7f-ttI0pAJ4VW_crqmLIXw6/view?usp=drive_link" },
      { type: "image", url: "https://drive.google.com/file/d/1PcdBIZD4WDB704F6BdRxteHNDwyqQkK9/view?usp=drive_link" },
    ],
    color: "from-orange-500/20 to-red-500/20"
  }
];

function ProjectCard({ project, index, onSelectStack }: { project: typeof projects[0], index: number, onSelectStack: (m: { type: string, url: string }[], startIndex: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.3 1"]
  });

  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.6, 1]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <motion.div
      ref={ref}
      style={{ scale: scaleProgress, opacity: opacityProgress }}
      className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-12 lg:gap-20 items-center mb-48 md:mb-64 last:mb-0`}
    >
      <div className="w-full lg:w-1/2">
        <div
          className={`aspect-video rounded-3xl bg-gradient-to-br ${project.color} border border-foreground/10 relative group flex items-center justify-center cursor-pointer`}
          onClick={() => onSelectStack(project.media, 0)}
        >
          {project.media.map((item, idx) => {
            const isBack = idx > 0;
            return (
              <motion.div
                key={idx}
                style={{
                  y: imageY,
                  rotate: isBack ? (idx % 2 === 0 ? idx * 2 : -idx * 2) : 0,
                  scale: isBack ? 1 - (idx * 0.05) : 1,
                  zIndex: project.media.length - idx
                }}
                className={`absolute inset-0 w-full h-[130%] -top-[15%] transition-transform duration-700 ease-out origin-center rounded-3xl overflow-hidden shadow-xl border border-foreground/5 ${isBack ? 'group-hover:translate-x-6 group-hover:-translate-y-4 group-hover:rotate-[8deg]' : 'group-hover:scale-[1.03] group-hover:-translate-x-2'}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectStack(project.media, idx);
                }}
              >
                <div className="absolute inset-0 bg-background/20 opacity-0 group-hover:opacity-10 transition-opacity z-10 pointer-events-none" />
                {item.type === "video" ? (
                  item.url.includes("drive.google.com") ? (
                    <iframe
                      src={item.url.replace(/\/view.*/, '/preview')}
                      className="w-full h-full pointer-events-none"
                      style={{ border: "none" }}
                    />
                  ) : (
                    <video
                      src={item.url}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  )
                ) : (
                  <Image
                    src={item.url.includes("drive.google.com/file/d/") ? `https://drive.google.com/thumbnail?id=${item.url.split('/file/d/')[1].split('/')[0]}&sz=w1920-h1080` : item.url}
                    alt={project.title}
                    fill
                    unoptimized
                    referrerPolicy="no-referrer"
                    className="object-cover"
                  />
                )}
              </motion.div>
            );
          })}

          <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-20 h-20 rounded-full bg-background/50 flex items-center justify-center backdrop-blur-md cursor-pointer text-foreground shadow-2xl z-[100] opacity-0 group-hover:opacity-100 transition-opacity absolute"
          >
            <Maximize2 size={32} />
          </motion.div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col justify-center">
        <h3 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">{project.title}</h3>
        <p className="text-lg text-foreground/70 mb-8 leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-3 mb-8">
          {project.tags.map(tag => (
            <span key={tag} className="px-4 py-2 rounded-full border border-foreground/10 text-sm font-medium bg-foreground/5 text-foreground/80">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <button onClick={() => onSelectStack(project.media, 0)} className="flex items-center gap-2 font-medium hover:text-primary transition-colors group">
            View Gallery
            <Maximize2 size={18} className="group-hover:scale-110 transition-transform" />
          </button>

          {project.link !== "#" && (
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-medium hover:text-primary transition-colors group">
              Visit Website
              <ExternalLink size={18} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [activeStack, setActiveStack] = useState<{ media: { type: string, url: string }[], index: number } | null>(null);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeStack) {
      setActiveStack({ ...activeStack, index: (activeStack.index + 1) % activeStack.media.length });
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeStack) {
      setActiveStack({ ...activeStack, index: (activeStack.index - 1 + activeStack.media.length) % activeStack.media.length });
    }
  };

  return (
    <section id="projects" className="py-32 relative">
      <AnimatePresence>
        {activeStack && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/90 backdrop-blur-md flex items-center justify-center p-4 md:p-12 cursor-pointer"
            onClick={() => setActiveStack(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-6xl aspect-video rounded-3xl overflow-hidden shadow-2xl border border-foreground/10 bg-black/50"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStack.index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 w-full h-full"
                >
                  {activeStack.media[activeStack.index].type === "video" ? (
                    activeStack.media[activeStack.index].url.includes("drive.google.com") ? (
                      <iframe
                        key={activeStack.media[activeStack.index].url}
                        src={activeStack.media[activeStack.index].url.replace(/\/view.*/, '/preview')}
                        className="w-full h-full rounded-2xl"
                        style={{ border: "none" }}
                        allow="autoplay"
                      />
                    ) : (
                      <video key={activeStack.media[activeStack.index].url} src={activeStack.media[activeStack.index].url} autoPlay loop controls className="w-full h-full object-contain" />
                    )
                  ) : (
                    <Image src={activeStack.media[activeStack.index].url.includes("drive.google.com/file/d/") ? `https://drive.google.com/thumbnail?id=${activeStack.media[activeStack.index].url.split('/file/d/')[1].split('/')[0]}&sz=w1920-h1080` : activeStack.media[activeStack.index].url} alt="Zoomed view" fill unoptimized referrerPolicy="no-referrer" className="object-contain" />
                  )}
                </motion.div>
              </AnimatePresence>

              {activeStack.media.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/50 backdrop-blur-md flex items-center justify-center text-foreground hover:bg-background/80 transition-colors border border-foreground/20 z-10"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/50 backdrop-blur-md flex items-center justify-center text-foreground hover:bg-background/80 transition-colors border border-foreground/20 z-10"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}

              <button
                onClick={() => setActiveStack(null)}
                className="absolute top-6 right-6 w-12 h-12 rounded-full bg-background/50 backdrop-blur-md flex items-center justify-center text-foreground hover:bg-background/80 transition-colors border border-foreground/20 z-20 text-2xl font-light"
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24 md:text-center"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">Featured <span className="text-primary">Work</span></h2>
          <p className="text-foreground/60 max-w-2xl mx-auto text-xl">
            A selection of my best projects, highlighting interactive design and complex engineering.
          </p>
        </motion.div>

        <div className="flex flex-col">
          {projects.map((project, idx) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={idx}
              onSelectStack={(media, index) => setActiveStack({ media, index })}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
