import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { about } from "../constants/content";
import ImageSlot from "../components/ImageSlot";

export default function About() {
  const root = useRef(null);

  // One-time fade-up when scrolled into view (not scrubbed)
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(".about-head > *", { y: 24, opacity: 0, duration: 0.7, stagger: 0.1, ease: "power2.out",
        scrollTrigger: { trigger: ".about-head", start: "top 80%", once: true } });
      gsap.from(".about-list li", { y: 30, opacity: 0, duration: 0.7, stagger: 0.12, ease: "power2.out",
        scrollTrigger: { trigger: ".about-body", start: "top 80%", once: true } });
      // Team photo: slides in from the left once, then stays put
      gsap.fromTo(".about-photo",
        { x: () => -Math.min(window.innerWidth * 0.7, 900), opacity: 0 },
        { x: 0, opacity: 1, duration: 1.4, ease: "power3.out",
          scrollTrigger: { trigger: ".about-body", start: "top 75%", once: true } });
    });
    return () => mm.revert();
  }, { scope: root });

  return (
    <section id="about" ref={root} className="about">
      <div className="about-wrap">
        <header className="about-head">
          <span className="eyebrow">{about.eyebrow}</span>
          <h2>{about.title}</h2>
          <p>{about.text}</p>
        </header>

        <div className="about-body">
          <figure className="about-photo">
            <ImageSlot src={about.photo} alt={about.photoAlt} label="Team photo" />
            <figcaption>{about.quote}</figcaption>
          </figure>

          <div className="self-center space-y-24">
            {about.points.map((p) => (
                <div key={p.id} className="text-xl flex items-center gap-4">
                  <h2><p.icon /></h2>
                  <h3>{p.title}</h3>
                </div> 
              ))}
                {/* <p>{p.text}</p> */}
                {/* <span className="about-list-label relative inline-block w-fit cursor-pointer
                    after:content-[''] after:absolute after:bottom-0 after:left-0
                    after:h-[1.5px] after:w-full after:origin-left
                    after:scale-x-0 after:bg-current
                    after:transition-transform after:duration-300
                    hover:after:scale-x-100">
                  {p.link} →
                </span> */}
           
          </div>
        </div>
      </div>
    </section>
  );
}
