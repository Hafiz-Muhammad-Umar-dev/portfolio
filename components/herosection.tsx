'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface HeroSectionProps {
  name?: string;
  role?: string;
  badgeText?: string;
  statusText?: string;
  bioText?: string;
  trustedText?: string;
}

const NAVIGATION = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

// Floating skill chips around the portrait (md and up)
const CHIPS = [
  { label: 'Agentic AI', pos: 'left-[3%] top-[20%]', depth: 22, delay: 0 },
  { label: 'AI/ML Engineer', pos: 'right-[2%] top-[34%]', depth: 30, delay: 1.2 },
  { label: 'Computer Vision', pos: 'left-[13%] top-[46%] hidden lg:block', depth: 16, delay: 2.1 },
  { label: 'LLMs & RAG', pos: 'right-[16%] top-[56%] hidden lg:block', depth: 26, delay: 0.7 },
];

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 focus-visible:ring-offset-lime-300';

/** Parallax offset driven by the --px / --py variables set on the section. */
const parallax = (depth: number): React.CSSProperties => ({
  transform: `translate3d(calc(var(--px, 0) * ${depth}px), calc(var(--py, 0) * ${depth}px), 0)`,
});

/** Word-by-word entrance for headings. */
const Words: React.FC<{ text: string; start?: number; className?: string }> = ({
  text,
  start = 0,
  className = '',
}) => (
  <>
    {text.split(' ').map((word, i) => (
      <span
        key={`${word}-${i}`}
        className={`hero-word mr-[0.22em] inline-block last:mr-0 ${className}`}
        style={{ animationDelay: `${start + i * 90}ms` }}
      >
        {word}
      </span>
    ))}
  </>
);

/** Button wrapper that gently pulls toward the cursor. */
const Magnetic: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const ref = useRef<HTMLSpanElement>(null);

  const onMove = (e: React.PointerEvent<HTMLSpanElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== 'mouse') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * 0.25;
    const y = (e.clientY - (r.top + r.height / 2)) * 0.35;
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = '';
  };

  return (
    <span
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="inline-flex transition-transform duration-200 ease-out"
    >
      {children}
    </span>
  );
};

