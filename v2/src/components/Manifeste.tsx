import { useCountUp } from "../hooks/useCountUp";

const STATS = [
  { target: 1947, label: "Année de fondation", format: (n: number) => String(n) },
  { target: 3200, label: "Œuvres en collection", format: (n: number) => n.toLocaleString("fr-FR") },
  { target: 180, label: "Artistes représentés", format: (n: number) => `${n}+` },
];

function StatItem({ target, label, format }: (typeof STATS)[0]) {
  const { ref, value } = useCountUp(target);
  return (
    <div className="flex flex-col gap-2">
      <span ref={ref} className="text-6xl font-light text-text-primary tabular-nums">
        {format(value)}
      </span>
      <span className="text-sm text-text-muted">{label}</span>
      <div className="w-full h-px bg-stroke mt-4" />
    </div>
  );
}

export default function Manifeste() {
  return (
    <section className="bg-surface py-40 lg:py-56">
      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-20 lg:gap-32 items-start" style={{ paddingLeft: 64, paddingRight: 64 }}>
        {/* Quote */}
        <div className="lg:w-1/2">
          <div className="w-12 h-px bg-accent mb-8" />
          <blockquote className="font-display italic text-4xl lg:text-5xl text-text-primary leading-tight">
            L'art est ce qui reste
            <br />
            quand tout a été dit.
          </blockquote>
        </div>

        {/* Stats */}
        <div className="lg:w-1/2 flex flex-col gap-20">
          {STATS.map((stat) => (
            <StatItem key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
