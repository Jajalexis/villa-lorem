import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import horizonImg from "/horizon.png";

// Grand desert landscape — the reveal
// Wide desert panorama — vast, distant horizon
const DESERT_IMG =
  "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?w=2400&q=90";

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const desertRef = useRef<HTMLDivElement>(null);
  const doorLRef = useRef<HTMLDivElement>(null);
  const doorRRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Start slightly pulled back for wide landscape feel
    gsap.set(desertRef.current, { scale: 0.95 });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=400%",
          scrub: 1.8,
          pin: true,
        },
      });

      // Everything happens together: 0 → 1
      // Doors open
      tl.to(doorLRef.current, {
        rotateY: -120,
        x: "-30%",
        ease: "power2.inOut",
        duration: 1,
      }, 0);
      tl.to(doorRRef.current, {
        rotateY: 120,
        x: "30%",
        ease: "power2.inOut",
        duration: 1,
      }, 0);

      // Desert zooms gently — from wide landscape to closer
      tl.to(desertRef.current, {
        scale: 1.3,
        ease: "power1.out",
        duration: 1,
      }, 0);

      // Title appears at 40% — slides down elegantly
      tl.fromTo(titleRef.current,
        { y: -40, opacity: 0 },
        { y: 0, opacity: 1, ease: "power3.out", duration: 0.25 },
        0.4
      );
      // Subtitle follows
      tl.fromTo(subtitleRef.current,
        { opacity: 0 },
        { opacity: 1, ease: "power2.out", duration: 0.2 },
        0.5
      );
      // Then both fade out gently at the end
      tl.to(titleRef.current, {
        y: 30,
        opacity: 0,
        ease: "power2.in",
        duration: 0.15,
      }, 0.8);
      tl.to(subtitleRef.current, {
        opacity: 0,
        duration: 0.1,
      }, 0.8);

      // Warm glow during opening
      tl.to(glowRef.current, {
        opacity: 1,
        duration: 0.2,
      }, 0.1);
      tl.to(glowRef.current, {
        opacity: 0,
        duration: 0.3,
      }, 0.5);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      {/* Desert landscape — behind the doors */}
      <div
        ref={desertRef}
        className="absolute inset-0 will-change-transform scale-100"
      >
        <img
          src={DESERT_IMG}
          alt="Desert landscape"
          className="w-full h-full object-cover"
        />
        {/* Subtle warm overlay on the desert */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
      </div>

      {/* Warm light glow — appears during door opening */}
      <div
        ref={glowRef}
        className="absolute inset-0 opacity-0 pointer-events-none z-[5]"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at center, rgba(196,149,106,0.12) 0%, transparent 70%)",
        }}
      />

      {/* Door panels — full viewport, solid dark */}
      <div
        className="absolute inset-0 z-10 flex"
        style={{ perspective: "1600px" }}
      >
        {/* Left door */}
        <div
          ref={doorLRef}
          className="w-1/2 h-full will-change-transform relative"
          style={{
            transformOrigin: "left center",
            backfaceVisibility: "hidden",
            background: "linear-gradient(135deg, #161514 0%, #0c0b0a 35%, #141312 65%, #0a0908 100%)",
            boxShadow: "inset -30px 0 60px rgba(0,0,0,0.5), 4px 0 20px rgba(0,0,0,0.6)",
          }}
        >
          {/* Wood grain texture */}
          <div className="absolute inset-0 opacity-[0.04]"
               style={{ backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(196,149,106,0.06) 2px, rgba(196,149,106,0.06) 3px)", backgroundSize: "5px 100%" }} />
          {/* Outer molding — visible border */}
          <div className="absolute top-[6%] left-[8%] right-[3%] bottom-[6%] border-2 border-white/[0.06] rounded-[2px]"
               style={{ boxShadow: "inset 0 0 20px rgba(0,0,0,0.3)" }} />
          {/* Top panel */}
          <div className="absolute top-[10%] left-[12%] right-[7%] bottom-[52%] border border-white/[0.04] rounded-[1px]"
               style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.01) 0%, transparent 100%)" }} />
          {/* Bottom panel */}
          <div className="absolute top-[52%] left-[12%] right-[7%] bottom-[10%] border border-white/[0.04] rounded-[1px]"
               style={{ background: "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.01) 100%)" }} />
          {/* Handle — bigger, more visible */}
          <div className="absolute right-[7%] top-[44%] flex flex-col items-center gap-2">
            <div className="w-[6px] h-24 rounded-full"
                 style={{ background: "linear-gradient(180deg, rgba(196,149,106,0.4), rgba(196,149,106,0.15))", boxShadow: "0 0 8px rgba(196,149,106,0.1)" }} />
            <div className="w-5 h-5 rounded-full border-[1.5px] border-accent/25" />
          </div>
          {/* Center light crack */}
          <div className="absolute right-0 top-[5%] w-[2px] h-[90%] rounded-full"
               style={{ background: "linear-gradient(180deg, transparent, rgba(196,149,106,0.12) 30%, rgba(196,149,106,0.15) 50%, rgba(196,149,106,0.12) 70%, transparent)" }} />
        </div>

        {/* Right door */}
        <div
          ref={doorRRef}
          className="w-1/2 h-full will-change-transform relative"
          style={{
            transformOrigin: "right center",
            backfaceVisibility: "hidden",
            background: "linear-gradient(225deg, #161514 0%, #0c0b0a 35%, #141312 65%, #0a0908 100%)",
            boxShadow: "inset 30px 0 60px rgba(0,0,0,0.5), -4px 0 20px rgba(0,0,0,0.6)",
          }}
        >
          <div className="absolute inset-0 opacity-[0.04]"
               style={{ backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(196,149,106,0.06) 2px, rgba(196,149,106,0.06) 3px)", backgroundSize: "5px 100%" }} />
          <div className="absolute top-[6%] right-[8%] left-[3%] bottom-[6%] border-2 border-white/[0.06] rounded-[2px]"
               style={{ boxShadow: "inset 0 0 20px rgba(0,0,0,0.3)" }} />
          <div className="absolute top-[10%] right-[12%] left-[7%] bottom-[52%] border border-white/[0.04] rounded-[1px]"
               style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.01) 0%, transparent 100%)" }} />
          <div className="absolute top-[52%] right-[12%] left-[7%] bottom-[10%] border border-white/[0.04] rounded-[1px]"
               style={{ background: "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.01) 100%)" }} />
          <div className="absolute left-[7%] top-[44%] flex flex-col items-center gap-2">
            <div className="w-[6px] h-24 rounded-full"
                 style={{ background: "linear-gradient(180deg, rgba(196,149,106,0.4), rgba(196,149,106,0.15))", boxShadow: "0 0 8px rgba(196,149,106,0.1)" }} />
            <div className="w-5 h-5 rounded-full border-[1.5px] border-accent/25" />
          </div>
          <div className="absolute left-0 top-[5%] w-[2px] h-[90%] rounded-full"
               style={{ background: "linear-gradient(180deg, transparent, rgba(196,149,106,0.12) 30%, rgba(196,149,106,0.15) 50%, rgba(196,149,106,0.12) 70%, transparent)" }} />
        </div>
      </div>

      {/* Title — centered on top of doors */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
        <div ref={titleRef} className="will-change-transform opacity-0 relative" style={{ width: "min(690px, 80vw)" }}>
          <img
            src={horizonImg}
            alt="HORIZON"
            className="w-full h-auto block"
          />
          <p className="absolute right-0 font-thin text-[72px] tracking-[8px] text-white leading-none" style={{ bottom: "-24px" }}>
            ALULA
          </p>
        </div>
        <div ref={subtitleRef} className="mt-8 opacity-0">
          <div className="w-10 h-px bg-white/30 mx-auto mb-4" />
          <p className="text-[11px] tracking-[0.5em] uppercase text-white/50 font-light">
            Roma — Collection Permanente
          </p>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 animate-pulse">
        <span className="text-[10px] tracking-[0.3em] uppercase text-text-muted/50 font-light">
          Scroll
        </span>
        <div className="w-px h-6 bg-gradient-to-b from-accent/30 to-transparent" />
      </div>
    </section>
  );
}