export const HeroSection: React.FC<HeroSectionProps> = ({
  name = 'Muhammad Umar',
  role = 'Forward Deployed Engineer',
  badgeText = 'AI / ML ENGINEER',
  statusText = 'Building production-ready AI systems',
  bioText = 'I build intelligent AI agents, LLM-powered applications, and computer vision systems that solve real-world problems.',
  trustedText = 'Specializing in Agentic AI, LLM systems, AI automation, and computer vision.',
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  // Split role so the heading keeps its two-line look: "Forward Deployed / Engineer."
  const roleWords = role.trim().split(' ');
  const roleLast = roleWords.pop() ?? '';
  const roleFirst = roleWords.join(' ');

  // Close mobile menu on Escape, outside click, or when resizing to desktop
  useEffect(() => {
    if (!menuOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };

    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    window.addEventListener('resize', onResize);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
      window.removeEventListener('resize', onResize);
    };
  }, [menuOpen]);

  // Cursor effects: spotlight, dot-grid reveal, parallax and follower ring.
  // Everything is written straight to CSS variables, so React never re-renders.
  useEffect(() => {
    const el = sectionRef.current;
    const ring = ringRef.current;
    if (!el || !ring) return;

    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!canHover || reduce) return;

    const target = { x: 0, y: 0, cx: 0, cy: 0, w: 1 };
    const cur = { x: 0, y: 0, cx: 0, cy: 0 };
    let raf = 0;

    const tick = () => {
      cur.x += (target.x - cur.x) * 0.1;
      cur.y += (target.y - cur.y) * 0.1;
      cur.cx += (target.cx - cur.cx) * 0.22;
      cur.cy += (target.cy - cur.cy) * 0.22;

      const h = el.offsetHeight || 1;
      el.style.setProperty('--mx', `${cur.x.toFixed(1)}px`);
      el.style.setProperty('--my', `${cur.y.toFixed(1)}px`);
      el.style.setProperty('--px', ((cur.x / target.w - 0.5) * 2).toFixed(3));
      el.style.setProperty('--py', ((cur.y / h - 0.5) * 2).toFixed(3));
      ring.style.transform = `translate3d(${cur.cx - 18}px, ${cur.cy - 18}px, 0)`;

      const settled =
        Math.abs(target.x - cur.x) < 0.3 &&
        Math.abs(target.y - cur.y) < 0.3 &&
        Math.abs(target.cx - cur.cx) < 0.3 &&
        Math.abs(target.cy - cur.cy) < 0.3;
      raf = settled ? 0 : requestAnimationFrame(tick);
    };

    const setTarget = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      target.x = e.clientX - r.left;
      target.y = e.clientY - r.top;
      target.cx = e.clientX;
      target.cy = e.clientY;
      target.w = r.width || 1;
    };

    const onEnter = (e: PointerEvent) => {
      setTarget(e);
      cur.x = target.x;
      cur.y = target.y;
      cur.cx = target.cx;
      cur.cy = target.cy;
      ring.style.opacity = '1';
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onMove = (e: PointerEvent) => {
      setTarget(e);
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onLeave = () => {
      ring.style.opacity = '0';
      ring.dataset.hover = 'false';
    };
    const onOver = (e: PointerEvent) => {
      ring.dataset.hover = (e.target as Element).closest('a, button') ? 'true' : 'false';
    };

    el.addEventListener('pointerenter', onEnter);
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    el.addEventListener('pointerover', onOver);
    return () => {
      el.removeEventListener('pointerenter', onEnter);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      el.removeEventListener('pointerover', onOver);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const gridMask =
    'radial-gradient(circle 240px at var(--mx, 50%) var(--my, 40%), #000 0%, transparent 100%)';

  return (
    <section
      ref={sectionRef}
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] w-full flex-col
        overflow-hidden bg-lime-300 px-5 py-4 text-zinc-950
        selection:bg-zinc-950 selection:text-lime-300
        sm:px-8 sm:py-5 lg:px-12"
    >
      <style>{`
        @keyframes hero-rise {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes hero-word {
          from { opacity: 0; transform: translateY(0.45em); filter: blur(8px); }
          to   { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        @keyframes hero-float {
          from { transform: translateY(-6px); }
          to   { transform: translateY(8px); }
        }
        @keyframes hero-drift-a {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%      { transform: translate(60px, -40px) scale(1.12); }
        }
        @keyframes hero-drift-b {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%      { transform: translate(-70px, 50px) scale(1.1); }
        }
        .hero-ring { opacity: 0; transition: opacity 0.25s ease; }
        .hero-ring-inner { transition: transform 0.25s ease, background-color 0.25s ease; }
        .hero-ring[data-hover='true'] .hero-ring-inner {
          transform: scale(1.8);
          background-color: rgba(255, 255, 255, 0.35);
        }
        @media (prefers-reduced-motion: no-preference) {
          .hero-rise   { animation: hero-rise 0.8s cubic-bezier(0.22, 1, 0.36, 1) both; }
          .hero-rise-3 { animation-delay: 0.45s; }
          .hero-word   { animation: hero-word 0.9s cubic-bezier(0.22, 1, 0.36, 1) both; }
          .hero-float  { animation: hero-float 5s ease-in-out infinite alternate; }
          .hero-drift-a { animation: hero-drift-a 18s ease-in-out infinite; }
          .hero-drift-b { animation: hero-drift-b 22s ease-in-out infinite; }
        }
        html { scroll-behavior: smooth; }
        @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
      `}</style>

      {/* Cursor follower ring (desktop with a mouse only) */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="hero-ring pointer-events-none fixed left-0 top-0 z-[60]
          h-9 w-9"
      >
        <div
          className="hero-ring-inner h-full w-full rounded-full border
            border-zinc-950/70"
        />
      </div>

      {/* Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        {/* Drifting colour blobs */}
        <div className="absolute left-1/2 top-[38%]" style={parallax(-18)}>
          <div
            className="hero-drift-a h-[350px] w-[350px] -translate-x-1/2
              -translate-y-1/2 rounded-full bg-white/40 blur-[90px]
              sm:h-[480px] sm:w-[480px] sm:blur-[120px]
              lg:h-[560px] lg:w-[560px]"
          />
        </div>
        <div className="absolute -right-24 -top-24" style={parallax(14)}>
          <div className="hero-drift-b h-72 w-72 rounded-full bg-lime-100/60 blur-[100px]" />
        </div>
        <div className="absolute -bottom-32 -left-24" style={parallax(10)}>
          <div className="hero-drift-b h-80 w-80 rounded-full bg-lime-500/25 blur-[110px]" />
        </div>

        {/* Faint base dots */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: 'radial-gradient(#18181b 0.7px, transparent 0.7px)',
            backgroundSize: '7px 7px',
          }}
        />

        {/* Dot grid that lights up around the cursor */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: 'radial-gradient(#18181b 1px, transparent 1px)',
            backgroundSize: '22px 22px',
            WebkitMaskImage: gridMask,
            maskImage: gridMask,
          }}
        />

        {/* Soft spotlight */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(420px circle at var(--mx, 50%) var(--my, 40%), rgba(255,255,255,0.45), transparent 70%)',
          }}
        />
      </div>

      {/* Navbar */}
      <header
        ref={headerRef}
        className="relative z-50 mx-auto flex w-full max-w-[1440px]
          shrink-0 items-center justify-between gap-4"
      >
        <a
          href="#home"
          aria-label={`${name} home`}
          className={`shrink-0 rounded-md text-lg font-semibold
            tracking-[-0.06em] sm:text-xl lg:text-2xl ${focusRing}`}
        >
          {name}
          <span className="text-lime-700">.</span>
        </a>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-1 rounded-full border
            border-zinc-900/10 bg-white/60 p-1 shadow-sm backdrop-blur-xl
            md:flex"
        >
          {NAVIGATION.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`rounded-full px-4 py-2 text-sm font-medium
                text-zinc-700 transition-colors hover:bg-white
                hover:text-zinc-950 ${focusRing}`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
          className={`flex h-11 w-11 shrink-0 items-center justify-center
            rounded-full border border-zinc-900/10 bg-white/80 shadow-sm
            transition hover:bg-white active:scale-95 md:hidden ${focusRing}`}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path
              d={menuOpen ? 'm6 6 12 12M18 6 6 18' : 'M4 8h16M4 16h16'}
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {menuOpen && (
          <nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            className="absolute right-0 top-14 z-50 w-56 rounded-2xl
              border border-zinc-200 bg-white/95 p-2 shadow-xl
              shadow-zinc-900/10 backdrop-blur-xl md:hidden"
          >
            {NAVIGATION.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="block rounded-xl px-4 py-3 text-sm font-medium
                  text-zinc-700 transition hover:bg-lime-100
                  hover:text-zinc-950 focus-visible:outline-none
                  focus-visible:bg-lime-100"
              >
                {item.label}
              </a>
            ))}
          </nav>
        )}
      </header>

      {/* Main hero area */}
      <main
        className="relative mx-auto flex w-full max-w-[1440px] flex-1
          flex-col items-center justify-center py-5 sm:py-4 lg:py-2"
      >
        {/* Badge */}
        <div
          className="hero-rise relative z-30 mb-4 inline-flex shrink-0
            items-center gap-2 rounded-full border border-zinc-900/10
            bg-white/75 px-3.5 py-1.5 shadow-sm backdrop-blur-md"
        >
          <span
            aria-hidden="true"
            className="h-2 w-2 rounded-full bg-lime-600
              shadow-[0_0_0_4px_rgba(190,242,100,0.35)]"
          />
          <span
            className="text-[10px] font-semibold uppercase
              tracking-[0.18em] text-zinc-700 sm:text-[11px]"
          >
            {badgeText}
          </span>
        </div>

        {/* Heading */}
        <div className="relative z-20 w-full shrink-0 text-center">
          <h1
            id="hero-title"
            aria-label={`Hi, I'm ${name}, ${role}`}
            className="text-balance text-[clamp(2.15rem,5.2vw,5.25rem)]
              font-medium leading-[0.96] tracking-[-0.065em]"
          >
            <span aria-hidden="true">
              <Words text="Hi, I'm" start={150} />
              <span className="whitespace-nowrap">
                <Words text={name} start={330} />
              </span>
            </span>
          </h1>

          <p
            aria-hidden="true"
            className="mx-auto mt-2 max-w-full font-serif
              text-[clamp(2.3rem,6.2vw,6.1rem)] italic leading-[0.94]
              tracking-[-0.055em] text-zinc-800"
          >
            {roleFirst && (
              <span className="block">
                <Words text={roleFirst} start={560} />
              </span>
            )}
            <span className="block">
              <Words text={roleLast} start={760} />
              <span className="hero-word inline-block text-lime-700" style={{ animationDelay: '900ms' }}>
                .
              </span>
            </span>
          </p>
        </div>

        {/* Portrait stage */}
        <div
          className="hero-rise hero-rise-3 relative z-10 flex min-h-0
            w-full flex-1 items-center justify-center"
        >
          {/* Rings: the outer one is static, the dashed one slowly rotates */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2
              aspect-square w-[min(76vw,46vh,510px)] -translate-x-1/2
              -translate-y-1/2 rounded-full border border-zinc-900/10
              bg-white/10"
            style={parallax(-8)}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2
              aspect-square w-[min(63vw,39vh,420px)] -translate-x-1/2
              -translate-y-1/2"
          >
            <div
              className="h-full w-full rounded-full border border-dashed
                border-zinc-900/20 motion-safe:animate-[spin_60s_linear_infinite]"
            />
          </div>

          {/* Portrait */}
          <div
            className="relative z-10 flex h-full min-h-0 w-full
              items-center justify-center"
            style={parallax(10)}
          >
            <Image
              src="/hero.png"
              alt={`${name}, ${role}`}
              width={640}
              height={780}
              priority
              sizes="(max-width: 640px) 90vw, (max-height: 800px) 42vh, 510px"
              className="block h-auto max-h-full w-auto max-w-[88%]
                object-contain drop-shadow-[0_24px_30px_rgba(24,24,27,0.12)]
                transition-[filter,transform] duration-700 ease-out
                motion-safe:hover:scale-[1.02] hover:grayscale"
            />
          </div>

          {/* Floating skill chips */}
          {CHIPS.map((chip) => (
            <div
              key={chip.label}
              aria-hidden="true"
              className={`pointer-events-none absolute z-20 hidden md:block ${chip.pos}`}
              style={parallax(chip.depth)}
            >
              <div
                className="hero-float inline-flex items-center gap-2
                  rounded-full border border-white/80 bg-white/85 px-3.5
                  py-2 text-xs font-semibold text-zinc-800 shadow-lg
                  shadow-zinc-900/5 backdrop-blur-xl"
                style={{ animationDelay: `${chip.delay}s` }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-lime-600" />
                {chip.label}
              </div>
            </div>
          ))}

          {/* Availability card */}
          <div
            className="absolute bottom-[7%] left-0 z-20 hidden max-w-[245px]
              items-center gap-2.5 rounded-2xl border border-white/80
              bg-white/85 p-3 shadow-lg shadow-zinc-900/5 backdrop-blur-xl
              sm:flex lg:left-2 lg:p-3.5"
          >
            <span className="relative flex h-2.5 w-2.5 shrink-0" aria-hidden="true">
              <span
                className="absolute inline-flex h-full w-full rounded-full
                  bg-lime-600 opacity-50 motion-safe:animate-ping"
              />
              <span className="relative h-2.5 w-2.5 rounded-full bg-lime-600" />
            </span>

            <div className="min-w-0">
              <p className="text-xs font-semibold leading-snug text-zinc-900">
                {statusText}
              </p>
              <p className="mt-1 text-[11px] text-zinc-500">
                AI Engineering · Automation
              </p>
            </div>
          </div>

          {/* Bio card */}
          <div
            className="absolute bottom-[8%] right-0 z-20 hidden max-w-[235px]
              rounded-2xl border border-white/80 bg-white/85 p-3.5 text-left
              shadow-lg shadow-zinc-900/5 backdrop-blur-xl sm:block lg:right-2"
          >
            <p
              className="mb-1.5 text-[10px] font-semibold uppercase
                tracking-[0.17em] text-lime-800"
            >
              What I do
            </p>
            <p className="text-xs leading-[1.65] text-zinc-600">{bioText}</p>
          </div>

          {/* Decorative accent: slowly spinning star */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-[12%] top-[10%]
              z-20 sm:right-[17%]"
            style={parallax(24)}
          >
            <div
              className="flex h-9 w-9 rotate-12 items-center justify-center
                rounded-xl bg-zinc-950 text-lg text-lime-300 shadow-lg
                sm:h-11 sm:w-11"
            >
              <span className="inline-block motion-safe:animate-[spin_10s_linear_infinite]">
                ✳
              </span>
            </div>
          </div>
        </div>

        {/* Mobile information */}
        <div className="relative z-20 mt-2 w-full max-w-lg shrink-0 px-2 sm:hidden">
          <div className="mb-2 flex items-center justify-center gap-2">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-lime-700" />
            <span className="text-xs font-medium text-zinc-700">{statusText}</span>
          </div>
          <p className="text-balance text-center text-[13px] leading-5 text-zinc-700">
            {bioText}
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer
        className="relative z-20 mx-auto flex w-full max-w-[1440px] shrink-0
          flex-col items-center justify-between gap-3 border-t
          border-zinc-900/10 pt-3 sm:flex-row sm:gap-5"
      >
        <div className="max-w-md text-center sm:text-left">
          <p
            className="text-[10px] font-semibold uppercase tracking-[0.17em]
              text-zinc-600"
          >
            My focus
          </p>
          <p className="mt-1 text-xs leading-4 text-zinc-700">{trustedText}</p>
        </div>

        <Magnetic>
          <a
            href="#contact"
            className={`group inline-flex min-h-11 shrink-0 items-center
              justify-center gap-2 rounded-full bg-zinc-950 px-6 py-2.5
              text-sm font-medium text-white shadow-lg shadow-zinc-900/10
              transition-[background-color,color,box-shadow] duration-300
              hover:bg-lime-500 hover:text-zinc-950 hover:shadow-xl
              ${focusRing}`}
          >
            Let&apos;s work together
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-300
                group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            >
              ↗
            </span>
          </a>
        </Magnetic>
      </footer>
    </section>
  );
};

export default HeroSection;