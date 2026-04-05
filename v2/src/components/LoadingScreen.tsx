import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WORDS = ["Villa", "Médicis", "Roma"];
const DURATION = 2800;

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const start = performance.now();
    let frame: number;
    function tick(now: number) {
      const progress = Math.min((now - start) / DURATION, 1);
      setCount(Math.round(progress * 100));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setDone(true);
        setTimeout(onComplete, 600);
      }
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [onComplete]);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((i) => (i + 1) % WORDS.length);
    }, DURATION / WORDS.length);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[200] bg-bg flex flex-col items-center justify-center"
      animate={{ opacity: done ? 0 : 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Counter */}
      <div className="font-body text-[120px] font-light text-text-primary leading-none tabular-nums">
        {String(count).padStart(3, "0")}
      </div>

      {/* Cycling word */}
      <div className="h-16 flex items-center justify-center overflow-hidden mt-4">
        <AnimatePresence mode="wait">
          <motion.span
            key={wordIndex}
            className="font-display italic text-5xl text-text-muted"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {WORDS[wordIndex]}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Bottom left */}
      <div className="absolute bottom-12 left-16 text-xs text-text-muted tracking-[0.4em] uppercase">
        Since MCMXLVII
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-64">
        <div className="h-[2px] bg-stroke rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{
              background: "linear-gradient(90deg, #C4956A, #D4A87A)",
              boxShadow: "0 0 12px rgba(196,149,106,0.4)",
            }}
            animate={{ width: `${count}%` }}
            transition={{ duration: 0.05 }}
          />
        </div>
      </div>
    </motion.div>
  );
}
