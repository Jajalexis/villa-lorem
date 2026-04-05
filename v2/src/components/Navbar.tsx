import { useEffect, useState } from "react";

const LINKS = ["Galerie", "Expositions", "Résidences", "Accès"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-16 h-[72px] transition-all duration-500 ${
        scrolled
          ? "bg-bg/90 backdrop-blur-xl border-b border-stroke"
          : "bg-transparent"
      }`}
    >
      <a href="#" className="font-display italic text-xl text-text-primary">
        VM
      </a>

      <ul className="hidden lg:flex items-center gap-10">
        {LINKS.map((link) => (
          <li key={link}>
            <a
              href={`#${link.toLowerCase()}`}
              className="text-xs font-light tracking-wide text-text-muted hover:text-text-primary transition-colors duration-300"
            >
              {link}
            </a>
          </li>
        ))}
      </ul>

      <a
        href="#contact"
        className="text-[11px] font-medium tracking-wide text-text-primary px-5 py-2.5 rounded-lg border border-stroke hover:border-accent/40 hover:bg-surface transition-all duration-300"
      >
        Réserver une visite ↗
      </a>
    </nav>
  );
}
