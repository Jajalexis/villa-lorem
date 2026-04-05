import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SALLES = [
  {
    label: "Salle I",
    title: "L'Antiquité",
    text: "Les vestiges de Rome et de la Grèce antique, fondation de notre regard sur la beauté. Chaque fragment raconte un monde disparu.",
  },
  {
    label: "Salle II",
    title: "La Renaissance",
    text: "Le renouveau de la pensée et de la forme. Quand l'artiste devient démiurge et la toile, un miroir du divin.",
  },
  {
    label: "Salle III",
    title: "Le Contemporain",
    text: "L'art d'aujourd'hui, sans frontières ni certitudes. Des gestes radicaux qui interrogent notre rapport au réel.",
  },
];

// Italian villas, classical art, Mediterranean landscapes
const PHOTOS_LEFT = [
  "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=600&q=80",
  "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80",
  "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80",
];
const PHOTOS_RIGHT = [
  "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600&q=80",
  "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=600&q=80",
  "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=600&q=80",
];

export default function ParallaxGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const colLeftRef = useRef<HTMLDivElement>(null);
  const colRightRef = useRef<HTMLDivElement>(null);
  const [activeSalle, setActiveSalle] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: textRef.current,
        onUpdate: (self) => {
          const idx = Math.min(2, Math.floor(self.progress * 3));
          setActiveSalle(idx);
        },
      });

      // Only vertical parallax — no horizontal shift
      gsap.to(colLeftRef.current, {
        y: "-20%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(colRightRef.current, {
        y: "-40%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[250vh] bg-bg overflow-hidden">
      <div className="flex h-full max-w-[1440px] mx-auto">
        {/* Left — pinned text — all 3 visible, active at 100%, others at 30% */}
        <div ref={textRef} className="w-[42%] h-screen flex items-center pl-16 pr-8">
          <div className="flex flex-col gap-10">
            {SALLES.map((salle, i) => (
              <div
                key={i}
                className="transition-all duration-700"
                style={{ opacity: activeSalle === i ? 1 : 0.3 }}
              >
                <span className="text-[11px] font-semibold tracking-[4px] text-accent uppercase">
                  {salle.label}
                </span>
                <h2 className="font-display italic text-3xl lg:text-5xl text-text-primary mt-3 leading-tight">
                  {salle.title}
                </h2>
                <div
                  className="overflow-hidden transition-all duration-700"
                  style={{
                    maxHeight: activeSalle === i ? "200px" : "0px",
                    opacity: activeSalle === i ? 1 : 0,
                  }}
                >
                  <p className="text-sm lg:text-[15px] font-light text-text-muted leading-relaxed mt-4 max-w-sm">
                    {salle.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — parallax photo grid — fixed position, only vertical movement */}
        <div className="w-[58%] flex gap-5 pt-24 pr-16 overflow-hidden">
          <div ref={colLeftRef} className="flex flex-col gap-6 will-change-transform flex-1">
            {PHOTOS_LEFT.map((src, i) => (
              <div
                key={i}
                className="aspect-[3/4] rounded-lg overflow-hidden shadow-xl"
                style={{ transform: `rotate(${i % 2 === 0 ? "-1.5deg" : "1deg"})` }}
              >
                <img
                  src={src}
                  alt=""
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          <div ref={colRightRef} className="flex flex-col gap-6 mt-[120px] will-change-transform flex-1">
            {PHOTOS_RIGHT.map((src, i) => (
              <div
                key={i}
                className="aspect-[3/4] rounded-lg overflow-hidden shadow-xl"
                style={{ transform: `rotate(${i % 2 === 0 ? "1.5deg" : "-1deg"})` }}
              >
                <img
                  src={src}
                  alt=""
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
