
'use client';

import React, { useRef, useState } from 'react';
import { FaXTwitter, FaLinkedinIn, FaGithub } from 'react-icons/fa6';
import { HiOutlineArrowUpRight, HiOutlineEnvelope, HiOutlineMapPin, HiOutlineClock } from 'react-icons/hi2';
import emailjs from '@emailjs/browser';

export interface ContactFormValues {
  name: string;
  email: string;
  topic: string;
  message: string;
}

interface SocialItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface ContactSectionProps {
  title?: string;
  titleAccent?: string;
  subtitle?: string;
  email?: string;
  location?: string;
  availability?: string;
  replyTime?: string;
  topics?: string[];
  socials?: SocialItem[];
}

const defaultSocials: SocialItem[] = [
  {
    label: 'GitHub',
    href: 'https://github.com/Hafiz-Muhammad-Umar-dev',
    icon: <FaGithub />,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/muhammad-umar-u786',
    icon: <FaLinkedinIn />,
  },
  {
    label: 'X (Twitter)',
    href: 'https://x.com/muhaammad_umar_',
    icon: <FaXTwitter />,
  },
];

type Errors = Partial<Record<keyof ContactFormValues, string>>;
type Status = 'idle' | 'sending' | 'success' | 'error';

const validate = (v: ContactFormValues): Errors => {
  const errors: Errors = {};

  if (v.name.trim().length < 2) {
    errors.name = 'Please enter your name.';
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  if (v.message.trim().length < 10) {
    errors.message = 'Please enter at least 10 characters.';
  }

  return errors;
};

const fieldClass =
  'w-full rounded-xl border border-zinc-200 bg-[#fafbf9] px-4 py-3.5 text-sm text-zinc-900 outline-none transition duration-200 placeholder:text-zinc-400 hover:border-zinc-300 focus:border-lime-500 focus:bg-white focus:ring-4 focus:ring-lime-100';

export const ContactSection: React.FC<ContactSectionProps> = ({
  title = "Let's Make It",
  titleAccent = 'Happen.',
  subtitle = "Have an idea, a project, or an interesting challenge? I'd love to hear about it. Let's build something meaningful together.",
  email = 'umarshabbir.ai@gmail.com',
  location = 'Remote · Available worldwide',
  availability = 'Open to new projects',
  replyTime = 'Usually within 24 hours',
  topics = ['AI Agents', 'Computer Vision', 'Full-Stack', 'Something else'],
  socials = defaultSocials,
}) => {
  const [values, setValues] = useState<ContactFormValues>({
    name: '',
    email: '',
    topic: topics[0] ?? '',
    message: '',
  });

  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [copied, setCopied] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const setField = <K extends keyof ContactFormValues>(
    key: K,
    value: string
  ) => {
    setValues((prev) => ({ ...prev, [key]: value }));

    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }

    if (status !== 'idle') {
      setStatus('idle');
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const honeypot = (
      new FormData(e.currentTarget).get('website') as string
    ) || '';

    if (honeypot) return;

    const found = validate(values);
    setErrors(found);

    const firstInvalid = (
      Object.keys(found) as (keyof ContactFormValues)[]
    )[0];

    if (firstInvalid) {
      formRef.current
        ?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)
        ?.focus();
      return;
    }

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.error('EmailJS configuration is missing.');
      setStatus('error');
      return;
    }

    setStatus('sending');

    try {
      const response = await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: values.name.trim(),
          reply_to: values.email.trim(),
          topic: values.topic,
          message: values.message.trim(),
          time: new Date().toLocaleString(),
        },
        { publicKey }
      );

      console.log('EmailJS response:', response.status, response.text);

      setStatus('success');
      setValues({
        name: '',
        email: '',
        topic: topics[0] ?? '',
        message: '',
      });
      setErrors({});
    } catch (error) {
      console.error('EmailJS sending failed:', error);
      setStatus('error');
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative isolate overflow-hidden bg-[#fafbf7] px-5 py-20 text-zinc-950 sm:px-8 sm:py-28 lg:px-12 lg:py-32"
    >
      {/* Soft background atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[500px] bg-gradient-to-b from-lime-200/60 via-lime-100/25 to-transparent"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-24 -z-10 h-80 w-80 rounded-full bg-lime-200/30 blur-[100px]"
      />

      <div className="mx-auto max-w-6xl">
        {/* Section heading */}
        <div className="mb-12 sm:mb-16">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-lime-200 bg-white/80 px-3.5 py-2 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-lime-500" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-700">
              Let&apos;s connect
            </span>
          </div>

          <h2
            id="contact-title"
            className="max-w-3xl text-5xl font-medium leading-[1.05] tracking-[-0.06em] sm:text-6xl lg:text-7xl"
          >
            {title}{' '}
            <span className="font-serif italic text-lime-700">
              {titleAccent}
            </span>
          </h2>

          <p className="mt-5 max-w-xl text-sm leading-7 text-zinc-600 sm:text-base sm:leading-8">
            {subtitle}
          </p>
        </div>

        {/* Main layout */}
        <div className="grid items-start gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:gap-8">
          {/* Left panel */}
          <aside className="relative overflow-hidden rounded-3xl bg-zinc-950 p-7 text-white shadow-xl shadow-zinc-900/10 sm:p-9 lg:sticky lg:top-8">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full border border-lime-300/10"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full border border-lime-300/15"
            />

            <div className="relative">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-lime-300">
                Get in touch
              </p>

              <h3 className="mt-5 max-w-sm text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
                Have something in mind?
              </h3>

              <p className="mt-4 max-w-sm text-sm leading-7 text-zinc-400">
                Tell me a little about your idea. Whether it&apos;s an AI
                product or a new collaboration, let&apos;s talk.
              </p>

              <div className="mt-9 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-lime-300">
                    <HiOutlineEnvelope size={21} />
                  </div>

                  <div className="min-w-0 flex-1 pt-0.5">
                    <p className="text-xs text-zinc-500">Email me at</p>
                    <a
                      href={`mailto:${email}`}
                      className="mt-1 block break-all text-sm font-medium text-white transition hover:text-lime-300"
                    >
                      {email}
                    </a>

                    <button
                      type="button"
                      onClick={copyEmail}
                      className="mt-2 text-xs font-medium text-lime-300 underline decoration-lime-300/30 underline-offset-4 transition hover:text-white"
                    >
                      {copied ? 'Copied to clipboard!' : 'Copy email address'}
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-lime-300">
                    <HiOutlineMapPin size={21} />
                  </div>

                  <div className="pt-0.5">
                    <p className="text-xs text-zinc-500">Location</p>
                    <p className="mt-1 text-sm font-medium text-white">
                      {location}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-lime-300">
                    <HiOutlineClock size={21} />
                  </div>

                  <div className="pt-0.5">
                    <p className="text-xs text-zinc-500">Response time</p>
                    <p className="mt-1 text-sm font-medium text-white">
                      {replyTime}
                    </p>
                  </div>
                </div>
              </div>

              <div className="my-8 border-t border-white/10" />

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-white">
                    {availability}
                  </p>
                  <p className="mt-1 text-xs text-zinc-500">
                    Always happy to discuss ideas
                  </p>
                </div>

                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-400 opacity-40" />
                  <span className="relative h-3 w-3 rounded-full bg-lime-400" />
                </span>
              </div>

              <div className="mt-8 flex items-center gap-3">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    title={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-300 transition duration-200 hover:-translate-y-1 hover:border-lime-300 hover:bg-lime-300 hover:text-zinc-950"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </aside>

          {/* Right form panel */}
          <div
            id="contact-form"
            className="scroll-mt-8 rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-[0_18px_60px_rgba(24,24,27,0.055)] sm:p-9 lg:p-10"
          >
            <div className="mb-8 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold tracking-tight text-zinc-950 sm:text-2xl">
                  Send a message
                </h3>
                <p className="mt-2 text-sm leading-6 text-zinc-500">
                  Fill in the details and I&apos;ll get back to you.
                </p>
              </div>

              <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-lime-100 text-lime-800 sm:flex">
                <HiOutlineEnvelope size={23} />
              </div>
            </div>

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              noValidate
              aria-label="Contact form"
              className="space-y-6"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-2 block text-sm font-medium text-zinc-800"
                  >
                    Your name <span className="text-lime-700">*</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={values.name}
                    onChange={(e) => setField('name', e.target.value)}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'contact-name-error' : undefined}
                    placeholder="Add Your Name"
                    className={`${fieldClass} ${errors.name ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : ''}`}
                  />
                  {errors.name && (
                    <p id="contact-name-error" className="mt-2 text-xs text-red-600">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-2 block text-sm font-medium text-zinc-800"
                  >
                    Email address <span className="text-lime-700">*</span>
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={(e) => setField('email', e.target.value)}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'contact-email-error' : undefined}
                    placeholder="Add Your Email"
                    className={`${fieldClass} ${errors.email ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : ''}`}
                  />
                  {errors.email && (
                    <p id="contact-email-error" className="mt-2 text-xs text-red-600">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <fieldset>
                <legend className="mb-3 text-sm font-medium text-zinc-800">
                  What would you like to discuss?
                </legend>

                <div className="flex flex-wrap gap-2">
                  {topics.map((topic) => {
                    const selected = values.topic === topic;

                    return (
                      <label key={topic} className="cursor-pointer">
                        <input
                          type="radio"
                          name="topic"
                          value={topic}
                          checked={selected}
                          onChange={() => setField('topic', topic)}
                          className="sr-only"
                        />

                        <span
                          className={`inline-flex min-h-10 items-center rounded-full border px-4 py-2 text-xs font-medium transition duration-200 sm:text-sm ${
                            selected
                              ? 'border-zinc-950 bg-zinc-950 text-white shadow-sm'
                              : 'border-zinc-200 bg-white text-zinc-600 hover:border-lime-400 hover:bg-lime-50'
                          }`}
                        >
                          {topic}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-2 block text-sm font-medium text-zinc-800"
                >
                  Project details <span className="text-lime-700">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  value={values.message}
                  onChange={(e) => setField('message', e.target.value)}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'contact-message-error' : undefined}
                  placeholder="Tell me about your idea, goals, timeline, or anything else I should know..."
                  className={`${fieldClass} min-h-36 resize-y leading-6 ${errors.message ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : ''}`}
                />
                <div className="mt-2 flex items-start justify-between gap-3">
                  {errors.message ? (
                    <p id="contact-message-error" className="text-xs text-red-600">
                      {errors.message}
                    </p>
                  ) : (
                    <p className="text-xs text-zinc-400">
                      A few details will help me understand your project.
                    </p>
                  )}
                  <span className="shrink-0 text-xs text-zinc-400">
                    {values.message.length} chars
                  </span>
                </div>
              </div>

              {/* Honeypot anti-spam field */}
              <div
                className="absolute -left-[9999px]"
                aria-hidden="true"
              >
                <label htmlFor="contact-website">Website</label>
                <input
                  id="contact-website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {status === 'success' && (
                <div
                  role="status"
                  aria-live="polite"
                  className="rounded-xl border border-lime-200 bg-lime-50 px-4 py-3 text-sm text-lime-900"
                >
                  Message sent successfully! Thanks for reaching out.
                </div>
              )}

              {status === 'error' && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                  Your message couldn&apos;t be sent. Please try again or email{' '}
                  <a className="font-semibold underline" href={`mailto:${email}`}>
                    {email}
                  </a>.
                </div>
              )}

              <div className="border-t border-zinc-100 pt-5">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="group flex min-h-13 w-full items-center justify-center gap-3 rounded-xl bg-zinc-950 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-zinc-950/10 transition duration-300 hover:-translate-y-0.5 hover:bg-lime-400 hover:text-zinc-950 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:bg-zinc-950 disabled:hover:text-white"
                >
                  {status === 'sending' ? 'Sending your message...' : 'Send message'}

                  {status !== 'sending' && (
                    <HiOutlineArrowUpRight
                      size={19}
                      className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  )}
                </button>

                <p className="mt-3 text-center text-xs leading-5 text-zinc-400">
                  Your details are only used to respond to your inquiry.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
