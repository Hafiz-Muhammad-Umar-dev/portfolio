'use client';

import React from 'react';
import Image from 'next/image';
import { SiPython, SiN8N, SiOpencv } from 'react-icons/si';
import {
  HiOutlineCpuChip,
  HiOutlineCommandLine,
  HiOutlineCube,
  HiOutlineSparkles,
  HiArrowUpRight,
} from 'react-icons/hi2';

interface TagItem {
  label: string;
  description?: string;
  icon: React.ReactNode;
  iconColor?: string;
  bgColor?: string;
}

interface CompanyItem {
  name: string;
  /** Optional logo path, e.g. "/companies/acme.svg". Falls back to the name as text. */
  logo?: string;
  href?: string;
}

interface AboutSectionProps {
  greeting?: string;
  statementDark?: string;
  statementLight?: string;
  leftTags?: TagItem[];
  rightTags?: TagItem[];
  companiesTitle?: string;
  companies?: CompanyItem[];
}

const defaultLeftTags: TagItem[] = [
  {
    label: 'Agentic AI Systems',
    description: 'Agents that plan, use tools, and act',
    icon: <HiOutlineCpuChip />,
    iconColor: 'text-emerald-700',
    bgColor: 'bg-emerald-100',
  },
  {
    label: 'AI & Machine Learning',
    description: 'Models built for production use',
    icon: <SiPython />,
    iconColor: 'text-blue-700',
    bgColor: 'bg-blue-100',
  },
  {
    label: 'Intelligent Automation',
    description: 'Workflows that run without hand-holding',
    icon: <SiN8N />,
    iconColor: 'text-orange-700',
    bgColor: 'bg-orange-100',
  },
];

const defaultRightTags: TagItem[] = [
  {
    label: 'Computer Vision Systems',
    description: 'Detection, tracking, and inspection',
    icon: <SiOpencv />,
    iconColor: 'text-violet-700',
    bgColor: 'bg-violet-100',
  },
  {
    label: 'Cloud-Native Engineering',
    description: 'Scalable, observable deployments',
    icon: <HiOutlineCube />,
    iconColor: 'text-sky-700',
    bgColor: 'bg-sky-100',
  },
  {
    label: 'Full-Stack Systems',
    description: 'From APIs to the interface',
    icon: <HiOutlineCommandLine />,
    iconColor: 'text-lime-800',
    bgColor: 'bg-lime-200',
  },
];

// TODO: replace with your real companies (exactly 5 looks best)
const defaultCompanies: CompanyItem[] = [
  { name: 'Gapsoe Digital' },
  { name: 'Softonic Solutions' },
  { name: 'BrandSob Solutions' },
  { name: 'Industronic Eng' },
  { name: 'Codevance.ae' },
]

