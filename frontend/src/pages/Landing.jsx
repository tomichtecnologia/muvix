import React, { useState } from "react";
import FloatingBackground from "../components/landing/FloatingBackground";
import DevBanner from "../components/landing/DevBanner";
import Header from "../components/landing/Header";
import Hero from "../components/landing/Hero";
import Courses from "../components/landing/Courses";
import Pricing from "../components/landing/Pricing";
import StudyTools from "../components/landing/StudyTools";
import Testimonials from "../components/landing/Testimonials";
import AdoteUmAluno from "../components/landing/AdoteUmAluno";
import About from "../components/landing/About";
import Contact from "../components/landing/Contact";
import Footer from "../components/landing/Footer";
import FloatingButtons from "../components/landing/FloatingButtons";
import SupportModal from "../components/landing/SupportModal";

export default function Landing() {
  const [supportOpen, setSupportOpen] = useState(false);
  const openSupport = () => setSupportOpen(true);

  return (
    <div className="relative min-h-screen bg-[#050505]">
      <FloatingBackground />
      <DevBanner />
      <Header onSupport={openSupport} />
      <main className="relative">
        <Hero />
        <Courses />
        <Pricing />
        <StudyTools />
        <Testimonials />
        <AdoteUmAluno />
        <About />
        <Contact />
      </main>
      <Footer />
      <FloatingButtons onSupport={openSupport} />
      <SupportModal open={supportOpen} onClose={() => setSupportOpen(false)} />
    </div>
  );
}
