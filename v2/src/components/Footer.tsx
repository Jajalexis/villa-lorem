import { useEffect, useRef } from "react";
import gsap from "gsap";

const MARQUEE_TEXT =
  "VILLA M\u00c9DICIS \u2022 ROMA \u2022 ARTE CONTEMPORANEA \u2022 ";
const LINKS = ["Instagram", "Facebook", "Presse", "M\u00e9c\u00e9nat"];

export default function Footer() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        duration: 30,
        ease: "none",
        repeat: -1,
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <footer id="contact" className="relative bg-bg overflow-hidden">
      {/* Marquee — subtle, behind content */}
      <div className="overflow-hidden py-16 border-t border-stroke">
        <div ref={marqueeRef} className="flex whitespace-nowrap will-change-transform">
          {Array.from({ length: 10 }).map((_, i) => (
            <span
              key={i}
              className="text-7xl lg:text-[120px] font-bold text-text-primary/[0.03] mx-4 select-none"
            >
              {MARQUEE_TEXT}
            </span>
          ))}
        </div>
      </div>

      {/* Main footer content */}
      <div className="max-w-[1440px] mx-auto pb-16" style={{ paddingLeft: 64, paddingRight: 64 }}>
        {/* VM watermark */}
        <div className="mb-12">
          <span className="font-display italic text-[120px] leading-none text-text-primary/[0.04] select-none">
            VM
          </span>
        </div>

        {/* 3-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          {/* Address */}
          <div>
            <span className="text-[10px] font-semibold tracking-[3px] text-accent uppercase block mb-4">
              Adresse
            </span>
            <p className="text-sm font-light text-text-muted leading-relaxed">
              Viale della Trinit&agrave; dei Monti, 1
              <br />
              00187 Roma, Italia
            </p>
          </div>

          {/* Hours */}
          <div>
            <span className="text-[10px] font-semibold tracking-[3px] text-accent uppercase block mb-4">
              Horaires
            </span>
            <p className="text-sm font-light text-text-muted leading-relaxed">
              Mardi — Dimanche
              <br />
              10h00 — 19h00
            </p>
          </div>

          {/* Contact */}
          <div>
            <span className="text-[10px] font-semibold tracking-[3px] text-accent uppercase block mb-4">
              Contact
            </span>
            <a
              href="mailto:visites@villamedicis.it"
              className="text-sm font-light text-text-muted hover:text-accent transition-colors duration-300 block"
            >
              visites@villamedicis.it ↗
            </a>
            <p className="text-sm font-light text-text-muted mt-1">
              +39 06 6761 1
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-stroke flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-8">
            {LINKS.map((link) => (
              <a
                key={link}
                href="#"
                className="text-[11px] text-text-muted hover:text-text-primary transition-colors duration-300"
              >
                {link}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-green-dot animate-pulse" />
            <span className="text-[11px] text-text-muted">
              Actuellement ouvert
            </span>
          </div>
        </div>

        <div className="text-center mt-12">
          <span className="text-[11px] text-text-muted/40">
            &copy; 2026 Villa M&eacute;dicis — Tous droits r&eacute;serv&eacute;s
          </span>
        </div>
      </div>
    </footer>
  );
}
