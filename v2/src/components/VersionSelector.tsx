import { useState, useRef, useEffect } from "react";

export default function VersionSelector() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return (
    <div ref={ref} className={`vs ${open ? "vs--open" : ""}`}>
      <button className="vs__btn" onClick={() => setOpen(!open)}>
        <span className="vs__label">V2</span>
        <span className="vs__chevron">›</span>
      </button>
      <div className="vs__dropdown">
        <a href="../v1/index.html" className="vs__option">
          <span className="vs__dot" />
          <span className="vs__text">V1 — Villa Lorem</span>
        </a>
        <div className="vs__option vs__option--active">
          <span className="vs__dot" />
          <span className="vs__text">V2 — Nouvelle proposition</span>
        </div>
      </div>
    </div>
  );
}
