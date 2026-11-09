import { useEffect, useState } from "react";
import gsap from "gsap";
import _ScrollTrigger, { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Services from "./sections/Services";
import Banks from "./sections/Banks";
import Metrics from "./sections/Metrics";
import Process from "./sections/Process";
import Footer from "./sections/Footer";
import Preloader from "./components/Preloader";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, useGSAP);

const initialTheme = () => {
  try {
    return localStorage.getItem("theme") || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  } catch {
    return "light";
  }
};

export default function App() {
  const [theme, setTheme] = useState(initialTheme);
  const [started, setStarted] = useState(false)

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    try { localStorage.setItem("theme", theme); } catch { /* storage unavailable */ }
  }, [theme]);

  // Smooth scrolling on desktop pointers only; touch/reduced-motion get native scroll.
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1025px) and (hover: hover) and (prefers-reduced-motion: no-preference)", () => {
      const s = ScrollSmoother.create({ smooth: 1.4, effects: true });
      ScrollTrigger.refresh();
      return () => s.kill();
    });
    return () => mm.revert();
  });

  return (
    <main>
      <Preloader onExit={() => setStarted(true)} onDone={() => ScrollTrigger.refresh()}/>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          
          <Hero start={started}/>
          <About />
          <Services />
          <Banks />
          <Metrics />
          <Process />
          <Footer />
        </div>
      </div>
    </main>
  );
}
