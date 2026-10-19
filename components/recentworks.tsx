'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface WorkItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
}

interface RecentWorksProps {
  works?: WorkItem[];
  title?: string;
  subtitle?: string;
  githubProfileUrl?: string;
}

const defaultWorks: WorkItem[] = [
  {
    id: '01',
    title: 'BrandSob.Solutions',
    category: 'Full-Stack & AI Systems',
    description:
      'Global B2B agency platform delivering AI-powered prospect discovery, automated lead acquisition, and end-to-end client outreach workflows.',
    image: '/work1.png',
    technologies: ['Next.js', 'TypeScript', 'FastAPI', 'Python', 'Tailwind CSS', 'AI Agents'],
    liveUrl: 'https://brandsob.com',
  },
  {
    id: '02',
    title: 'Neuro Nest Healthcare AI Doctor',
    category: 'Agentic AI & MedTech',
    description:
      'Autonomous clinical AI assistant engineered with medical knowledge RAG, HIPAA-compliant patient context memory, and multi-agent diagnostic workflows for real-time healthcare support.',
    image: '/work2.png',
    technologies: [
      'FastAPI',
      'Python',
      'LangGraph / Agents SDK',
      'RAG & VectorDB',
      'MySQL',
      'Llama 3 / OpenAI',
      'REST API',
    ],
    liveUrl: 'https://neuronest-healthcare.vercel.app/',
  },
  {
    id: '03',
    title: 'Flux AI Agents Framework',
    category: 'Agentic Framework & Vision AI',
    description:
      'Enterprise-grade multi-agent orchestration framework integrated with advanced computer vision pipelines for real-time video stream analysis, automated visual inspection, and intelligent camera monitoring workflows.',
    image: '/work3.png',
    technologies: [
      'Python',
      'OpenCV',
      'YOLOv8/11',
      'Vision AI',
      'AsyncIO',
      'Multi-Agent Architecture',
    ],
    liveUrl: 'https://hafiz-muhammad-umar-dev.github.io/Flux-Framework/',
  },
  {
    id: '04',
    title: 'Adaayah Full-Stack E-Commerce',
    category: 'Full-Stack & E-Commerce',
    description:
      'High-performance, modern e-commerce web application engineered with lightning-fast SSR, secure payment gateway integrations, advanced product filtering, and a seamless checkout experience.',
    image: '/work4.png',
    technologies: [
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'PostgreSQL',
      'Prisma / Supabase',
      'Stripe / Payments',
    ],
    liveUrl: 'https://adaayah-e-libaas.vercel.app/',
  },
];

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950';

const hostname = (url?: string) => {
  if (!url) return 'preview';
  try {
    return new URL(url.trim()).hostname.replace(/^www\./, '');
  } catch {
    return 'preview';
  }
};

