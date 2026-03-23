"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";

const experiences = [
  {
    role: "Unreal Engine Intern",
    company: "Sthyra",
    link: "https://sthyra.com",
    period: "Oct 2025 - Mar 2026",
    description: "Focused on 3D architectural visualization, creating robust interiors and exteriors using Unreal Engine and 3ds Max. Rapidly expanding expertise into Character VFX and SFX for advanced 3D cinematics.",
  },
  {
    role: "Community Moderator",
    company: "iQOO India (Freelance)",
    link: "https://community.iqoo.com",
    period: "May 2023 - Present",
    description: "Acting as a vital bridge between the brand and its users—sparking engaging tech discussions, decoding new features, and collaborating directly with Product, OS, and Testing teams to continuously refine and elevate the iQOO smartphone experience.",
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-32 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
            <Briefcase size={24} />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">Experience</h2>
        </motion.div>

        <div className="space-y-12 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-foreground/20 before:to-transparent">
          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
            >
              {/* Timeline dot */}
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-background border-4 border-foreground/10 group-hover:border-primary transition-colors absolute left-0 md:left-1/2 -translate-x-1/2 z-10">
                <div className="w-3 h-3 rounded-full bg-foreground/30 group-hover:bg-primary transition-colors" />
              </div>

              {/* Content Box */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] ml-auto md:ml-0 p-6 md:p-8 rounded-2xl bg-background border border-foreground/10 group-hover:border-primary/50 transition-colors shadow-sm relative hover:shadow-xl hover:shadow-primary/5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <h3 className="text-2xl font-bold text-foreground">{exp.role}</h3>
                  <span className="flex items-center gap-2 text-sm text-primary font-medium bg-primary/10 px-3 py-1 rounded-full w-fit">
                    <Calendar size={14} />
                    {exp.period}
                  </span>
                </div>
                {exp.link ? (
                  <a href={exp.link} target="_blank" rel="noopener noreferrer" className="text-lg font-medium text-primary hover:underline mb-4 inline-block">
                    {exp.company}
                  </a>
                ) : (
                  <h4 className="text-lg font-medium text-foreground/60 mb-4">{exp.company}</h4>
                )}
                <p className="text-foreground/70 leading-relaxed">
                  {exp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
