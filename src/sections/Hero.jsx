import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ImageSlot from "../components/ImageSlot";
import { hero } from "../constants/content";
import { ScrollSmoother } from "gsap/ScrollSmoother";

const jump = (e, t) => {
  e.preventDefault();
  const s = ScrollSmoother.get();
  s ? s.scrollTo(t, true, "top top") : document.querySelector(t)?.scrollIntoView({ behavior: "smooth" });
};

export default function Hero({start = true }) {
  const root = useRef(null);

  // Simple one-time entrance + gentle floating chips. No scroll-driven motion.
  useGSAP(() => {
    if (!start) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .from(".rise", { y: 28, opacity: 0, duration: 0.8, stagger: 0.1 })
        .fromTo(".hero-art", { clipPath: "inset(12% 12% 12% 12% round 28px)", scale: 1.06 },
                { clipPath: "inset(0% 0% 0% 0% round 28px)", scale: 1, duration: 1.2, ease: "power2.out" }, 0.2)
        .from(".chip", { y: 20, opacity: 0, duration: 0.7, stagger: 0.15 }, 0.9);
      gsap.to(".chip-b", { y: 8, duration: 2.9, yoyo: true, repeat: -1, ease: "sine.inOut" });
    });
    return () => mm.revert();
  }, { scope: root, dependencies: [start], revertOnUpdate: true });

  return (
    <section id="hero" ref={root} className="hero">
      <div className="hero-grid">
        <div className="hero-copy">
          <span className="pill rise"><i />{hero.pill}</span>
          <h1 className="rise">{hero.a}</h1>
          <h1 className="rise"><em>{hero.em}</em> {hero.b}</h1> 
          <p className="rise">{hero.text}</p>
          <div className="actions rise">
            <a className="btn-dark" href={hero.primary.target} onClick={(e) => jump(e, hero.primary.target)}>{hero.primary.label}</a>
            <a className="btn-ghost" href={hero.secondary.target} onClick={(e) => jump(e, hero.secondary.target)}>{hero.secondary.label}</a>
          </div>
        </div>

        <div className="hero-art-wrap">
          <div className="hero-art">
            <ImageSlot src={hero.image} alt={hero.alt} label="Hero image" />
            <i className="ripple r1" /><i className="ripple r2" />
          </div>
          <div className="chip chip-b">
            <svg viewBox="0 0 60 24" width="52" height="22" aria-hidden="true"><path d="M2 20 L16 14 L28 17 L42 7 L58 3" fill="none" stroke="#c9a24b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
            Planned growth
          </div>
        </div>
      </div>
    </section>
  );
}
