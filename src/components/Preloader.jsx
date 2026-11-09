import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { brand } from "../constants/content";

// Full-screen 1 → 100% loader shown on every page load/refresh.
// Counts to 90% on a timer, then waits for the real window "load" event before finishing.
// onExit fires when the curtain starts lifting (starts the hero animation); onDone fires when it is gone.
export default function Preloader({ onExit, onDone }) {
  const root = useRef(null);
  const num = useRef(null);
  const [gone, setGone] = useState(false);

  useGSAP(() => {
    const html = document.documentElement;
    html.style.overflow = "hidden"; // lock scroll while loading
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const state = { v: 0 };
    let exited = false;
    let disposed = false;
    let waiting = null;

    const render = () => {
      if (disposed || !num.current || !root.current) return;
      const n = Math.max(1, Math.round(state.v));
      num.current.textContent = n;
      root.current.style.setProperty("--p", n / 100);
    };

    const exit = () => {
      if (disposed || exited) return;
      exited = true;
      onExit?.();
      gsap.timeline({ onComplete: () => {
        if (disposed) return;
        html.style.overflow = "";
        setGone(true);
        onDone?.();
      } })
        .to(".pre-content", { opacity: 0, y: -20, duration: 0.4, ease: "power2.in" })
        .to(root.current, { clipPath: "inset(0 0 100% 0)", duration: reduce ? 0.2 : 0.9, ease: "power4.inOut" }, "-=0.1");
    };

    const finish = () => {
      if (disposed) return;
      gsap.to(state, { v: 100, duration: 0.6, ease: "power2.out", onUpdate: render, onComplete: () => {
        if (!disposed) gsap.delayedCall(0.3, exit);
      } });
    };

    render();
    gsap.to(state, {
      v: 90, duration: reduce ? 0.4 : 2.2, ease: "power1.out", onUpdate: render,
      onComplete: () => {
        if (document.readyState === "complete") finish();
        else { waiting = finish; window.addEventListener("load", waiting, { once: true }); }
      },
    });

    return () => {
      disposed = true;
      if (waiting) window.removeEventListener("load", waiting);
      html.style.overflow = "";
    };
  }, { scope: root });

  return (
    <div ref={root} className="preloader" style={{ clipPath: "inset(0 0 0 0)", display: gone ? "none" : undefined }} aria-live="polite" aria-label="Loading">
      <div className="pre-content">
        <div className="pre-top">
          <span className="pre-logo">
            <i>C</i> {brand.name}
          </span>
        </div>
        <div className="pre-bottom">
          <div className="pre-count"><span ref={num}>1</span><em>%</em></div>
          <div className="pre-bar"><i /></div>
        </div>
      </div>
    </div>
  );
}