"use client";

import { useRef, useEffect } from "react";

export default function Avatar() {
  const boxRef = useRef(null);
  const topImgRef = useRef(null); // professional (default, masked)

  const target = useRef({ x: 160, y: 200 });
  const current = useRef({ x: 160, y: 200 });
  const reveal = useRef(0);
  const targetReveal = useRef(0);
  const raf = useRef(null);

  const RADIUS = 100;  // circle size
  const SOFT = 16;     // edge softness (0 = sharp)

  useEffect(() => {
    const box = boxRef.current;
    const img = topImgRef.current;

    const setMask = () => {
      const { x, y } = current.current;
      const r = RADIUS * reveal.current;
      const inner = Math.max(0, r - SOFT);
      // hole in the TOP (professional) image -> reveals normal underneath
      const mask = `radial-gradient(circle ${r}px at ${x}px ${y}px, transparent ${inner}px, #000 ${r}px)`;
      img.style.webkitMaskImage = mask;
      img.style.maskImage = mask;
    };

    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * 0.2;
      current.current.y += (target.current.y - current.current.y) * 0.2;
      reveal.current += (targetReveal.current - reveal.current) * 0.14;
      setMask();
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    const onMove = (e) => {
      const b = box.getBoundingClientRect();
      target.current = { x: e.clientX - b.left, y: e.clientY - b.top };
    };
    const onEnter = (e) => {
      const b = box.getBoundingClientRect();
      current.current = { x: e.clientX - b.left, y: e.clientY - b.top };
      target.current = { ...current.current };
      targetReveal.current = 1;
    };
    const onLeave = () => { targetReveal.current = 0; };

    box.addEventListener("mousemove", onMove);
    box.addEventListener("mouseenter", onEnter);
    box.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf.current);
      box.removeEventListener("mousemove", onMove);
      box.removeEventListener("mouseenter", onEnter);
      box.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const imgStyle = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    userSelect: "none",
  };

  return (
    <div
      ref={boxRef}
      style={{
        position: "relative",
        width: 320,
        height: 400,
        borderRadius: 20,
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,.08)",
        boxShadow: "0 30px 80px rgba(0,0,0,.45)",
        cursor: "none",
      }}
    >
      {/* BOTTOM layer = NORMAL photo (gets revealed under the circle) */}
      <img src="/normal.png" alt="Tanishka Gupta" draggable={false} style={imgStyle} />

      {/* TOP layer = PROFESSIONAL photo (default visible, circle cuts a hole) */}
      <img ref={topImgRef} src="/professional.png" alt="Tanishka Gupta" draggable={false} style={imgStyle} />
    </div>
  );
}