export const AboutSection: React.FC<AboutSectionProps> = ({
  greeting = "Hello, I'm Umar.",
  statementDark = 'I engineer intelligent systems through Agentic AI, autonomous workflows, and thoughtful software architecture',
  statementLight = 'turning complex business challenges into practical, production-ready AI solutions.',
  leftTags = defaultLeftTags,
  rightTags = defaultRightTags,
  companiesTitle = "Companies I've worked with",
  companies = defaultCompanies,
}) => {
  const renderTag = (tag: TagItem, index: number) => (
    <div
      key={`${tag.label}-${index}`}
      style={{ animationDelay: `${index * 120}ms` }}
      className="about-rise group relative flex w-full max-w-[300px]
        items-center gap-4 overflow-hidden rounded-2xl border
        border-zinc-200/70 bg-white/85 p-4
        shadow-[0_10px_35px_rgba(24,24,27,0.06)] backdrop-blur-xl
        transition-[transform,box-shadow,border-color] duration-300
        ease-out hover:-translate-y-1 hover:border-lime-300
        hover:shadow-[0_18px_40px_rgba(132,204,22,0.16)]
        motion-reduce:transition-none motion-reduce:hover:translate-y-0
        sm:gap-5 sm:p-5"
    >
      {/* Soft glow on hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-10 h-28 w-28
          rounded-full bg-lime-200/0 blur-2xl transition-colors duration-500
          group-hover:bg-lime-200/70"
      />

      {/* Icon */}
      <span
        aria-hidden="true"
        className={`relative flex h-14 w-14 shrink-0 items-center
          justify-center rounded-2xl text-2xl shadow-sm transition-transform
          duration-300 motion-safe:group-hover:-rotate-6
          motion-safe:group-hover:scale-105 sm:h-16 sm:w-16
          sm:rounded-[20px] sm:text-3xl
          ${tag.bgColor ?? 'bg-lime-100'} ${tag.iconColor ?? 'text-lime-800'}`}
      >
        {tag.icon}
        <span
          className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full
            border-[3px] border-white bg-lime-500"
        />
      </span>

      {/* Text */}
      <div className="relative min-w-0 flex-1">
        <p className="text-sm font-semibold tracking-tight text-zinc-900 sm:text-base">
          {tag.label}
        </p>
        {tag.description && (
          <p className="mt-1 text-xs leading-5 text-zinc-500">
            {tag.description}
          </p>
        )}
      </div>

      {/* Arrow */}
      <span
        aria-hidden="true"
        className="relative flex h-9 w-9 shrink-0 items-center
          justify-center rounded-full border border-zinc-200 bg-white
          text-zinc-400 transition-colors duration-300
          group-hover:border-lime-300 group-hover:bg-lime-500
          group-hover:text-white"
      >
        <HiArrowUpRight className="text-lg" />
      </span>
    </div>
  );

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="relative isolate w-full overflow-hidden bg-[#fafbf7]
        px-5 pb-12 pt-20 text-zinc-950 selection:bg-lime-300
        sm:px-8 sm:pb-14 sm:pt-24 lg:px-12 lg:pb-16 lg:pt-32"
    >
      <style>{`
        @keyframes about-rise {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: no-preference) {
          .about-rise { animation: about-rise 0.7s cubic-bezier(0.22, 1, 0.36, 1) both; }
        }
      `}</style>

      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10
          h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2
          rounded-full bg-lime-200/30 blur-[110px] sm:h-[550px] sm:w-[550px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-24 -z-10 h-52
          w-52 rounded-full border border-lime-200/40"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-16 -z-10
          h-64 w-64 rounded-full border border-lime-200/40"
      />

      <div className="mx-auto max-w-[1440px]">
        {/* Section label */}
        <div className="mb-8 flex justify-center sm:mb-10">
          <div
            className="inline-flex items-center gap-2.5 rounded-full border
              border-zinc-200/80 bg-white/80 px-4 py-2 shadow-sm
              backdrop-blur-md"
          >
            <HiOutlineSparkles aria-hidden="true" className="text-base text-lime-700" />
            <span
              className="text-[11px] font-semibold uppercase
                tracking-[0.22em] text-zinc-600"
            >
              A Little About Me
            </span>
          </div>
        </div>

        {/* Greeting */}
        <div className="mb-12 text-center sm:mb-16">
          <p className="font-serif text-2xl italic tracking-tight text-zinc-600 sm:text-3xl">
            {greeting}
            <span aria-hidden="true" className="ml-1 text-lime-600">
              ✳
            </span>
          </p>
        </div>

        {/* Main layout */}
        <div
          className="grid grid-cols-1 items-center gap-10
            lg:grid-cols-[minmax(250px,1fr)_minmax(0,2.2fr)_minmax(250px,1fr)]
            lg:gap-8 xl:gap-10"
        >
          {/* Left cards */}
          <div
            className="flex flex-wrap items-center justify-center gap-4
              sm:gap-5 lg:flex-col lg:items-start"
          >
            {leftTags.map(renderTag)}
          </div>

          {/* Center statement */}
          <div className="relative mx-auto w-full max-w-3xl py-5 text-center">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-8 left-1/2
                -translate-x-1/2 font-serif text-7xl leading-none
                text-lime-300/80 sm:-top-10 sm:text-8xl"
            >
              “
            </span>

            <h2
              id="about-title"
              className="relative text-balance text-[clamp(1.8rem,3.5vw,3.65rem)]
                font-medium leading-[1.22] tracking-[-0.055em] text-zinc-900"
            >
              {statementDark}{' '}
              <span className="font-light text-zinc-400">{statementLight}</span>
            </h2>

            <div
              aria-hidden="true"
              className="mt-8 flex items-center justify-center gap-2.5"
            >
              <span className="h-px w-10 bg-zinc-200" />
              <span
                className="h-2.5 w-2.5 rounded-full bg-lime-500
                  shadow-[0_0_0_5px_rgba(190,242,100,0.18)]"
              />
              <span className="h-px w-10 bg-zinc-200" />
            </div>
          </div>

          {/* Right cards */}
          <div
            className="flex flex-wrap items-center justify-center gap-4
              sm:gap-5 lg:flex-col lg:items-end"
          >
            {rightTags.map(renderTag)}
          </div>
        </div>

        {/* Companies strip */}
        {companies.length > 0 && (
          <div className="mx-auto mt-16 max-w-5xl sm:mt-20 lg:mt-24">
            <p
              className="mb-5 text-center text-[11px] font-semibold uppercase
                tracking-[0.2em] text-zinc-500"
            >
              {companiesTitle}
            </p>

            <ul
              className="grid grid-cols-2 overflow-hidden rounded-2xl border
                border-zinc-200/80 bg-white/75
                shadow-[0_10px_35px_rgba(24,24,27,0.04)] backdrop-blur-xl
                sm:grid-cols-3 lg:grid-cols-5"
            >
              {companies.slice(0, 5).map((company, index) => {
                const content = company.logo ? (
                  <Image
                    src={company.logo}
                    alt={company.name}
                    width={120}
                    height={32}
                    className="h-7 w-auto max-w-[120px] object-contain
                      opacity-60 grayscale transition duration-300
                      group-hover:opacity-100 group-hover:grayscale-0"
                  />
                ) : (
                  <span
                    className="text-sm font-semibold tracking-tight
                      text-zinc-500 transition-colors duration-300
                      group-hover:text-zinc-950 sm:text-base"
                  >
                    {company.name}
                  </span>
                );

                const cellClass =
                  'group flex h-20 w-full items-center justify-center px-4 transition-colors duration-300 hover:bg-lime-50 focus-visible:outline-none focus-visible:bg-lime-100';

                return (
                  <li
                    key={`${company.name}-${index}`}
                    className="flex border-b border-r border-zinc-200/70
                      last:col-span-2 sm:last:col-span-1
                      [&:nth-child(2n)]:max-sm:border-r-0
                      lg:border-b-0 lg:last:border-r-0"
                  >
                    {company.href ? (
                      <a
                        href={company.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={company.name}
                        className={cellClass}
                      >
                        {content}
                      </a>
                    ) : (
                      <div className={cellClass}>{content}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default AboutSection;