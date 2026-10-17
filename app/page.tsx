
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import RecentWorks from '@/components/recentworks';
import AboutSection from '@/components/aboutsection';

interface HeroSectionProps {
  name?: string;
  role?: string;
  badgeText?: string;
  statusText?: string;
  bioText?: string;
  trustedText?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  name = 'Muhammad Umar',
  role = 'Forward Deployed Engineer',
  badgeText = 'AI / ML ENGINEER',
  statusText = 'Building production-ready AI systems',
  bioText =
    'I build intelligent AI agents, LLM-powered applications, and computer vision systems that solve real-world problems.',
  trustedText =
    'Specializing in Agentic AI, LLM systems, AI automation, and computer vision.',
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigation = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <section
      id="home"
      className="relative isolate flex min-h-screen min-h-[100svh]
        w-full flex-col overflow-hidden bg-[#fafbf7]
        px-5 py-4 text-zinc-950 sm:px-8 sm:py-5
        lg:px-12 lg:py-5"
    >
      {/* Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div
          className="absolute left-1/2 top-[38%] h-[350px] w-[350px]
            -translate-x-1/2 -translate-y-1/2 rounded-full
            bg-[#c7f464]/40 blur-[90px]
            sm:h-[480px] sm:w-[480px] sm:blur-[120px]
            lg:h-[560px] lg:w-[560px]"
        />

        <div
          className="absolute -right-24 -top-24 h-72 w-72
            rounded-full bg-lime-100/60 blur-[100px]"
        />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'radial-gradient(#18181b 0.7px, transparent 0.7px)',
            backgroundSize: '7px 7px',
          }}
        />
      </div>

      {/* Navbar */}
      <header
        className="relative z-50 mx-auto flex w-full max-w-[1440px]
          shrink-0 items-center justify-between gap-4"
      >
        <a
          href="#home"
          aria-label={`${name} home`}
          className="shrink-0 text-lg font-semibold tracking-[-0.06em]
            sm:text-xl lg:text-2xl"
        >
          {name}
          <span className="text-lime-600">.</span>
        </a>

        {/* Desktop navigation */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-1 rounded-full
            border border-zinc-200/80 bg-white/70 p-1
            shadow-sm backdrop-blur-xl md:flex"
        >
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm
                font-medium text-zinc-600 transition-colors
                hover:bg-lime-100 hover:text-zinc-950"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-10 w-10 shrink-0 items-center
            justify-center rounded-full border border-zinc-200
            bg-white/80 shadow-sm transition hover:bg-lime-100
            md:hidden"
        >
          {menuOpen ? (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path
                d="m6 6 12 12M18 6 6 18"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path
                d="M4 8h16M4 16h16"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          )}
        </button>

        {/* Mobile dropdown */}
        {menuOpen && (
          <nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            className="absolute right-0 top-12 z-50 w-56
              rounded-2xl border border-zinc-200
              bg-white/95 p-2 shadow-xl backdrop-blur-xl md:hidden"
          >
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="block rounded-xl px-4 py-3 text-sm
                  font-medium text-zinc-700 transition
                  hover:bg-lime-100 hover:text-zinc-950"
              >
                {item.label}
              </a>
            ))}
          </nav>
        )}
      </header>

      {/* Main hero area */}
      <main
        className="relative mx-auto flex w-full max-w-[1440px]
          flex-1 flex-col items-center justify-center
          gap-0 py-5 sm:py-4 lg:py-2"
      >
        {/* Badge */}
        <div
          className="relative z-30 mb-4 inline-flex shrink-0
            items-center gap-2 rounded-full border
            border-zinc-200/80 bg-white/75 px-3.5 py-1.5
            shadow-sm backdrop-blur-md sm:mb-4"
        >
          <span
            className="h-2 w-2 rounded-full bg-lime-500
              shadow-[0_0_0_4px_rgba(190,242,100,0.25)]"
          />
          <span
            className="text-[9px] font-semibold uppercase
              tracking-[0.18em] text-zinc-700 sm:text-[10px]"
          >
            {badgeText}
          </span>
        </div>

        {/* Heading: two lines */}
        <div className="relative z-20 w-full shrink-0 text-center">
          <h1
            className="text-[clamp(2.15rem,5.2vw,5.25rem)]
              font-medium leading-[0.96] tracking-[-0.065em]"
          >
            Hi, I&apos;m{' '}
            <span className="whitespace-nowrap">{name}</span>
          </h1>

          <h2
            className="mx-auto mt-2 max-w-full font-serif
              text-[clamp(2.3rem,6.2vw,6.1rem)]
              italic leading-[0.94] tracking-[-0.055em]
              text-zinc-800"
          >
            <span className="block">Forward Deployed</span>
            <span className="block">
              Engineer<span className="text-lime-600">.</span>
            </span>
          </h2>
        </div>

        {/* Portrait stage */}
        <div
          className="relative z-10 flex min-h-0 w-full
            flex-1 items-center justify-center"
        >
          {/* Decorative rings */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2
              top-1/2 aspect-square w-[min(76vw,46vh,510px)]
              -translate-x-1/2 -translate-y-1/2
              rounded-full border border-zinc-900/10
              bg-lime-300/10"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2
              top-1/2 aspect-square w-[min(63vw,39vh,420px)]
              -translate-x-1/2 -translate-y-1/2
              rounded-full border border-dashed
              border-zinc-900/10"
          />

          {/* Full image — preserve original aspect ratio */}
          <div
            className="relative z-10 flex h-full min-h-0
              w-full items-center justify-center"
          >
            <Image
              src="/hero.png"
              alt={`${name}, ${role}`}
              width={640}
              height={780}
              priority
              sizes="(max-width: 640px) 90vw, (max-height: 800px) 42vh, 510px"
              className="block h-auto max-h-full w-auto
                max-w-[88%] object-contain
                grayscale-0 transition-[filter,transform]
                duration-700 ease-in-out
                hover:grayscale hover:scale-[1.02]"
            />
          </div>

          {/* Availability card */}
          <div
            className="absolute bottom-[7%] left-0 z-20
              hidden max-w-[245px] items-center gap-2.5
              rounded-2xl border border-white/80
              bg-white/85 p-3 shadow-lg shadow-zinc-900/5
              backdrop-blur-xl sm:flex lg:left-2 lg:p-3.5"
          >
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span
                className="absolute inline-flex h-full w-full
                  animate-ping rounded-full bg-lime-500 opacity-50"
              />
              <span
                className="relative h-2.5 w-2.5 rounded-full
                  bg-lime-500"
              />
            </span>

            <div className="min-w-0">
              <p className="text-[11px] font-semibold text-zinc-900">
                {statusText}
              </p>
              <p className="mt-1 text-[10px] text-zinc-500">
                AI Engineering · Automation
              </p>
            </div>
          </div>

          {/* Bio card */}
          <div
            className="absolute bottom-[8%] right-0 z-20
              hidden max-w-[235px] rounded-2xl
              border border-white/80 bg-white/85 p-3.5
              text-left shadow-lg shadow-zinc-900/5
              backdrop-blur-xl sm:block lg:right-2"
          >
            <p
              className="mb-1.5 text-[9px] font-semibold
                uppercase tracking-[0.17em] text-lime-700"
            >
              What I do
            </p>
            <p className="text-[11px] leading-[1.65] text-zinc-600">
              {bioText}
            </p>
          </div>

          {/* Decorative accent */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute
              right-[12%] top-[10%] z-20 flex h-9 w-9
              rotate-12 items-center justify-center
              rounded-xl bg-zinc-950 text-lg text-lime-300
              shadow-lg sm:right-[17%] sm:h-11 sm:w-11"
          >
            ✳
          </div>
        </div>

        {/* Mobile information */}
        <div className="relative z-20 mt-1 w-full max-w-lg shrink-0 px-2 sm:hidden">
          <div className="mb-2 flex items-center justify-center gap-2">
            <span className="h-2 w-2 rounded-full bg-lime-500" />
            <span className="text-[11px] font-medium text-zinc-600">
              {statusText}
            </span>
          </div>

          <p className="text-center text-xs leading-5 text-zinc-600">
            {bioText}
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer
        className="relative z-20 mx-auto flex w-full max-w-[1440px]
          shrink-0 flex-col items-center justify-between gap-3
          border-t border-zinc-200/80 pt-3
          sm:flex-row sm:gap-5 sm:pt-3"
      >
        <div className="max-w-md text-center sm:text-left">
          <p
            className="text-[9px] font-semibold uppercase
              tracking-[0.17em] text-zinc-500"
          >
            My focus
          </p>
          <p className="mt-1 text-[11px] leading-4 text-zinc-700 sm:text-xs">
            {trustedText}
          </p>
        </div>

        <a
          href="#contact"
          className="group inline-flex min-h-10 shrink-0
            items-center justify-center gap-2 rounded-full
            bg-zinc-950 px-5 py-2.5 text-xs font-medium
            text-white shadow-lg shadow-zinc-900/10
            transition-all duration-300
            hover:-translate-y-0.5 hover:bg-lime-500
            hover:text-zinc-950 hover:shadow-xl
            focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-lime-600 focus-visible:ring-offset-4"
        >
          Let&apos;s work together
          <span
            aria-hidden="true"
            className="inline-block transition-transform
              duration-300 group-hover:translate-x-1"
          >
            ↗
          </span>
        </a>
      </footer>
      <RecentWorks />
      <AboutSection />
    </section>
  );
};

export default HeroSection;
