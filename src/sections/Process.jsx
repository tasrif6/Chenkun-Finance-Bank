import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { process } from "../constants/content";

export default function Process() {
  const root = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: root.current, start: "top top", end: "+=250%", scrub: 1, pin: true },
    });
    tl.from(".step", { opacity: 0.12, y: 50, stagger: 1, ease: "power1.inOut" })
      .to(".spin", { rotate: 360, ease: "none", duration: process.length }, 0);
  }, { scope: root });

  return (
    <section id="eval_dimen" ref={root} className="process">
      <div className="process-inner max-md:relative">
        <h1 className="t-xl relative z-10 max-md:text-[clamp(30px, 9vw, 44px)] mr-4">Our Reporting <span className="hl">Process</span></h1>
        {/* <div className="process-bar"><i /></div> */}
        <div className="steps">
          {process.map((s) => (
            <div className="step" key={s.n}>
              <span>{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
        <svg className="spin" viewBox="0 0 100 100" aria-hidden="true">
          <circle cx="50" cy="50" r="46" /><path d="M50 4v14M50 82v14M4 50h14M82 50h14" />
        </svg>
      </div>
    </section>
  );
}
