import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const EXPOS = [
  {
    date: "12 — 28",
    month: "JANVIER",
    title: "Dialoghi Silenziosi",
    artist: "Marco Vestri",
    img: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80",
  },
  {
    date: "03 — 19",
    month: "MARS",
    title: "Corpo e Pietra",
    artist: "Elena Morandi",
    img: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=600&q=80",
  },
  {
    date: "21 — 07",
    month: "JUIN",
    title: "Luce Nera",
    artist: "Yuki Tanaka",
    img: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600&q=80",
  },
];

function ExpoCard({ expo }: { expo: (typeof EXPOS)[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 200, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 200, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current!.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - 120);
    mouseY.set(e.clientY - rect.top - 90);
  };

  return (
    <div
      ref={cardRef}
      className="group relative bg-surface border border-stroke rounded-lg p-8 flex flex-col justify-end min-h-[520px] cursor-pointer overflow-hidden transition-all duration-300 hover:border-accent/20 hover:bg-surface-light"
      onMouseMove={handleMouseMove}
    >
      {/* Watermark date */}
      <span className="absolute top-8 left-8 font-display italic text-[80px] text-text-muted/[0.06] leading-none pointer-events-none select-none">
        {expo.date}
      </span>

      {/* Hover preview image */}
      <motion.div
        className="absolute w-[240px] h-[180px] rounded-lg overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 shadow-2xl"
        style={{ left: springX, top: springY }}
      >
        <img
          src={expo.img}
          alt={expo.title}
          className="w-full h-full object-cover"
        />
      </motion.div>

      <div className="relative z-20 mt-auto">
        <h3 className="text-2xl font-semibold text-text-primary group-hover:text-accent transition-colors duration-300">
          {expo.title}
        </h3>
        <p className="text-sm text-text-muted mt-2">{expo.artist}</p>
        <span className="text-[10px] font-semibold tracking-[3px] text-accent mt-4 block">
          {expo.month}
        </span>
      </div>
    </div>
  );
}

export default function Expositions() {
  return (
    <section id="expositions" className="bg-bg py-32 lg:py-40">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
        <span className="text-[11px] font-semibold tracking-[4px] text-accent uppercase">
          Expositions à venir
        </span>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-12">
          {EXPOS.map((expo) => (
            <ExpoCard key={expo.title} expo={expo} />
          ))}
        </div>
      </div>
    </section>
  );
}
