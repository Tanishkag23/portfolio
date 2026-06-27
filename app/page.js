"use client";

import { useState, useEffect, useRef } from "react";
import {
  Code,
  Link as LinkIcon,
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
  Download,
  Menu,
  X,
} from "lucide-react";
import Avatar from "./avatar";

// ── Data ───────────────────────────────────────────────────────────────
const NAV = ["About", "Skills", "Projects", "Education", "Contact"];

const PROJECTS = [
  {
    n: "01",
    title: "Deep Fake Image Detection",
    tagline: "AI that spots fake & manipulated images",
    desc: "An AI-powered system that identifies manipulated and AI-generated images using deep learning.",
    tags: ["Python", "TensorFlow", "Keras", "Deep Learning"],
    link: "https://github.com/Tanishkag23",
  },
  {
    n: "02",
    title: "Email Lite",
    tagline: "Encrypted email, end to end",
    desc: "A secure email client with end-to-end encryption built on modern cryptographic algorithms.",
    tags: ["Python", "RSA", "AES", "SHA-256", "JavaScript"],
    link: "https://github.com/Tanishkag23",
  },
  {
    n: "03",
    title: "Smart City Algorithm Engine",
    tagline: "Optimizing urban resources with graphs",
    desc: "An optimization engine improving resource allocation and infrastructure planning via graph algorithms.",
    tags: ["C", "Algorithms", "Data Structures"],
    link: "https://github.com/Tanishkag23",
  },
  {
    n: "04",
    title: "Hotel Management System",
    tagline: "Bookings, billing & records in one",
    desc: "A modular hotel application with room booking, customer records, billing, and persistent storage.",
    tags: ["C", "File Handling", "Data Structures"],
    link: "https://github.com/Tanishkag23",
  },
  {
    n: "05",
    title: "Expense Tracker",
    tagline: "Track & categorize every rupee",
    desc: "A command-line expense manager with transaction categorization, reporting, and secure storage.",
    tags: ["C", "File Handling"],
    link: "https://github.com/Tanishkag23",
  },
];

const SKILLS = [
  { group: "Languages", items: ["Python", "C", "JavaScript"] },
  { group: "AI & ML", items: ["TensorFlow", "Deep Learning", "Machine Learning", "Computer Vision"] },
  { group: "Backend", items: ["Django", "Node.js", "Express.js", "Socket.IO"] },
  { group: "Frontend", items: ["HTML", "CSS", "JavaScript"] },
  { group: "Data & Cloud", items: ["PostgreSQL", "AWS", "Redis"] },
  { group: "Tools", items: ["Git", "GitHub", "Docker", "VS Code"] },
];

const STATS = [
  { v: "100+", l: "DSA problems solved" },
  { v: "5+", l: "Shipped projects" },
  { v: "AI-ML", l: "B.Tech specialization" },
];

// ── Helpers ───────────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ob = new IntersectionObserver(
      ([e]) => e.isIntersecting && setShown(true),
      { threshold: 0.15 }
    );
    ob.observe(el);
    return () => ob.disconnect();
  }, []);
  return [ref, shown];
}

