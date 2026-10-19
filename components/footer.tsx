
'use client';

import React, { useEffect, useRef } from 'react';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterProps {
  name?: string;
  links?: FooterLink[];
  tagline?: string;
}

const defaultLinks: FooterLink[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-600 focus-visible:ring-offset-2 focus-visible:ring-offset-[#fafbf7]';

export const Footer: React.FC<FooterProps> = ({
  name = 'Muhammad Umar',
  links = defaultLinks,
  tagline = 'Designed with intention. Built to solve real problems.',
}) => {
  const [year, setYear] = React.useState<number | null>(null);

React.useEffect(() => {
  setYear(new Date().getFullYear());
}, []);
  const wrapRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);

  // Automatically fit the oversized name to the available width.
  useEffect(() => {
    const wrap = wrapRef.current;
    const text = nameRef.current;

    if (!wrap || !text) return;

    const fit = () => {
      text.style.fontSize = '100px';

      const naturalWidth = text.getBoundingClientRect().width;

      if (!naturalWidth) return;

      const calculatedSize =
        (wrap.clientWidth / naturalWidth) * 100 * 0.98;

      text.style.fontSize = `${calculatedSize}px`;
    };

    fit();

    const resizeObserver = new ResizeObserver(fit);
    resizeObserver.observe(wrap);

    document.fonts?.ready.then(fit);

    return () => resizeObserver.disconnect();
  }, [name]);

  return (
    <footer className="relative isolate overflow-hidden bg-[#fafbf7] px-5 pt-10 text-zinc-950 sm:px-8 sm:pt-12 lg:px-12">
      {/* Top divider */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-zinc-300 to-transparent"
      />

      {/* Bottom lime glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-44 bg-gradient-to-t from-lime-600/80 via-lime-500/40 to-transparent sm:h-56"

      />

      {/* Subtle lime ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 left-1/2 z-0 h-56 w-[80%] -translate-x-1/2 rounded-full bg-lime-300/20 blur-[90px]"
      />

      <div className="relative z-10 mx-auto max-w-[1440px]">
        {/* Navigation and copyright */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-3">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`rounded-md text-sm font-medium text-zinc-800 transition-colors duration-200 hover:text-lime-700 ${focusRing}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
            <p className="text-xs text-zinc-500">
  © {year ?? 2026} {name}. All rights reserved.
</p>

            <a
              href="#home"
              className={`group inline-flex w-fit items-center gap-2 rounded-full border border-zinc-200 bg-white/80 px-4 py-2 text-xs font-medium text-zinc-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-lime-300 hover:bg-lime-300 hover:text-zinc-950 ${focusRing}`}
            >
              Back to top

              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:-translate-y-0.5"
              >
                ↑
              </span>
            </a>
          </div>
        </div>

        {/* Tagline */}
        <p className="mt-6 text-xs leading-6 text-zinc-500 sm:mt-7">
          {tagline}
        </p>

        {/* Oversized name */}
        <div
          ref={wrapRef}
          aria-hidden="true"
          className="group relative mt-6 w-full select-none pb-7 sm:mt-8 sm:pb-10"
        >
          <span
            ref={nameRef}
            className="inline-block whitespace-nowrap font-serif text-[12vw] italic leading-[1.1] tracking-[-0.04em] text-zinc-950 transition-colors duration-500 group-hover:text-lime-700"
          >
            {name}
          </span>
        </div>

        {/* Bottom footer note */}
        <div className="flex flex-col gap-2 border-t border-zinc-200/70 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] text-zinc-500">
            Thoughtfully designed. Purposefully built.
          </p>

          <p className="text-[11px] font-medium text-zinc-600">
            Made with care <span className="text-lime-700">✳</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
