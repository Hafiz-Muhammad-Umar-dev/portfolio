'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { FaXTwitter, FaLinkedinIn, FaGithub } from 'react-icons/fa6';

interface ExperienceItem {
  role: string;
  company: string;
  from: string;
  to: string;
}

interface SocialItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface ExperienceSectionProps {
  eyebrow?: string;
  titleDark?: string;
  titleLight?: string;
  bio?: string;
  image?: string;
  name?: string;
  role?: string;
  socials?: SocialItem[];
  experience?: ExperienceItem[];
}

const defaultSocials: SocialItem[] = [
  { label: 'GitHub', href: 'https://github.com/Hafiz-Muhammad-Umar-dev', icon: <FaGithub /> },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/muhammad-umar-u786', icon: <FaLinkedinIn /> }, // TODO
  { label: 'X (Twitter)', href: 'https://x.com/muhaammad_umar_', icon: <FaXTwitter /> }, // TODO
];

// TODO: apne real roles aur saal yahan likho (latest sabse upar)
const defaultExperience: ExperienceItem[] = [
  { role: 'Forward Deployed Engineer', company: 'Codevance.ae', from: '2026', to: 'Now' },
  { role: 'Computer Vision Engineer', company: 'Industronic Eng', from: '2025', to: 'Now' },
  { role: 'Full-Stack Engineer', company: 'Gapsoe Digital', from: '2022', to: '2024' },
  { role: 'Frontend Engineer', company: 'BrandSob Solutions', from: '2021', to: '2022' },
  { role: 'Frontend Developer Internship', company: 'Softonic Solutions', from: '2020', to: '2020' },
  
];

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-600 focus-visible:ring-offset-2 focus-visible:ring-offset-[#fafbf7]';

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  eyebrow = '/ Who Am I',
  titleDark = 'Pushing Boundaries',
  titleLight = 'since 2020',
  bio = 'An AI engineer passionate about building intelligent, production-ready systems. I have worked with startups and agencies to ship AI agents, LLM-powered products, and computer vision pipelines that blend reliability with real business value, solving problems through an engineering-first, iterate-fast process.',
  image = '/who.jpg ',
  name = 'Muhammad Umar',
  role = 'Forward Deployed Engineer',
  socials = defaultSocials,
  experience = defaultExperience,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [seen, setSeen] = useState(false);

  // Reveal once when the section scrolls into view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)
    ) {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const reveal = (delay = 0): React.CSSProperties => ({
    transitionDelay: `${delay}ms`,
  });
  const revealClass = `transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${
    seen ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
  }`;

  return (
    <section
      ref={sectionRef}
      id="experience"
      aria-labelledby="experience-title"
      className="relative isolate w-full overflow-hidden bg-[#fafbf7] px-5
        py-20 text-zinc-950 selection:bg-lime-300 sm:px-8 sm:py-24 lg:px-12
        lg:py-28"
    >
      {/* Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-1/3 -z-10 h-80
          w-80 rounded-full bg-lime-200/40 blur-[110px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-10 -z-10
          h-72 w-72 rounded-full border border-lime-200/50"
      />

      <div className="mx-auto max-w-[1280px]">
        {/* Heading */}
        <div className={`text-center ${revealClass}`} style={reveal(0)}>
          <p className="font-serif text-lg italic text-zinc-500 sm:text-xl">
            {eyebrow}
          </p>
          <h2
            id="experience-title"
            className="mt-3 text-balance text-[clamp(2.2rem,5.4vw,4.75rem)]
              font-normal leading-[1.05] tracking-[-0.05em]"
          >
            {titleDark}{' '}
            <span className="text-zinc-400">{titleLight}</span>
          </h2>
        </div>

        {/* Content */}
        <div className="mt-12 grid items-stretch gap-12 sm:mt-16 lg:grid-cols-2 lg:gap-16 xl:gap-24">
          {/* Left: photo + identity */}
          <div className={revealClass} style={reveal(120)}>
            <div className="group relative">
              {/* Lime card behind the photo */}
              <div
                aria-hidden="true"
                className="absolute inset-0 translate-x-2 translate-y-2
                  rotate-[3deg] rounded-3xl bg-lime-300 transition-transform
                  duration-500 group-hover:rotate-[4.5deg]
                  motion-reduce:transition-none"
              />

              {/* Photo */}
              <div
                className="relative aspect-[4/3.3] -rotate-2 overflow-hidden
                  rounded-3xl border border-zinc-200 bg-zinc-900
                  shadow-[0_20px_45px_rgba(24,24,27,0.18)] transition-transform
                  duration-500 group-hover:-rotate-1 motion-reduce:transition-none"
              >
                <Image
                  src={image}
                  alt={`${name}, ${role}`}
                  fill
                  sizes="(max-width: 1023px) 92vw, 560px"
                  className="object-cover object-top grayscale transition-[filter,transform]
                    duration-700 group-hover:scale-[1.03] group-hover:grayscale-0
                    motion-reduce:transition-none"
                />
              </div>

              {/* Spinning star sticker */}
              <div
                aria-hidden="true"
                className="absolute -right-3 -top-3 flex h-11 w-11 rotate-12
                  items-center justify-center rounded-xl bg-zinc-950 text-lg
                  text-lime-300 shadow-lg sm:-right-4 sm:-top-4 sm:h-12 sm:w-12"
              >
                <span className="inline-block motion-safe:animate-[spin_10s_linear_infinite]">
                  ✳
                </span>
              </div>
            </div>

            {/* Socials + identity */}
            <div className="mt-8 flex items-end justify-between gap-4">
              <ul className="flex items-center gap-2" aria-label="Social links">
                {socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className={`flex h-10 w-10 items-center justify-center
                        rounded-full border border-zinc-200 bg-white/80 text-base
                        text-zinc-700 transition-all duration-300
                        hover:-translate-y-0.5 hover:border-lime-300
                        hover:bg-lime-300 hover:text-zinc-950 ${focusRing}`}
                    >
                      {social.icon}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="text-right">
                <p className="text-sm font-semibold tracking-tight text-zinc-900">
                  {name}
                </p>
                <p className="mt-0.5 text-xs text-zinc-500">{role}</p>
              </div>
            </div>
          </div>

          {/* Right: bio + experience */}
          <div className="flex flex-col justify-between gap-12">
            <p
              className={`max-w-xl text-pretty text-sm leading-7 text-zinc-600
                sm:text-base sm:leading-8 ${revealClass}`}
              style={reveal(200)}
            >
              {bio}
            </p>

            <div
              className={`border-l-2 border-lime-300 pl-5 sm:pl-7 ${revealClass}`}
              style={reveal(280)}
            >
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                Experience
              </h3>

              <ul>
                {experience.map((item, index) => (
                  <li
                    key={`${item.company}-${index}`}
                    className="group grid grid-cols-[1fr_auto] items-baseline
                      gap-x-4 gap-y-1 border-b border-zinc-200 py-4
                      last:border-b-0 sm:grid-cols-[1.25fr_1fr_auto]"
                  >
                    <span className="text-sm font-medium text-zinc-900 transition-colors group-hover:text-lime-700 sm:text-[15px]">
                      {item.role}
                    </span>

                    <span className="col-span-2 order-last text-xs text-zinc-500 sm:order-none sm:col-span-1 sm:text-[13px]">
                      {item.company}
                    </span>

                    <span className="whitespace-nowrap text-sm tabular-nums text-zinc-900 sm:text-[15px]">
                      {item.from}
                      <span aria-hidden="true" className="mx-2 text-lime-700 transition-transform">
                        →
                      </span>
                      <span className="sr-only"> to </span>
                      {item.to}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;