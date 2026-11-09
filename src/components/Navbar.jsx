import { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowUpRight, Search, Sun, Moon } from "lucide-react";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { brand } from "../constants/content";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const navLinks = [
  { id: 1, name: "Home", url: "#" },
  { id: 2, name: "About", url: "#about" },
  { id: 3, name: "Cooperation", url: "#cooperation" },
  { id: 4, name: "Evaluation Dimension", url: "#eval_dimen" },
];

// Anchor scrolling that works with ScrollSmoother (desktop) and natively (touch)
const goTo = (e, url) => {
  e.preventDefault();
  const s = ScrollSmoother.get();
  if (url === "#") return s ? s.scrollTo(0, true) : window.scrollTo({ top: 0, behavior: "smooth" });
  s ? s.scrollTo(url, true, "top top") : document.querySelector(url)?.scrollIntoView({ behavior: "smooth" });
};

function Navbar({ theme, toggleTheme }) {
  const navRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  
  useEffect(() => {
    const nav = navRef.current;

    const handleScroll = () => {
      if (window.scrollY > 50) {
        gsap.to(nav, {
          backgroundColor: "rgba(1, 27, 54, 0.15)",
          duration: 0.4,
          ease: "power2.out",
        });
      } else {
        gsap.to(nav, {
          backgroundColor: "rgba(1, 27, 54, 0.95)",
          duration: 0.4,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 z-50 w-full bg-[#011b36] backdrop-blur-md px-6 text-white transition-all dark:bg-slate-950 dark:text-white md:px-12"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between border-b border-slate-200 py-3 dark:border-white/10">
        {/* Logo */}
        <a href="#hero" onClick={(e) => goTo(e, "#")} className="flex items-center gap-3 font-semibold">
          {brand.logo && <img src={brand.logo} alt="" className="h-18 w-20 left-0 top-16 z-2" />}
        </a>
        {/* Desktop Navigation */}
        <div className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.url}
              onClick={(e) => goTo(e, link.url)}
              className="nav-animate group relative hidden h-12 items-center overflow-hidden rounded-full px-6 text-sm font-semibold text-slate-950 transition-colors duration-300 hover:bg-gold dark:text-white dark:hover:bg-gold dark:hover:text-slate-950 md:flex"
            >
              <span className="relative flex flex-col overflow-hidden">
                <span className="transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
                  {link.name}
                </span>
                <span className="absolute left-0 top-full transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
                  {link.name}
                </span>
              </span>
            </a>
          ))}
        </div>

        <div className="ml-auto mr-3 flex items-center gap-2 md:ml-0 md:mr-0 md:gap-4">
          <div className="group mx-auto hidden w-11 cursor-pointer items-center gap-2 overflow-hidden rounded-xl bg-slate-800 px-3 py-2 transition-all duration-300 ease-in-out hover:w-40 dark:bg-slate-800 md:flex">
            <Search className="shrink-0 text-gray-300" size={20} />
            <input
              type="search"
              placeholder="Search..."
              className="w-full border-none bg-transparent text-sm text-white opacity-0 outline-none placeholder:text-gray-500 transition-opacity duration-200 delay-100 group-hover:opacity-100 focus:opacity-100 dark:placeholder:text-gray-400"
            />
          </div>

          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            className="nav-animate grid size-11 place-items-center rounded-full border border-slate-300 text-white cursor-pointer transition-all duration-300 hover:border-gold hover:bg-gold/10 hover:text-gold-dark dark:border-white/20 dark:text-white dark:hover:text-gold-light"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <a
            href="#contact"
            onClick={(e) => goTo(e, "#contact")}
            className="nav-animate group relative hidden h-12 items-center overflow-hidden rounded-full bg-gold px-6 text-sm font-semibold text-white transition-colors duration-300 dark:bg-slate-800 dark:text-white dark:hover:bg-gold dark:hover:text-slate-950 md:flex"
          >
            <span className="relative flex flex-col overflow-hidden">
              <span className="transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
                Let's Talk
              </span>
              <span className="absolute left-0 top-full transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
                Let's Talk
              </span>
            </span>
            <ArrowUpRight
              size={16}
              className="ml-2 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </a>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className="nav-animate grid size-11 place-items-center rounded-full border border-slate-300 text-slate-700 transition-all duration-300 hover:border-gold hover:bg-gold/10 dark:border-white/20 dark:text-white lg:hidden"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu bar */}
      <div
          className={`absolute left-0 top-full w-full border-b border-slate-200 bg-white px-6 pb-6 pt-2 transition-all duration-300 dark:border-white/10 dark:bg-slate-950 lg:hidden ${
            menuOpen ? "visible space-y-1 translate-y-0 opacity-100" : "invisible -translate-y-3 opacity-0"
          }`}
        >
          <input
            type="search"
            placeholder="Search..."
            className="mb-2 mt-3 w-full rounded-xl bg-slate-100 px-4 py-3 text-sm text-slate-950 outline-none placeholder:text-gray-500 dark:bg-slate-800 dark:text-white dark:placeholder:text-gray-400"
          />
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.url}
              onClick={(e) => { goTo(e, link.url); setMenuOpen(false); }}
              className="block border-b border-slate-100 py-4 text-base bg-[#011b36] border p-4 rounded-2xl font-semibold transition-colors hover:bg-gold dark:border-white/10 dark:hover:text-gold-light"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => { goTo(e, "#contact"); setMenuOpen(false); }}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-slate-950"
          >
            Let's Talk <ArrowUpRight size={16} />
          </a>
        </div>
    </nav>
  );
}

export default Navbar;
