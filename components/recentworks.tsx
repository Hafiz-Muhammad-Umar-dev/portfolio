'use client';

import React from 'react';
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
    liveUrl: 'https://brandsob.com', // Optional: link agar live ho
  },
  {
    id: '02',
    title: 'Neuro Nest Healthcare AI Doctor',
    category: 'Agentic AI & MedTech',
    description:
      'Autonomous clinical AI assistant engineered with medical knowledge RAG, HIPAA-compliant patient context memory, and multi-agent diagnostic workflows for real-time healthcare support.',
    image: '/work2.png', // Image path
    technologies: [
      'FastAPI',
      'Python',
      'LangGraph / Agents SDK',
      'RAG & VectorDB',
      'MySQL',
      'Llama 3 / OpenAI',
      'REST API',
    ],
    liveUrl: 'https://neuronest-healthcare.vercel.app/', // Optional: Agar project live/demo link ho
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
    liveUrl: 'https://hafiz-muhammad-umar-dev.github.io/Flux-Framework/', // Ya jo bhi documentation/repo link ho
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
    liveUrl: 'https://adaayah-e-libaas.vercel.app/ ', // Optional link
  },
];

export default function RecentWorks({
  works = defaultWorks,
  title = 'Selected Works',
  subtitle = 'A closer look at the intelligent systems, AI solutions, and products I build to solve real-world problems.',
}: RecentWorksProps) {
  return (
    <section
      id="projects"
      className="relative isolate overflow-hidden bg-[#fafbf7] px-5 py-20 text-zinc-950 sm:px-8 sm:py-24 lg:px-12 lg:py-32"
    >
      {/* Soft background accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-20 -z-10 h-96 w-96 rounded-full bg-[#c7f464]/20 blur-[110px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-40 -z-10 h-96 w-96 rounded-full bg-lime-100/50 blur-[110px]"
      />

      <div className="relative mx-auto max-w-[1440px]">
        {/* Section header */}
        <div className="mb-10 flex flex-col gap-6 sm:mb-14 md:flex-row md:items-end md:justify-between lg:mb-16">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-zinc-200/80 bg-white/80 px-3.5 py-2 shadow-sm backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-lime-500" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-600">
                Selected Projects
              </span>
            </div>

            <h2 className="text-4xl font-medium leading-[1.02] tracking-[-0.06em] sm:text-5xl lg:text-7xl">
              {title}
              <span className="text-lime-600">.</span>
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-zinc-600 sm:text-base">
              {subtitle}
            </p>
          </div>

          <a
            href="https://github.com/Hafiz-Muhammad-Umar-dev"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex w-fit items-center gap-3 rounded-full border border-zinc-200 bg-white/80 px-5 py-3 text-sm font-medium text-zinc-800 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-lime-300 hover:bg-lime-100/70"
          >
            Explore GitHub
            <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5">
              ↗
            </span>
          </a>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 gap-x-7 gap-y-12 md:grid-cols-2 md:gap-y-14 lg:gap-x-9 lg:gap-y-16">
          {works.map((work, index) => (
            <article key={work.id} className="group min-w-0">
              {/* Image card */}
              <div className="relative isolate aspect-[16/10] overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-sm transition-all duration-500 group-hover:-translate-y-1 group-hover:border-lime-300 group-hover:shadow-xl group-hover:shadow-lime-900/[0.06]">
                <Image
                  src={work.image}
                  alt={`${work.title} project preview`}
                  fill
                  priority={index < 2}
                  sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 650px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                />

                {/* Subtle image overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/55 via-transparent to-zinc-950/[0.04]" />

                {/* Category pill */}
                <div className="absolute left-4 top-4 sm:left-5 sm:top-5">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/90 px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-800 shadow-sm backdrop-blur-xl sm:text-[11px]">
                    <span className="h-1.5 w-1.5 rounded-full bg-lime-600" />
                    {work.category}
                  </span>
                </div>

                {/* Project number */}
                <div className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5">
                  <span className="text-xs font-medium tracking-[0.18em] text-white/90">
                    PROJECT / {work.id}
                  </span>
                </div>

                {/* View project action */}
                {work.liveUrl && (
                  <a
                    href={work.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`View ${work.title}`}
                    className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-white text-xl text-zinc-950 shadow-lg transition-all duration-300 hover:rotate-45 hover:bg-lime-300 sm:bottom-5 sm:right-5"
                  >
                    ↗
                  </a>
                )}
              </div>

              {/* Project information */}
              <div className="px-0.5 pt-5 sm:pt-6">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-medium tracking-[-0.04em] text-zinc-950 transition-colors duration-300 group-hover:text-lime-700 sm:text-2xl lg:text-[28px]">
                    {work.title}
                  </h3>

                  <span className="mt-1 shrink-0 text-xs font-medium text-zinc-400">
                    {work.id}
                  </span>
                </div>

                <p className="mt-3 max-w-xl text-sm leading-7 text-zinc-600 sm:text-[15px]">
                  {work.description}
                </p>

                {/* Technology tags */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {work.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-full border border-zinc-200 bg-white/75 px-3.5 py-1.5 text-[11px] font-medium text-zinc-600 transition-colors duration-300 hover:border-lime-300 hover:bg-lime-100/70 hover:text-zinc-900 sm:text-xs"
                    >
                      {technology}
                    </span>
                  ))}
                </div>

                {/* Optional project links */}
                {(work.liveUrl || work.githubUrl) && (
                  <div className="mt-5 flex flex-wrap items-center gap-5">
                    {work.liveUrl && (
                      <a
                        href={work.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="group/link inline-flex items-center gap-2 text-sm font-semibold text-zinc-800 transition-colors hover:text-lime-700"
                      >
                        Live Preview
                        <span className="transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-0.5">
                          ↗
                        </span>
                      </a>
                    )}

                    {work.githubUrl && (
                      <a
                        href={work.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-950"
                      >
                        Source Code ↗
                      </a>
                    )}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          id="contact"
          className="relative mt-16 overflow-hidden rounded-3xl border border-zinc-200/80 bg-white/75 p-6 shadow-sm backdrop-blur-xl sm:mt-24 sm:p-9 lg:p-12"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-10 -top-20 h-56 w-56 rounded-full bg-lime-200/40 blur-[70px]"
          />

          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl">
              <div className="mb-3 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-lime-500" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                  Have a project in mind?
                </span>
              </div>

              <h3 className="text-2xl font-medium tracking-[-0.05em] sm:text-3xl lg:text-4xl">
                Let&apos;s build something
                <span className="text-lime-600"> meaningful.</span>
              </h3>

              <p className="mt-3 text-sm leading-6 text-zinc-600">
                Have an idea, a business challenge, or an AI system to build?
                Let&apos;s talk.
              </p>
            </div>

            <a
              href="mailto:hello@example.com"
              className="group inline-flex w-fit shrink-0 items-center justify-center gap-3 rounded-full bg-zinc-950 px-6 py-3.5 text-sm font-medium text-white shadow-lg shadow-zinc-900/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-lime-400 hover:text-zinc-950"
            >
              Let&apos;s Connect
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                ↗
              </span>
            </a>
          </div>
        </div>

        {/* Section footer */}
        <div className="mt-8 flex flex-col gap-2 text-center text-[11px] text-zinc-400 sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p>Designed with intention. Built to solve real problems.</p>
          <p>AI Engineering · Agentic AI · Computer Vision</p>
        </div>
      </div>
    </section>
  );
}
