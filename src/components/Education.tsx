"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

const education = [
  {
    degree: "Bachelors in Electrical and Electronics Engineering",
    institution: "Sir CR Reddy College Of Engineering",
    year: "2021 - 2025",
    description: "Developed a comprehensive understanding of core engineering principles, specializing in the design, testing, and optimization of electrical systems, circuitry, motors, and advanced drone technology.",
  },
  {
    degree: "Intermediate",
    institution: "Gravity Junior College",
    year: "2019 - 2021",
    description: "Secured 93 percentile in JEE Mains 2021. Driven by a strong passion for Physics and Mathematics, focusing on analytical problem-solving and applying core scientific principles.",
  }
];

export default function Education() {
  return (
    <section id="education" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="mb-16 md:text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary md:mx-auto mb-6">
            <GraduationCap size={32} />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Education</h2>
          <p className="text-foreground/60 max-w-2xl mx-auto text-lg">
            A solid academic foundation that blends art, design, and engineering logic.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {education.map((edu, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="flex flex-col h-full p-8 rounded-3xl bg-foreground/5 border border-foreground/10 hover:border-secondary/50 group transition-all"
            >
              <span className="text-secondary font-bold text-xl mb-2 block">{edu.year}</span>
              <div className="min-h-[5rem] flex items-start">
                <h3 className="text-2xl font-bold mb-2 group-hover:text-secondary transition-colors line-clamp-3">{edu.degree}</h3>
              </div>
              <div className="min-h-[3.5rem] flex items-start">
                <h4 className="text-lg text-foreground/70 mb-6">{edu.institution}</h4>
              </div>
              <p className="text-foreground/60 leading-relaxed flex-grow">
                {edu.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
