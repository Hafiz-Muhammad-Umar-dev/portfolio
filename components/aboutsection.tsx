
'use client';

import React from 'react';
import {
  SiReact,
  SiPython,
  SiN8N,
  SiOpencv,
  SiFastapi,
} from 'react-icons/si';

import {
  HiOutlineCpuChip,
  HiOutlineCommandLine,
  HiOutlineCube,
  HiOutlineSparkles,
  HiOutlineSquares2X2,
  HiArrowUpRight,
} from 'react-icons/hi2';

interface TagItem {
  label: string;
  icon: React.ReactNode;
  iconColor?: string;
  bgColor?: string;
}

interface AboutSectionProps {
  greeting?: string;
  statementDark?: string;
  statementLight?: string;
  leftTags?: TagItem[];
  rightTags?: TagItem[];
}

const defaultLeftTags: TagItem[] = [
  {
    label: 'Agentic AI',
    icon: <HiOutlineCpuChip />,
    iconColor: 'text-emerald-700',
    bgColor: 'bg-emerald-100',
  },
  {
    label: 'Python Engineering',
    icon: <SiPython />,
    iconColor: 'text-blue-700',
    bgColor: 'bg-blue-100',
  },
  {
    label: 'AI Automation',
    icon: <SiN8N />,
    iconColor: 'text-orange-700',
    bgColor: 'bg-orange-100',
  },
];

const defaultRightTags: TagItem[] = [
  {
    label: 'LLM Systems',
    icon: <HiOutlineCpuChip />,
    iconColor: 'text-violet-700',
    bgColor: 'bg-violet-100',
  },
  {
    label: 'System Design',
    icon: <HiOutlineCube />,
    iconColor: 'text-sky-700',
    bgColor: 'bg-sky-100',
  },
  {
    label: 'Computer Vision',
    icon: <SiOpencv />,
    iconColor: 'text-lime-800',
    bgColor: 'bg-lime-200',
  },
];

