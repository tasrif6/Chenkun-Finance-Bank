import { useRef } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import ImageSlot from "./ImageSlot";

// Portrait image pop-up. Rendered through a portal into <body> so it covers the whole screen
// (position: fixed would break inside the ScrollSmoother's transformed content).
// It grows out of the sleeve image (getOrigin) and shrinks back into it on close.
export default function ImageModal({ onClose, getOrigin, src, alt, kicker, title, text }) {
  const root = useRef(null);
  const frame = useRef(null);
  const back = useRef(null);
  const closeBtn = useRef(null);
  const closing = useRef(false);
  const zoomEl = useRef(null);
  const zoomed = useRef(false);
  const ZOOM = 2.2; // how far the image magnifies
  
  // Offset + scale that makes the frame cover the small image it came from
  const flip = () => {
    const t = getOrigin();
    const fw = frame.current.offsetWidth;
    const fh = frame.current.offsetHeight;
    return {
      x: t.left + t.width / 2 - document.documentElement.clientWidth / 2,
      y: t.top + t.height / 2 - innerHeight / 2,
      s: Math.max(t.width / fw, t.height / fh),
    };
  };

  // Move the zoomed image opposite to the pointer so every part of it can be reached
    const pan = (e) => {
    if (!zoomed.current) return;
    const r = frame.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(zoomEl.current, { x: -px * (ZOOM - 1) * r.width, y: -py * (ZOOM - 1) * r.height, duration: 0.4, ease: "power2.out", overwrite: "auto" });
    };

    // Click: zoom in (and follow the pointer). Click again: zoom back out.
    const toggleZoom = (e) => {
    zoomed.current = !zoomed.current;
    frame.current.classList.toggle("is-zoomed", zoomed.current);
    gsap.to(root.current.querySelector(".modal-cap"), { opacity: zoomed.current ? 0 : 1, duration: 0.3 });
    if (zoomed.current) {
        pan(e);
        gsap.to(zoomEl.current, { scale: ZOOM, duration: 0.55, ease: "power3.out", overwrite: "auto" });
    } else {
        gsap.to(zoomEl.current, { scale: 1, x: 0, y: 0, duration: 0.5, ease: "power3.out", overwrite: "auto" });
    }
    };
  const requestClose = () => {
    if (closing.current) return;
    closing.current = true;
    const o = flip();
    gsap.timeline({ onComplete: onClose })
      .to(frame.current, { x: o.x, y: o.y, scale: o.s, opacity: 0, duration: 0.45, ease: "power3.inOut" }, 0)
      .to(back.current, { opacity: 0, duration: 0.4 }, 0.05)
      .to(zoomEl.current, { scale: 1, x: 0, y: 0, duration: 0.3 }, 0); 
  };

  useGSAP(() => {
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    const smoother = ScrollSmoother.get();
    html.style.overflow = "hidden"; // lock page scroll while open
    smoother?.paused(true);

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const o = flip();
    gsap.set(frame.current, { x: o.x, y: o.y, scale: o.s, opacity: 0 });
    gsap.timeline()
      .to(back.current, { opacity: 1, duration: 0.4, ease: "power1.out" }, 0)
      .to(frame.current, { x: 0, y: 0, scale: 1, opacity: 1, duration: reduce ? 0.05 : 0.6, ease: "power3.out" }, 0)
      .from(".modal-cap", { y: 20, opacity: 0, duration: 0.4, ease: "power2.out" }, 0.35);

    closeBtn.current.focus({ preventScroll: true });
    const onKey = (e) => e.key === "Escape" && requestClose();
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      html.style.overflow = prevOverflow;
      smoother?.paused(false);
    };
  }, { scope: root });

  return createPortal(
    <div ref={root} className="modal" role="dialog" aria-modal="true" aria-label={title}>
      <div ref={back} className="modal-back" onClick={requestClose} />
      <div ref={frame} className="modal-frame">
        <button ref={closeBtn} className="modal-close" onClick={requestClose} aria-label="Close image">✕</button>
        <div ref={zoomEl} className="modal-zoom" onClick={toggleZoom} onPointerMove={pan}>
            <ImageSlot src={src} alt={alt} label="Portrait image" />
        </div>
        <span className="modal-hint">Click to zoom</span>
        <div className="modal-cap">
          <small>{kicker}</small>
          <strong>{title}</strong>
          {text && <span>{text}</span>}
        </div>
      </div>
    </div>,
    document.body
  );
}