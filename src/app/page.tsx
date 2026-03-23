"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import FloatingTime from "@/components/FloatingTime";
import RgbHoverBackground from "@/components/RgbHoverBackground";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  // Prevent scroll while loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isLoading]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} key="loader" />}
      </AnimatePresence>

      <main className="flex min-h-screen flex-col relative">
        <Navbar />
        <Hero />
        
        <RgbHoverBackground>
          <Skills />
          <Projects />
          <Experience />
          <Education />
          <Footer />
        </RgbHoverBackground>
        
        {/* Fixed Date & Time Component */}
        {!isLoading && <FloatingTime />}
      </main>
    </>
  );
}