export const AboutSection: React.FC<AboutSectionProps> = ({
  greeting = "Hello, I'm Umar.",
  statementDark =
    'I engineer intelligent systems through Agentic AI, autonomous workflows, and thoughtful software architecture',
  statementLight =
    ' — turning complex business challenges into practical, production-ready AI solutions.',
  leftTags = defaultLeftTags,
  rightTags = defaultRightTags,
}) => {
  const renderTag = (tag: TagItem, index: number) => (
    <div
      key={`${tag.label}-${index}`}
      style={{ animationDelay: `${index * 160}ms` }}
      className="
        skill-card group relative flex w-full max-w-[300px]
        items-center gap-4 overflow-hidden rounded-2xl
        border border-zinc-200/70 bg-white/85 p-4
        shadow-[0_10px_35px_rgba(24,24,27,0.06)]
        backdrop-blur-xl
        transition-all duration-500 ease-out
        hover:-translate-y-2 hover:scale-[1.025]
        hover:border-lime-300
        hover:shadow-[0_20px_45px_rgba(132,204,22,0.15)]
        sm:gap-5 sm:p-5
        motion-reduce:animate-none motion-reduce:transition-none
      "
    >
      {/* Soft animated glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute -right-10 -top-10
          h-28 w-28 rounded-full bg-lime-200/0 blur-2xl
          transition-all duration-500
          group-hover:bg-lime-200/70
        "
      />

      {/* Skill icon */}
      <span
        className={`
          relative flex h-14 w-14 shrink-0 items-center
          justify-center rounded-2xl text-2xl shadow-sm
          transition-all duration-500
          group-hover:rotate-[-7deg] group-hover:scale-110
          sm:h-16 sm:w-16 sm:rounded-[20px] sm:text-3xl
          ${tag.bgColor ?? 'bg-lime-100'}
          ${tag.iconColor ?? 'text-lime-800'}
        `}
      >
        {tag.icon}

        {/* Status dot */}
        <span
          aria-hidden="true"
          className="
            absolute -bottom-1 -right-1 h-3.5 w-3.5
            rounded-full border-[3px] border-white
            bg-lime-500 transition-transform duration-300
            group-hover:scale-125
          "
        />
      </span>

      {/* Title and subtitle */}
      <div className="relative min-w-0 flex-1">
        <p className="text-sm font-semibold tracking-tight text-zinc-900 sm:text-base">
          {tag.label}
        </p>

        <p className="mt-1 text-[11px] leading-5 text-zinc-500 sm:text-xs">
          Explore my expertise
        </p>
      </div>

      {/* Animated arrow */}
      <span
        className="
          relative flex h-9 w-9 shrink-0 items-center
          justify-center rounded-full border border-zinc-200
          bg-white text-zinc-400
          transition-all duration-300
          group-hover:rotate-45 group-hover:border-lime-300
          group-hover:bg-lime-500 group-hover:text-white
        "
      >
        <HiArrowUpRight className="text-lg" />
      </span>
    </div>
  );

  return (
    <section
      id="about"
      className="
        relative isolate w-full overflow-hidden
        bg-[#fafbf7] px-5 py-20 text-zinc-950
        sm:px-8 sm:py-24 lg:px-12 lg:py-32
      "
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute left-1/2 top-1/2 -z-10
          h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2
          rounded-full bg-lime-200/30 blur-[110px]
          sm:h-[550px] sm:w-[550px]
        "
      />

      {/* Subtle decorative circles */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute -left-24 top-24 -z-10
          h-52 w-52 rounded-full border border-lime-200/40
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute -right-24 bottom-16 -z-10
          h-64 w-64 rounded-full border border-lime-200/40
        "
      />

      <div className="mx-auto max-w-[1440px]">
        {/* Section label */}
        <div className="mb-8 flex justify-center sm:mb-10">
          <div
            className="
              inline-flex items-center gap-2.5 rounded-full
              border border-zinc-200/80 bg-white/80 px-4 py-2
              shadow-sm backdrop-blur-md
            "
          >
            <HiOutlineSparkles className="text-base text-lime-700" />

            <span
              className="
                text-[10px] font-semibold uppercase
                tracking-[0.22em] text-zinc-600
              "
            >
              A Little About Me
            </span>
          </div>
        </div>

        {/* Greeting */}
        <div className="mb-12 text-center sm:mb-16">
          <p className="font-serif text-2xl italic tracking-tight text-zinc-600 sm:text-3xl">
            {greeting}
            <span className="ml-1 text-lime-600">✳</span>
          </p>
        </div>

        {/* Main layout */}
        <div
          className="
            grid grid-cols-1 items-center gap-10
            lg:grid-cols-[minmax(250px,1fr)_minmax(0,2.2fr)_minmax(250px,1fr)]
            lg:gap-8 xl:gap-10
          "
        >
          {/* Left skill cards */}
          <div
            className="
              flex flex-wrap items-center justify-center gap-4
              sm:gap-5 lg:flex-col lg:items-start lg:gap-5
            "
          >
            {leftTags.map(renderTag)}
          </div>

          {/* Center statement */}
          <div className="relative mx-auto w-full max-w-3xl py-5 text-center">
            {/* Decorative quote */}
            <span
              aria-hidden="true"
              className="
                pointer-events-none absolute -top-8 left-1/2
                -translate-x-1/2 font-serif text-7xl
                leading-none text-lime-300/80
                sm:-top-10 sm:text-8xl
              "
            >
              “
            </span>

            <h2
              className="
                relative text-[clamp(1.8rem,3.5vw,3.65rem)]
                font-medium leading-[1.22] tracking-[-0.055em]
                text-zinc-900
              "
            >
              {statementDark}

              <span className="font-light text-zinc-400">
                {statementLight}
              </span>
            </h2>

            {/* Lime divider */}
            <div className="mt-8 flex items-center justify-center gap-2.5">
              <span className="h-px w-10 bg-zinc-200" />

              <span
                className="
                  h-2.5 w-2.5 rounded-full bg-lime-500
                  shadow-[0_0_0_5px_rgba(190,242,100,0.18)]
                "
              />

              <span className="h-px w-10 bg-zinc-200" />
            </div>
          </div>

          {/* Right skill cards */}
          <div
            className="
              flex flex-wrap items-center justify-center gap-4
              sm:gap-5 lg:flex-col lg:items-end lg:gap-5
            "
          >
            {rightTags.map(renderTag)}
          </div>
        </div>

        {/* Bottom expertise strip */}
        {/* <div className="mx-auto mt-16 max-w-4xl sm:mt-20"> */}
          {/* <div
            className="
              flex flex-col gap-5 rounded-2xl
              border border-zinc-200/80 bg-white/75
              p-5 shadow-[0_10px_35px_rgba(24,24,27,0.04)]
              backdrop-blur-xl sm:flex-row sm:items-center
              sm:justify-between sm:gap-8 sm:p-6
            "
          > */}
            {/* Purpose */}
            {/* <div className="flex items-center gap-4"> */}
              {/* <span
                className="
                  flex h-12 w-12 shrink-0 items-center
                  justify-center rounded-2xl bg-lime-100
                  text-2xl text-lime-800
                "
              >
                <HiOutlineCommandLine />
              </span> */}

              {/* <div>
                <p className="text-sm font-semibold text-zinc-900">
                  Engineering with purpose
                </p>

                <p className="mt-1 text-xs leading-5 text-zinc-500">
                  From architecture to real-world deployment.
                </p>
              </div> */}
            {/* </div>   */}

            {/* Technology highlights */}
            {/* <div
              className="
                flex flex-wrap items-center gap-x-5 gap-y-3
                text-xs font-medium text-zinc-600 sm:justify-end
              "
            > */}
              {/* <span className="inline-flex items-center gap-2">
                <SiFastapi className="text-base text-emerald-700" />
                APIs
              </span> */}

              {/* <span className="inline-flex items-center gap-2">
                <SiReact className="text-base text-sky-600" />
                Applications
              </span> */}

              {/* <span className="inline-flex items-center gap-2">
                <HiOutlineSquares2X2 className="text-base text-lime-700" />
                AI Systems
              </span> */}
            {/* </div> */}
          {/* </div> */}
        {/* </div> */}
      </div>
    </section>
  );
};

export default AboutSection;
