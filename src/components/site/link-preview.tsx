import { createPortal } from "react-dom";
import { useEffect, useRef, useState, type ReactNode } from "react";

const W = 320;
const H = 200;
const MAX_TILT = 8;

/** Link that shows a screenshot preview trailing the cursor (eased) and tilting with its x position. */
export function LinkPreview({ href, src, className, size, children }: { href: string; src: string; className?: string; size?: number; children: ReactNode }) {
  const w = size ?? W;
  const h = size ?? H;
  const [active, setActive] = useState(false);
  const card = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0, rot: 0 });
  const pos = useRef<{ x: number; y: number; rot: number } | null>(null);
  const raf = useRef(0);

  const tick = () => {
    const el = card.current;
    const t = target.current;
    if (!el) return;
    const p = (pos.current ??= { ...t });
    p.x += (t.x - p.x) * 0.15;
    p.y += (t.y - p.y) * 0.15;
    p.rot += (t.rot - p.rot) * 0.15;
    el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) rotate(${p.rot}deg)`;
    raf.current = requestAnimationFrame(tick);
  };

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const move = (e: React.PointerEvent) => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.current = {
      x: e.clientX - w / 2,
      y: e.clientY - h / 2,
      rot: reduce ? 0 : ((e.clientX / window.innerWidth) * 2 - 1) * MAX_TILT,
    };
  };

  const enter = (e: React.PointerEvent) => {
    move(e);
    pos.current = null;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(tick);
    setActive(true);
  };

  const leave = () => {
    setActive(false);
    // stop the loop once the fade-out has finished
    window.setTimeout(() => !card.current?.hasAttribute("data-active") && cancelAnimationFrame(raf.current), 300);
  };

  return (
    <>
      <a href={href} target="_blank" rel="noopener noreferrer" className={className} onPointerEnter={enter} onPointerMove={move} onPointerLeave={leave}>
        {children}
      </a>
      {/* portaled: an animated ancestor's transform would otherwise become the fixed card's containing block */}
      {createPortal(
        <div ref={card} className="link-preview" data-active={active || undefined} style={{ width: w, height: h }} aria-hidden>
          <img src={src} alt="" />
        </div>,
        document.body,
      )}
    </>
  );
}
