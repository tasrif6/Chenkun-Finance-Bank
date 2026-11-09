import { useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { metrics } from "../constants/content";

export default function Metrics() {
  const root = useRef(null);

  useGSAP(() => {
    const t = SplitText.create(".metrics-title", { type: "words,chars" });
    gsap.from(t.chars, {
      yPercent: 110, stagger: 0.02, ease: "power2.out",
      scrollTrigger: { trigger: root.current, start: "top 70%" },
    });
    // Count-up
    root.current.querySelectorAll("[data-value]").forEach((el) => {
      const end = parseFloat(el.dataset.value);
      const d = parseInt(el.dataset.decimals || "0", 10);
      const o = { v: 0 };
      gsap.to(o, {
        v: end, duration: 2, ease: "power2.out",
        onUpdate: () => (el.textContent = o.v.toLocaleString(undefined, { minimumFractionDigits: d, maximumFractionDigits: d })),
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
    });
    gsap.from(".metric", {
      y: 60, opacity: 0, stagger: 0.12, ease: "power2.out",
      scrollTrigger: { trigger: ".metrics-grid", start: "top 80%" },
    });
  }, { scope: root });

  return (
    <section id="metrics" ref={root} className="metrics">
      <div className="mask"><h1 className="metrics-title t-xl">Numbers that matter</h1></div>
      <div className="metrics-grid">
        {metrics.map((m) => (
          <div className="metric" key={m.label}>
            <b>
              <span data-value={m.value} data-decimals={m.decimals || 0}>0</span>
              {m.suffix}
            </b>
            <small>{m.label}</small>
          </div>
        ))}
      </div>
      {/* <p className="fine">Placeholder figures — replace in constants/content.js</p> */}
    </section>
  );
}