function Reveal({ children, delay = 0 }) {
  const [ref, shown] = useReveal();
  return (
    <div
      ref={ref}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(24px)",
        transition: `opacity .7s ease ${delay}s, transform .7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ── App ───────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (id) => {
    setMenu(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const C = {
    bg: "#0a0a12",
    panel: "#11111d",
    line: "rgba(255,255,255,.08)",
    text: "#e8e8f0",
    dim: "#9a9ab0",
    accentA: "#6366f1",
    accentB: "#a855f7",
  };

  const grad = `linear-gradient(135deg, ${C.accentA}, ${C.accentB})`;

  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: "'Inter', system-ui, sans-serif", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; }
        html { scroll-behavior: smooth; }
        a { color: inherit; text-decoration: none; }
        ::selection { background: ${C.accentB}; color: #fff; }
        .display { font-family: 'Space Grotesk', sans-serif; }
        .pcard:hover { border-color: ${C.accentB} !important; transform: translateY(-4px); }
        .pcard:hover .arrow { opacity: 1; transform: translate(0,0); }
        .navlink:hover { color: ${C.text} !important; }
        .btn:hover { filter: brightness(1.1); transform: translateY(-2px); }
        .ghost:hover { border-color: ${C.accentB} !important; color: #fff !important; }
        .chip:hover { border-color: ${C.accentA} !important; }
        @media (prefers-reduced-motion: reduce) { * { transition: none !important; animation: none !important; } }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
      `}</style>

      {/* Nav */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "16px clamp(20px,5vw,64px)",
        background: scrolled ? "rgba(10,10,18,.8)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? `1px solid ${C.line}` : "1px solid transparent",
        transition: "all .3s",
      }}>
        <span className="display" style={{ fontWeight: 700, fontSize: 18, letterSpacing: "-.02em" }}>
          TG<span style={{ color: C.accentB }}>.</span>
        </span>
        <div style={{ display: "flex", gap: 32 }} className="desktop-nav">
          {NAV.map((n) => (
            <button key={n} onClick={() => go(n.toLowerCase())} className="navlink"
              style={{ background: "none", border: "none", color: C.dim, cursor: "pointer", fontSize: 14, fontWeight: 500, transition: "color .2s" }}>
              {n}
            </button>
          ))}
        </div>
        <button onClick={() => setMenu(!menu)} aria-label="Menu"
          style={{ background: "none", border: "none", color: C.text, cursor: "pointer", display: "none" }} className="mobile-toggle">
          {menu ? <X size={22} /> : <Menu size={22} />}
        </button>
        <style>{`
          @media (max-width: 720px){ .desktop-nav{display:none!important} .mobile-toggle{display:block!important} }
        `}</style>
      </nav>

      {menu && (
        <div style={{ position: "fixed", inset: 0, zIndex: 49, background: "rgba(10,10,18,.97)", backdropFilter: "blur(8px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 28 }}>
          {NAV.map((n) => (
            <button key={n} onClick={() => go(n.toLowerCase())} className="display"
              style={{ background: "none", border: "none", color: C.text, fontSize: 28, fontWeight: 600, cursor: "pointer" }}>
              {n}
            </button>
          ))}
        </div>
      )}

      {/* Hero */}
      <header style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", padding: "100px clamp(20px,5vw,64px) 60px" }}>
        <div aria-hidden style={{
          position: "absolute", top: "10%", right: "-5%", width: 480, height: 480, borderRadius: "50%",
          background: grad, filter: "blur(120px)", opacity: 0.25, animation: "float 8s ease-in-out infinite",
        }} />
        <div className="hero-grid" style={{ position: "relative", width: "100%", maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 48, alignItems: "center" }}>
          {/* Left: text */}
          <div>
            <Reveal>
              <p style={{ color: C.accentB, fontWeight: 600, fontSize: 14, letterSpacing: ".18em", textTransform: "uppercase", marginBottom: 20 }}>
                AI/ML Engineer · Full-Stack Developer
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="display" style={{ fontSize: "clamp(44px,7vw,88px)", fontWeight: 700, lineHeight: 1.02, letterSpacing: "-.03em" }}>
                Tanishka<br />
                <span style={{ background: grad, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>Gupta</span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p style={{ color: C.dim, fontSize: "clamp(16px,2.2vw,21px)", maxWidth: 560, marginTop: 26, lineHeight: 1.6 }}>
                Building intelligent solutions through AI, secure software systems, and scalable web applications.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div style={{ display: "flex", gap: 14, marginTop: 38, flexWrap: "wrap" }}>
                <button className="btn" onClick={() => go("projects")}
                  style={{ background: grad, color: "#fff", border: "none", borderRadius: 10, padding: "14px 28px", fontWeight: 600, fontSize: 15, cursor: "pointer", transition: "all .2s" }}>
                  View work
                </button>
                <a className="ghost" href="/resume.pdf" download
                  style={{ display: "inline-flex", alignItems: "center", gap: 8, border: `1px solid ${C.line}`, color: C.dim, borderRadius: 10, padding: "14px 24px", fontWeight: 600, fontSize: 15, transition: "all .2s" }}>
                  <Download size={16} /> Resume
                </a>
              </div>
            </Reveal>
            <Reveal delay={0.4}>
              <p style={{ display: "inline-flex", alignItems: "center", gap: 7, color: C.dim, fontSize: 14, marginTop: 40 }}>
                <MapPin size={15} color={C.accentB} /> Dehradun, India
              </p>
            </Reveal>
          </div>

          {/* Right: avatar */}
          <Reveal delay={0.3}>
            <div className="hero-avatar" style={{ display: "flex", justifyContent: "center" }}>
              <Avatar />
            </div>
          </Reveal>
        </div>
        <style>{`
          @media (max-width: 860px){
            .hero-grid{ grid-template-columns: 1fr !important; gap: 40px !important; }
            .hero-avatar{ order: -1; }
          }
        `}</style>
      </header>

      {/* About */}
      <section id="about" style={{ padding: "clamp(60px,10vw,120px) clamp(20px,5vw,64px)", maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <SectionLabel C={C}>About</SectionLabel>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 60, alignItems: "start" }} className="about-grid">
          <Reveal delay={0.1}>
            <p style={{ fontSize: "clamp(18px,2.4vw,24px)", lineHeight: 1.6, fontWeight: 300 }}>
              I'm a B.Tech Computer Science <span style={{ color: C.accentB }}>(AI-ML)</span> student at Graphic Era University with a passion for building impactful technology. My interests span Artificial Intelligence, Machine Learning, Full-Stack Development, and System Design — and I enjoy solving real-world problems through software while continuously exploring emerging tech.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {STATS.map((s) => (
                <div key={s.l} style={{ borderLeft: `2px solid ${C.accentB}`, paddingLeft: 18 }}>
                  <div className="display" style={{ fontSize: 32, fontWeight: 700 }}>{s.v}</div>
                  <div style={{ color: C.dim, fontSize: 14 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
        <style>{`@media (max-width:720px){.about-grid{grid-template-columns:1fr!important;gap:36px!important}}`}</style>
      </section>

      {/* Skills */}
      <section id="skills" style={{ padding: "clamp(60px,10vw,120px) clamp(20px,5vw,64px)", maxWidth: 1100, margin: "0 auto" }}>
        <Reveal><SectionLabel C={C}>Skills</SectionLabel></Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 18 }}>
          {SKILLS.map((s, i) => (
            <Reveal key={s.group} delay={i * 0.05}>
              <div style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 14, padding: 24, height: "100%" }}>
                <h3 className="display" style={{ fontSize: 15, color: C.accentB, marginBottom: 16, letterSpacing: ".04em" }}>{s.group}</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {s.items.map((it) => (
                    <span key={it} className="chip" style={{ border: `1px solid ${C.line}`, borderRadius: 8, padding: "6px 12px", fontSize: 13, color: C.text, transition: "border-color .2s" }}>{it}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section id="projects" style={{ padding: "clamp(60px,10vw,120px) clamp(20px,5vw,64px)", maxWidth: 1100, margin: "0 auto" }}>
        <Reveal><SectionLabel C={C}>Featured Projects</SectionLabel></Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
          {PROJECTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05}>
              <FlipCard p={p} C={C} grad={grad} />
            </Reveal>
          ))}
        </div>
        <p style={{ color: C.dim, fontSize: 13, marginTop: 20, textAlign: "center" }}>
          Click a card to see details
        </p>
      </section>

      {/* Education */}
      <section id="education" style={{ padding: "clamp(60px,10vw,120px) clamp(20px,5vw,64px)", maxWidth: 1100, margin: "0 auto" }}>
        <Reveal><SectionLabel C={C}>Education</SectionLabel></Reveal>
        <Reveal delay={0.1}>
          <div style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 16, padding: "32px clamp(20px,3vw,40px)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
              <div>
                <h3 className="display" style={{ fontSize: 22, fontWeight: 600 }}>B.Tech, Computer Science (AI-ML)</h3>
                <p style={{ color: C.dim, fontSize: 15, marginTop: 6 }}>Graphic Era University, Dehradun</p>
              </div>
              <span style={{ color: C.accentB, fontSize: 14, fontWeight: 600, alignSelf: "flex-start" }}>Pursuing</span>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Contact */}
      <section id="contact" style={{ padding: "clamp(60px,10vw,120px) clamp(20px,5vw,64px)", maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <h2 className="display" style={{ fontSize: "clamp(32px,6vw,60px)", fontWeight: 700, letterSpacing: "-.03em", marginBottom: 16 }}>
            Let's build something<br /><span style={{ background: grad, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>together.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p style={{ color: C.dim, fontSize: 17, maxWidth: 480, marginBottom: 32 }}>
            Open to internships, collaborations, and interesting problems. Reach out anytime.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
            <ContactBtn C={C} grad={grad} href="mailto:tanishkag2006@gmail.com" icon={<Mail size={16} />} primary>tanishkag2006@gmail.com</ContactBtn>
            <ContactBtn C={C} href="tel:+919837379214" icon={<Phone size={16} />}>+91 98373 79214</ContactBtn>
            <ContactBtn C={C} href="https://github.com/Tanishkag23" icon={<Code size={16} />}>GitHub</ContactBtn>
            <ContactBtn C={C} href="https://www.linkedin.com/in/tanishka-gupta-a20442351/" icon={<LinkIcon size={16} />}>LinkedIn</ContactBtn>
          </div>
        </Reveal>
      </section>

      <footer style={{ borderTop: `1px solid ${C.line}`, padding: "28px clamp(20px,5vw,64px)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10, color: C.dim, fontSize: 13 }}>
        <span>© 2026 Tanishka Gupta</span>
        <span>Designed & built with care</span>
      </footer>
    </div>
  );
}

function SectionLabel({ children, C }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 40 }}>
      <h2 className="display" style={{ fontSize: "clamp(24px,4vw,36px)", fontWeight: 700, letterSpacing: "-.02em" }}>{children}</h2>
      <div style={{ flex: 1, height: 1, background: C.line }} />
    </div>
  );
}

function ContactBtn({ children, href, icon, primary, C, grad }) {
  return (
    <a className={primary ? "btn" : "ghost"} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
      style={{
        display: "inline-flex", alignItems: "center", gap: 9, borderRadius: 10,
        padding: "13px 22px", fontWeight: 600, fontSize: 14, transition: "all .2s",
        ...(primary
          ? { background: grad, color: "#fff", border: "none" }
          : { border: `1px solid ${C.line}`, color: C.dim }),
      }}>
      {icon} {children}
    </a>
  );
}


function FlipCard({ p, C, grad }) {
  const [flipped, setFlipped] = useState(false);

  const face = {
    position: "absolute",
    inset: 0,
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
    borderRadius: 18,
    padding: "28px 26px",
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
    overflow: "hidden",
  };

  return (
    <div
      onClick={() => setFlipped((f) => !f)}
      className="flip-wrap"
      style={{ perspective: 1400, height: 300, cursor: "pointer" }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transition: "transform .7s cubic-bezier(.2,.7,.2,1)",
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* FRONT */}
        <div style={{ ...face, background: C.panel, border: `1px solid ${C.line}`, justifyContent: "space-between" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span className="display" style={{ fontSize: 38, fontWeight: 700, color: "rgba(255,255,255,.09)" }}>{p.n}</span>
            <span style={{ width: 36, height: 36, borderRadius: "50%", background: grad, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <ArrowUpRight size={18} color="#fff" />
            </span>
          </div>
          <div>
            <h3 className="display" style={{ fontSize: 24, fontWeight: 600, marginBottom: 12, lineHeight: 1.2 }}>{p.title}</h3>
            <p style={{ color: C.dim, fontSize: 15, lineHeight: 1.55 }}>{p.tagline}</p>
          </div>
          <span style={{ color: C.accentB, fontSize: 12.5, fontWeight: 600 }}>Click to view details</span>
        </div>

        {/* BACK */}
        <div style={{ ...face, background: grad, transform: "rotateY(180deg)", justifyContent: "space-between" }}>
          <div>
            <h3 className="display" style={{ fontSize: 19, fontWeight: 600, marginBottom: 12, color: "#fff" }}>{p.title}</h3>
            <p style={{ color: "rgba(255,255,255,.92)", fontSize: 14, lineHeight: 1.6, marginBottom: 16 }}>{p.desc}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
              {p.tags.map((t) => (
                <span key={t} style={{ fontSize: 11, color: "#fff", border: "1px solid rgba(255,255,255,.35)", borderRadius: 6, padding: "3px 9px" }}>{t}</span>
              ))}
            </div>
          </div>
          <a href={p.link} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}
            style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "#1a1a2e", background: "#fff", borderRadius: 9, padding: "10px 18px", fontSize: 13, fontWeight: 700, alignSelf: "flex-start" }}>
            View on GitHub <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
    </div>
  );
}