export default function RecentWorks({
  works = defaultWorks,
  title = 'Selected Works',
  subtitle = 'A closer look at the intelligent systems, AI solutions, and products I build to solve real-world problems.',
  githubProfileUrl = 'https://github.com/Hafiz-Muhammad-Umar-dev',
}: RecentWorksProps) {
  const [active, setActive] = useState(0);
  const current = works[active];
  const currentLive = current?.liveUrl?.trim();

  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="relative isolate overflow-hidden bg-zinc-950 px-5 py-20
        text-white selection:bg-lime-300 selection:text-zinc-950
        sm:px-8 sm:py-24 lg:px-12 lg:py-28"
    >
      {/* Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-10 -z-10 h-[420px]
          w-[420px] rounded-full bg-lime-300/10 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-32 -z-10
          h-[380px] w-[380px] rounded-full bg-lime-400/10 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07]"
        style={{
          backgroundImage: 'radial-gradient(#ffffff 0.8px, transparent 0.8px)',
          backgroundSize: '26px 26px',
        }}
      />

      <div className="relative mx-auto max-w-[1440px]">
        {/* Header */}
        <div
          className="mb-12 flex flex-col gap-6 sm:mb-16 md:flex-row
            md:items-end md:justify-between"
        >
          <div className="max-w-2xl">
            <div
              className="mb-5 inline-flex items-center gap-2.5 rounded-full
                border border-white/10 bg-white/5 px-3.5 py-2 backdrop-blur-md"
            >
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-lime-300" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-300">
                Selected Projects
              </span>
            </div>

            <h2
              id="projects-title"
              className="text-4xl font-medium leading-[1.02] tracking-[-0.06em]
                sm:text-5xl lg:text-7xl"
            >
              {title}
              <span className="text-lime-300">.</span>
            </h2>

            <p className="mt-5 max-w-xl text-pretty text-sm leading-7 text-zinc-400 sm:text-base">
              {subtitle}
            </p>
          </div>

          <a
            href={githubProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`group inline-flex min-h-11 w-fit items-center gap-3
              rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm
              font-medium text-white backdrop-blur-md transition-all
              duration-300 hover:border-lime-300/60 hover:bg-lime-300
              hover:text-zinc-950 ${focusRing}`}
          >
            Explore GitHub
            <span
              aria-hidden="true"
              className="transition-transform duration-300
                group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            >
              ↗
            </span>
          </a>
        </div>

        {/* Project index + live preview */}
        {works.length > 0 && (
          <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14 xl:gap-20">
            {/* Index */}
            <div className="border-b border-white/10">
              {works.map((work, index) => {
                const isActive = index === active;
                const liveUrl = work.liveUrl?.trim();

                return (
                  <div key={work.id} className="border-t border-white/10">
                    <h3>
                      <button
                        type="button"
                        id={`work-tab-${work.id}`}
                        aria-expanded={isActive}
                        aria-controls={`work-panel-${work.id}`}
                        onClick={() => setActive(index)}
                        className={`group flex w-full items-start gap-4 rounded-md
                          py-5 text-left sm:gap-6 sm:py-6 ${focusRing}`}
                      >
                        <span
                          className={`mt-1.5 w-7 shrink-0 text-xs font-medium
                            tabular-nums transition-colors duration-300
                            ${isActive ? 'text-lime-300' : 'text-zinc-600 group-hover:text-zinc-400'}`}
                        >
                          {work.id}
                        </span>

                        <span className="min-w-0 flex-1">
                          <span
                            className={`block text-xl font-medium tracking-[-0.04em]
                              transition-colors duration-300 sm:text-2xl lg:text-[28px]
                              ${isActive ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-200'}`}
                          >
                            {work.title}
                          </span>
                          <span
                            className={`mt-1 block text-xs transition-colors duration-300
                              ${isActive ? 'text-lime-300' : 'text-zinc-600'}`}
                          >
                            {work.category}
                          </span>
                        </span>

                        <span
                          aria-hidden="true"
                          className={`mt-1 flex h-9 w-9 shrink-0 items-center
                            justify-center rounded-full border text-lg
                            transition-all duration-300
                            ${
                              isActive
                                ? 'rotate-45 border-lime-300 bg-lime-300 text-zinc-950'
                                : 'border-white/15 text-zinc-500 group-hover:border-white/40 group-hover:text-white'
                            }`}
                        >
                          ↗
                        </span>
                      </button>
                    </h3>

                    {/* Expandable details */}
                    <div
                      id={`work-panel-${work.id}`}
                      role="region"
                      aria-labelledby={`work-tab-${work.id}`}
                      className={`grid transition-[grid-template-rows,opacity,visibility]
                        duration-500 ease-out motion-reduce:transition-none
                        ${
                          isActive
                            ? 'visible grid-rows-[1fr] opacity-100'
                            : 'invisible grid-rows-[0fr] opacity-0'
                        }`}
                    >
                      <div className="overflow-hidden">
                        <div className="pb-7 pl-11 sm:pl-[3.25rem]">
                          {/* Image on small screens (large screens use the sticky preview) */}
                          <div
                            className="relative mb-5 aspect-[16/10] overflow-hidden
                              rounded-xl border border-white/10 bg-zinc-900 lg:hidden"
                          >
                            <Image
                              src={work.image}
                              alt={`${work.title} project preview`}
                              fill
                              sizes="(max-width: 1023px) 90vw, 0px"
                              className="object-cover"
                            />
                          </div>

                          <p className="max-w-xl text-pretty text-sm leading-7 text-zinc-400 sm:text-[15px]">
                            {work.description}
                          </p>

                          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies used">
                            {work.technologies.map((technology) => (
                              <li
                                key={technology}
                                className="rounded-full border border-white/10
                                  bg-white/5 px-3 py-1.5 text-xs font-medium
                                  text-zinc-300"
                              >
                                {technology}
                              </li>
                            ))}
                          </ul>

                          {(liveUrl || work.githubUrl) && (
                            <div className="mt-6 flex flex-wrap items-center gap-3">
                              {liveUrl && (
                                <a
                                  href={liveUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`group/link inline-flex min-h-10 items-center
                                    gap-2 rounded-full bg-lime-300 px-5 py-2 text-sm
                                    font-semibold text-zinc-950 transition-colors
                                    hover:bg-lime-200 ${focusRing}`}
                                >
                                  Live Preview
                                  <span
                                    aria-hidden="true"
                                    className="transition-transform
                                      group-hover/link:-translate-y-0.5
                                      group-hover/link:translate-x-0.5"
                                  >
                                    ↗
                                  </span>
                                </a>
                              )}

                              {work.githubUrl && (
                                <a
                                  href={work.githubUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`inline-flex min-h-10 items-center gap-2
                                    rounded-full border border-white/15 px-5 py-2
                                    text-sm font-medium text-zinc-300 transition-colors
                                    hover:border-white/40 hover:text-white ${focusRing}`}
                                >
                                  Source Code ↗
                                </a>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Sticky preview (large screens) */}
            <div className="relative hidden lg:block">
              <div className="sticky top-10">
                <div
                  aria-hidden="true"
                  className="absolute -inset-6 -z-10 rounded-[2.5rem]
                    bg-lime-300/15 blur-3xl"
                />

                <div
                  className="overflow-hidden rounded-3xl border border-white/10
                    bg-zinc-900 shadow-2xl shadow-black/40"
                >
                  {/* Browser bar */}
                  <div className="flex items-center gap-3 border-b border-white/10 bg-zinc-900 px-4 py-3">
                    <div className="flex gap-1.5" aria-hidden="true">
                      <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                      <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                      <span className="h-2.5 w-2.5 rounded-full bg-lime-300" />
                    </div>
                    <div className="mx-auto w-full max-w-[60%] truncate rounded-full bg-white/5 px-4 py-1 text-center text-xs text-zinc-400">
                      {hostname(current?.liveUrl)}
                    </div>
                    <span className="w-11" aria-hidden="true" />
                  </div>

                  {/* Stacked screenshots, cross-fading */}
                  <div className="relative aspect-[16/10] bg-zinc-900">
                    {works.map((work, index) => (
                      <Image
                        key={work.id}
                        src={work.image}
                        alt={index === active ? `${work.title} project preview` : ''}
                        fill
                        priority={index === 0}
                        sizes="(min-width: 1280px) 760px, 58vw"
                        className={`object-cover transition-all duration-700 ease-out
                          motion-reduce:transition-none
                          ${index === active ? 'scale-100 opacity-100' : 'scale-[1.03] opacity-0'}`}
                      />
                    ))}

                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-zinc-950/50 via-transparent to-transparent"
                    />

                    {currentLive && (
                      <a
                        href={currentLive}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${current.title} (opens in a new tab)`}
                        className={`group absolute bottom-5 right-5 inline-flex min-h-11
                          items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm
                          font-semibold text-zinc-950 shadow-lg transition-colors
                          hover:bg-lime-300 ${focusRing}`}
                      >
                        Open project
                        <span
                          aria-hidden="true"
                          className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        >
                          ↗
                        </span>
                      </a>
                    )}
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between text-xs text-zinc-500">
                  <span className="tabular-nums">
                    <span className="text-lime-300">{current?.id}</span> /{' '}
                    {String(works.length).padStart(2, '0')}
                  </span>
                  <span>{current?.category}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}