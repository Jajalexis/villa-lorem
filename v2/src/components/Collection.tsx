import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WORKS = [
  {
    img: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80",
    num: "I", title: "L'Éternel Retour", tech: "Huile sur toile, 1923", cat: "Peinture",
  },
  {
    img: "https://images.unsplash.com/photo-1561214078-f3247647fc5e?w=800&q=80",
    num: "II", title: "Nocturne Romain", tech: "Bronze patiné, 1967", cat: "Sculpture",
  },
  {
    img: "https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=800&q=80",
    num: "III", title: "Fragments d'Oubli", tech: "Installation mixte, 2019", cat: "Installation",
  },
  {
    img: "https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?w=800&q=80",
    num: "IV", title: "Arco di Luce", tech: "Marbre de Carrare, 1845", cat: "Sculpture",
  },
  {
    img: "https://images.unsplash.com/photo-1574182245530-967d9b3831af?w=800&q=80",
    num: "V", title: "Lumière Fossile", tech: "Photographie argentique, 2022", cat: "Photo",
  },
];

export default function Collection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current!;
    const scrollWidth = track.scrollWidth - track.clientWidth;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: -scrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${scrollWidth}`,
          scrub: 1,
          pin: true,
        },
        onUpdate: function () {
          const progress = this.progress();
          if (progressRef.current) {
            progressRef.current.style.width = `${progress * 100}%`;
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="galerie" className="relative h-screen w-full overflow-hidden bg-bg">
      <div className="flex flex-col justify-center h-full">
        <div className="mb-8" style={{ paddingLeft: 64, paddingRight: 64 }}>
          <span className="text-[11px] font-semibold tracking-[4px] text-accent uppercase">
            La Collection
          </span>
        </div>

        <div ref={trackRef} className="flex gap-8 will-change-transform" style={{ paddingLeft: 64, paddingRight: 64 }}>
          {WORKS.map((work, i) => (
            <div
              key={i}
              className="group relative flex-none w-[480px] aspect-[4/3] rounded-lg overflow-hidden cursor-pointer"
            >
              <img
                src={work.img}
                alt={work.title}
                className="w-full h-full object-cover grayscale brightness-[0.7] group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-[1.02] transition-all duration-700"
                loading="lazy"
              />
              <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 text-[9px] font-semibold text-text-muted tracking-wide">
                {work.cat}
              </span>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
                <span className="font-display italic text-4xl text-accent/60">
                  {work.num}.
                </span>
                <h3 className="text-lg font-semibold text-text-primary mt-1">
                  {work.title}
                </h3>
                <p className="text-xs text-text-muted mt-1">{work.tech}</p>
              </div>
              <div className="absolute inset-0 rounded-lg border border-transparent group-hover:border-accent/30 transition-all duration-500 pointer-events-none" />
            </div>
          ))}
        </div>

        <div className="mt-10" style={{ paddingLeft: 64, paddingRight: 64 }}>
          <div className="h-[2px] bg-stroke rounded-full overflow-hidden">
            <div
              ref={progressRef}
              className="h-full rounded-full transition-none"
              style={{
                background: "linear-gradient(90deg, #C4956A, #D4A87A)",
                width: "0%",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
