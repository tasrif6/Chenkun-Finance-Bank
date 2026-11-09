import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ImageSlot from "../components/ImageSlot";
import ImageModal from "../components/ImageModal";
import { services } from "../constants/content";

export default function Services() {
  const root = useRef(null);
  const track = useRef(null);
  const [active, setActive] = useState(null);
  const openCard = (service, event) => {
    const image = event.currentTarget;
    const card = image.closest(".sleeve-card");
    setActive({ ...service, picEl: image, sleeveEl: card.querySelector(".sleeve") });
  };

  useGSAP(() => {
    const mm = gsap.matchMedia();
    // Desktop: vertical scroll drives a pinned horizontal track. Mobile: native swipe (CSS).
    mm.add("(min-width: 1025px)", () => {
      const dist = () => track.current.scrollWidth - innerWidth;
      gsap.to(track.current, {
        x: () => -dist(), ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: () => "+=" + dist(), scrub: 1, pin: true, invalidateOnRefresh: true },
      });
      gsap.to(".services-bar i", {
        scaleX: 1, ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: () => "+=" + dist(), scrub: true },
      });
    });
    return () => mm.revert();
  }, { scope: root });

  // Card tilt on hover
  const tilt = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(e.currentTarget, { rotateY: x * 14, rotateX: -y * 14, duration: 0.4, transformPerspective: 900, ease: "power2.out" });
  };
  const reset = (e) => gsap.to(e.currentTarget, { rotateX: 0, rotateY: 0, duration: 0.6, ease: "power3.out" });

  // The visible part of the sleeve image: where the pop-up grows from / shrinks back to
  const getOrigin = () => {
    const p = active.picEl.getBoundingClientRect();
    const s = active.sleeveEl.getBoundingClientRect();
    return { left: p.left, top: p.top, width: p.width, height: Math.max(60, s.top - p.top) };
  };

  return (
    <section id="cooperation" ref={root} className="services">
      <div className="services-head">
        <h1 className="t-xl">What we <span className="hl">do</span></h1>
        <div className="services-bar"><i /></div>
        <p className="swipe-hint">Swipe →</p>
      </div>

      <div ref={track} className="services-track">
        {services.map((s) =>
          s.sleeve ? (
            <article key={s.n} className={`card sleeve-card tone-${s.tone}`} onMouseMove={tilt} onMouseLeave={reset}>
              <button className="pic" onClick={(e) => openCard(s, e)} aria-label={`Open ${s.title} image`}>
                <span className="pic-in">
                  <ImageSlot src={s.sleeve.image} alt={s.sleeve.imageAlt} label="Add image" />
                  <span className="expand"><span>View</span><b>⤢</b></span>
                </span>
              </button>
              <div className="sleeve">
                <span className="card-n">{s.n}</span>
                <span className="card-arrow">↗</span>
                {s.logo ? (
                  <img className="mark" src={s.logo} alt={s.logoAlt || ""} />
                ) : (
                  <svg className="mark" viewBox="0 0 64 64" aria-hidden="true">
                    <g fill="currentColor"><path d="M29 29V5L5 29Z" /><path d="M35 29V5l24 24Z" /><path d="M29 35H5l24 24Z" /><path d="M35 35h24L35 59Z" /></g>
                  </svg>
                )}
                <h3>{s.title}</h3>
                <small>{s.sleeve.tagline}</small>
                <p>{s.text}</p>
              </div>
            </article>
          ) : (
            <article key={s.n} className={`card tone-${s.tone}`} onMouseMove={tilt} onMouseLeave={reset}>
              <span className="card-n">{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <span className="card-arrow">↗</span>
            </article>
          )
        )}
      </div>

      {active && (
        <ImageModal
          onClose={() => setActive(null)}
          getOrigin={getOrigin}
          src={active.sleeve.image}
          alt={active.sleeve.imageAlt}
          kicker={active.sleeve.kicker}
          title={active.title}
          text={active.sleeve.caption}
        />
      )}
    </section>
  );
}